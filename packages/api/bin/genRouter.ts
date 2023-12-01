import fs from 'fs';
import path from 'path';

const resourceTypeRegex = /export type (\w+) = /gm;

const genRouterCode = (resourceType: string) => {
  return `
import { z } from 'zod';

import { ${resourceType}Schema, type ${resourceType}ServiceType } from '@canvas-challenge/canvas';

import { authedProcedure, createTRPCRouter } from '../trpc';

export const create${resourceType}Router = ({ ${
    resourceType.charAt(0).toLowerCase() + resourceType.slice(1)
  }Service }: { ${
    resourceType.charAt(0).toLowerCase() + resourceType.slice(1)
  }Service: ${resourceType}ServiceType }) => {
  return createTRPCRouter({
    get: authedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
      const result = await ${
        resourceType.charAt(0).toLowerCase() + resourceType.slice(1)
      }Service.read({
        id: input.id,
        accessToken: ctx.accessToken,
      });

      if (result.isErr()) {
        // TODO
        return null;
      }

      return result.value;
    }),
    create: authedProcedure
      .input(${resourceType}Schema.omit({ id: true }))
      .mutation(async ({ ctx, input }) => {
        const result = await ${
          resourceType.charAt(0).toLowerCase() + resourceType.slice(1)
        }Service.create({
          resource: input,
          accessToken: ctx.accessToken,
        });

        if (result.isErr()) {
          // TODO
          return null;
        }

        return result.value;
      }),
  });
};
  `;
};

function main() {
  const modelBase = path.join(__dirname, '../../canvas/src/models/resources');
  const routerBase = path.join(__dirname, '../src/router');
  const resourceModelFiles = fs
    .readdirSync(path.join(modelBase))
    .filter((dir) => !dir.includes('bundle') && !dir.includes('index'));

  resourceModelFiles.forEach((filePath) => {
    const fileContent = fs.readFileSync(path.join(modelBase, filePath), 'utf8');

    const [match] = [...fileContent.matchAll(resourceTypeRegex)];

    if (!match ?? !match?.[1]) throw new Error(`Failed to extract resourceType from ${filePath}`);

    const resourceType = match[1];

    const code = genRouterCode(resourceType);
    fs.writeFileSync(path.join(routerBase, filePath), code, 'utf8');
  });
}

main();
