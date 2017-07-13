/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

const gitAddChangelog = pathName => (
  new Promise((resolve, reject) => {
    const spawned = spawn('git', ['add', pathName]);
    spawned.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(code);
      }
    });
  })
);

function markPackageForRelease(details) {
  const changelogPath = path.join(details.location, 'docs/CHANGELOG.md');
  let currentChangelog;
  try {
    currentChangelog = fs.readFileSync(changelogPath).toString();
  } catch (e) {
    console.log('No Changelog exists for', details.pkg.name);
    return null;
  }

  const divided = currentChangelog.split('## Unreleased');
  let newChangelogContent;
  if (divided.length === 2) {
    newChangelogContent = divided.join(`## ${details.nextRelease.version} (${new Date().toISOString().slice(0, 10)})`);
  } else {
    newChangelogContent = currentChangelog;
  }

  fs.writeFileSync(changelogPath, newChangelogContent);
  return gitAddChangelog(changelogPath);
}

module.exports = markPackageForRelease;
