#!/usr/bin/env node
/* eslint-disable import/newline-after-import, global-require, import/no-dynamic-require, no-console, max-len */
const fs = require('fs');
const scriptName = require('path').basename(__filename);
const packageJsonPath = process.argv[2];
const destPath = process.argv[3];
const cwd = process.cwd();

if (!packageJsonPath || !destPath) {
  console.info(`Usage: ${scriptName} PACKAGE_JSON_PATH DEST_FILE_PATH`);
  process.exit(1);
}

let packageJson;
try {
  packageJson = require(`${cwd}/${packageJsonPath}`);
} catch (e) {
  console.error(`Unable to read package.json at "${packageJsonPath}"`, e);
  process.exit(1);
}

if (
  !packageJson ||
  typeof packageJson.version !== 'string' ||
  typeof packageJson.name !== 'string'
) {
  console.error(`Unable to read "version" or "name" field from package.json at "${packageJsonPath}"`);
  process.exit(1);
}

const data = `export const version = '${packageJson.version}';\nexport const name = '${packageJson.name}';\n`;

fs.writeFile(`${cwd}/${destPath}`, data, (err) => {
  if (err) {
    console.error(`Error writing export file to "${destPath}"`, err);
    process.exit(1);
  }

  console.info(`Wrote export file at "${destPath}" with name "${packageJson.name}" and version "${packageJson.version}"`);
});
