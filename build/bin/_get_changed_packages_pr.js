#!/usr/bin/env node
/* Writing this file in js to make it easier to read and maintain */
const exec = require('child-process-promise').exec;
const fs = require('fs');
const path = require('path');
const changedPackagesToLernaGlob = require('./_changed_packages_to_lerna_glob');
const changedFilesToChangedPackages = require('./_changed_files_to_changed_packages');

// returns whether a package directory exists
// packageName includes the '@atlassian/' scope at the beginning
function packageExists(packageName) {
  const dirName = packageName.replace('@atlaskit/', '');
  return fs.existsSync(path.join(process.cwd(), 'packages', dirName));
}

/*
  Gets a list of changed packages between current branch and master and returns them as a glob
  that lerna can use to select them. For multiple packages this will look like:
     "{@atlaskit/package1,@atlaskit/package2}"
  For a single package it will just be the packageName ("@atlaskit/package1")
  Where no package has been changed, a blank line is output.
*/
function getChangedPackages() {
  let changedPackages;

  exec('git fetch origin')
    // we can fairly safely hard code the name here as we are never pushing back to origin
    .then(() => exec('git checkout -b temp-branch-for-merging-master-and-doing-diff'))
    .then(() => exec('git merge origin/master'))
    .then(() => exec('git diff --name-only origin/master'))
    .then((result) => {
      const changedFiles = result.stdout.split('\n');
      changedPackages = changedFilesToChangedPackages(changedFiles);

      return exec('git checkout -');
    })
    .then(() => {
      // need to filter out any packages that not longer exist (we've deleted a package)
      changedPackages = changedPackages.filter(packageExists);
      const lernaGlob = changedPackagesToLernaGlob(changedPackages);
      if (lernaGlob.length !== 0) {
        console.log(lernaGlob); // eslint-disable-line no-console
      }
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      process.exit(1);
    });
}

getChangedPackages();
