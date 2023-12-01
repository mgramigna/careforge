import fs from 'fs';
import path from 'path';

const resourceTypeRegex = /export type (\w+) = /gm;

const genServiceCode = (resourceType: string) => {
  return `
import { ${resourceType}Schema, type ${resourceType} } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type ${resourceType}ServiceType = Service<${resourceType}>;

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

  return {
    read,
    create,
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
