#!/usr/bin/env node
const shell = require('shelljs');

const { exec, pushd, popd } = shell;

function silent(fn) {
  shell.config.silent = true;
  fn();
  shell.config.silent = false;
}

['base', 'stories', 'tests'].forEach((config) => {
  const packageName = `eslint-config-${config}`;
  silent(() => pushd(`packages/${packageName}`));
  exec('yarn link 1> /dev/null');
  silent(() => popd());
  exec(`yarn link @atlaskit/${packageName} 1> /dev/null`);
});
