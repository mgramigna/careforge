import fs from 'fs';
import path from 'path';

const resourceTypeRegex = /export type (\w+) = /gm;

const genTestCode = (resourceType: string) => {
  return `
import { ${resourceType}Schema } from '..';

describe('${resourceType}', () => {
  it('can parse the example', () => {
    const result = ${resourceType}Schema.safeParse({ /* TODO */ });

    expect(result.success).toBe(true);
  });
});
  `;
};

function main() {
  const modelBase = path.join(__dirname, '../src/models/resources');
  const testBase = path.join(__dirname, '../src/models/__tests__');
  const resourceModelFiles = fs
    .readdirSync(path.join(modelBase))
    .filter((dir) => !dir.includes('bundle') && !dir.includes('index'));

  resourceModelFiles.forEach((filePath) => {
    const fileContent = fs.readFileSync(path.join(modelBase, filePath), 'utf8');

    const [match] = [...fileContent.matchAll(resourceTypeRegex)];

    if (!match ?? !match?.[1]) throw new Error(`Failed to extract resourceType from ${filePath}`);

    const resourceType = match[1];

    const code = genTestCode(resourceType);
    fs.writeFileSync(
      path.join(testBase, `${path.basename(filePath, '.ts')}.test.ts`),
      code,
      'utf8',
    );
  });
}

main();
