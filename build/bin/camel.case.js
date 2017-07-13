#!/usr/bin/env node

const camelCase = require('camelcase');

process.argv
  .slice(2)
  .forEach(arg => console.log(camelCase(arg))); // eslint-disable-line no-console
