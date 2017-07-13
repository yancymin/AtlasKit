#!/usr/bin/env node

const pascalCase = require('pascal-case');

const args = process.argv.slice(2);

function logPascalCase(arg) {
  console.log(pascalCase(arg)); // eslint-disable-line no-console
}

args.forEach(logPascalCase);
