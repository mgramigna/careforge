import fs from 'fs';
import path from 'path';

const resourceTypeRegex = /export type (\w+) = /gm;

const genServiceCode = (resourceType: string) => {
  return `
import {
  BundleSchema,
  ${resourceType}Schema,
  ${resourceType}SearchArgs,
  ${resourceType}SearchArgsSchema,
  type ${resourceType},
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type ${resourceType}ServiceType = Service<${resourceType}, ${resourceType}SearchArgs>;

export const ${resourceType}Service = ({ baseUrl }: { baseUrl: string }): ${resourceType}ServiceType => {
  const read: ${resourceType}ServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(${resourceType}Schema, {
      path: \`$\{baseUrl}/${resourceType}/\${id}\`,
      token: accessToken,
    });

    return response;
  };

  const create: ${resourceType}ServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: \`$\{baseUrl}/${resourceType}\`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: ${resourceType}ServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: \`\${baseUrl}/${resourceType}/\${resource.id}\`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: ${resourceType}ServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = ${resourceType}SearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(${resourceType}Schema), {
      path: \`\${baseUrl}/${resourceType}\`,
      token: accessToken,
      query: new URLSearchParams(parsedArgs as Record<string, string>).toString(),
    });

    return response;
  };

  return {
    read,
    create,
    update,
    search,
  };
};
  `;
};

function main() {
  const modelBase = path.join(__dirname, '../src/models/resources');
  const serviceBase = path.join(__dirname, '../src/services');
  const resourceModelFiles = fs
    .readdirSync(path.join(modelBase))
    .filter((dir) => !dir.includes('bundle') && !dir.includes('index'));

  resourceModelFiles.forEach((filePath) => {
    const fileContent = fs.readFileSync(path.join(modelBase, filePath), 'utf8');

    const [match] = [...fileContent.matchAll(resourceTypeRegex)];

    if (!match ?? !match?.[1]) throw new Error(`Failed to extract resourceType from ${filePath}`);

    const resourceType = match[1];

    const code = genServiceCode(resourceType);
    fs.writeFileSync(path.join(serviceBase, filePath), code, 'utf8');
  });
}

main();
