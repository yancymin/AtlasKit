#!/usr/bin/env node
const changedPackagesToLernaGlob = require('./_changed_packages_to_lerna_glob');

/* Takes a list of released packages from the command line and outputs a glob that can be used
   by lerna to select all of those packages
*/
function releasedPackagesToScopeGlob() {
  // make sure we have one argument passed to the script (first two will be node location and script
  // name)
  if (process.argv.length !== 3) {
    // eslint-disable-next-line no-console
    console.error(`Usage: ./_released_packages_to_scope_glob $RELEASED_PACKAGES
      where $RELEASED_PACKAGES is a newline separated list of packages and versions (${process.argv.length})`);
    process.exit(1);
  } else {
    const releasedPackages = process.argv[2]
      .split('\n')
      // Remove any lines that don't look like packages, Should never happen, but just in case...
      .filter(releasedPackage => releasedPackage.match(/^(.+?)@/))
      // remove the version field
      .map(releasedPackage => releasedPackage.match(/^(.+?)@/)[1]);
    const lernaGlob = changedPackagesToLernaGlob(releasedPackages);
    if (lernaGlob.length !== 0) {
      console.log(lernaGlob); // eslint-disable-line no-console
    }
  }
}

releasedPackagesToScopeGlob();
