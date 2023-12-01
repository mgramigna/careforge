import fs from 'fs';
import path from 'path';

function main() {
  const modelBase = path.join(__dirname, '../src/models/resources');
  const serviceFile = path.join(__dirname, '../src/services/index.ts');
  const resourceModelFiles = fs
    .readdirSync(path.join(modelBase))
    .filter((dir) => !dir.includes('bundle') && !dir.includes('index'));

  resourceModelFiles.forEach((filePath) => {
    fs.appendFileSync(
      serviceFile,
      `export * from './${filePath.substring(0, filePath.lastIndexOf('.'))}';\n`,
    );
  });
}

main();
