#!/usr/bin/env node
/* eslint-disable no-console */
const chalk = require('chalk');

const getPackagesWithStaleDeps = require('../utility/get.packages.with.stale.dependencies');

/*
  This script is for finding packages that depend on non-latest versions of other internal packages.

  It is intended to be run adhoc to give a quick view of potential issues.

  Pass the `--dev` flag to list stale dev dependencies instead
*/

const depsToCheck = process.argv[2] === '--dev' ? 'devDependencies' : 'dependencies';
getPackagesWithStaleDeps(depsToCheck)
  .then((packagesWithStaleDeps) => {
    if (packagesWithStaleDeps.length > 0) {
      console.log(`The following packages have stale local ${depsToCheck}`);

      packagesWithStaleDeps
        // sort them so that worst offenders are listed first
        .sort((a, b) => b.deps.length - a.deps.length)
        .forEach((pkg) => {
          console.log(`${chalk.blue(pkg.packageName)}:`);
          pkg.deps
            .forEach(dep => console.log(`  - ${chalk.yellow(dep.name)}:${chalk.red(dep.expectedVersion)} (latest: ${chalk.green(dep.localVersion)})`));
        });
    } else {
      console.log(chalk.green(`All local ${depsToCheck} are up to date!`));
    }
  });

/* eslint-enable no-console */
