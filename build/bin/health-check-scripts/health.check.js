#!/usr/bin/env node
/* eslint-disable no-console */
const chalk = require('chalk');
const Table = require('cli-table2');
const fs = require('fs');
const path = require('path');
const semver = require('semver');

/* This script is to run a few automated consistency checks against the repo
      - Shows local versions vs npm versions, vs registry versions
      - Shows broken storybooks on registry
*/

const getLocalPackages = require('../utility/get.packages.from.local');
const getPackagesFromNpm = require('../utility/get.packages.from.npm').getLatestPackagesFromNpm;
const getPackagesFromRegistry = require('../utility/get.packages.from.registry').getLatestPackagesFromRegistry;
const getStorybooksFromRegistry = require('../utility/get.storybooks.from.registry');

// returns true if a local package has a storybooks folder
function localPackageHasStorybooks(pkg) {
  const storybookPath = path.join(__dirname, 'packages', pkg, 'stories');
  return fs.existsSync(storybookPath);
}

const showAllPackages = process.argv.indexOf('--show-all') > -1;
const ignoreOldLocalVersion = process.argv.indexOf('--ignore-old-locals') > -1;

console.log('Fetching package information from local packages...');
const localPackages = getLocalPackages();
console.log(chalk.green(`Successfully fetched data for ${localPackages.length} packages`));

// We nest our promises here so that we can keep references to the already fetched data because
// we are still in the same closure. We return them all at the end and the promises flatten out and
// we have all the data.
// This could be written a lot nicer using async/await.
console.log('Fetching package information from npm...');

getPackagesFromNpm(localPackages)
  .then((npmPackages) => {
    console.log(chalk.green(`Successfully fetched data for ${npmPackages.length} packages`));

    console.log('Fetching data from Atlaskit regsitry...');

    return getPackagesFromRegistry(localPackages)
      .then((registryPackages) => {
        console.log(chalk.green(`Successfully fetched data for ${registryPackages.length} packages`));

        console.log('Fetching storybooks from registry...');

        return getStorybooksFromRegistry(localPackages)
          .then((registryStorybooks) => {
            console.log(chalk.green(`Successfully fetched data for ${registryStorybooks.length} packages`));

            return [npmPackages, registryPackages, registryStorybooks];
          });
      });
  })
  .then(([npmPackages, registryPackages, registryStorybooks]) => {
    // now we can combine all the data
    let combinedData = localPackages.map((pkg) => {
      const npmPkg = npmPackages.find(p => p.name === pkg.name);
      const registryPkg = registryPackages.find(p => p.name === pkg.name);
      // if a package doesnt have a storybook locally we say that it "exists" in the registry
      // because there is no error
      const storybookExists = localPackageHasStorybooks(pkg.name) ?
        registryStorybooks.find(p => p.name === pkg.name).exists :
        true;

      return {
        name: pkg.name,
        localVersion: pkg.version,
        npmVersion: npmPkg.exists ? npmPkg.json.version : '--',
        registryVersion: registryPkg.exists ? registryPkg.json.version : '--',
        storybookExists,
      };
    });

    const versionComparisonFn = ignoreOldLocalVersion ? semver.lte : semver.eq;
    const versionIsFine = (localVersion, otherVersion) => semver.valid(localVersion) &&
      semver.valid(otherVersion) &&
      versionComparisonFn(localVersion, otherVersion);

    // Unless the user requests all output, filter to package that have errors
    if (!showAllPackages) {
      combinedData = combinedData.filter((pkg) => {
        const npmVersionFine = versionIsFine(pkg.localVersion, pkg.npmVersion);
        const registryVersionFine = versionIsFine(pkg.localVersion, pkg.registryVersion);

        return !npmVersionFine || !registryVersionFine || !pkg.storybookExists;
      }
      );
    }

    const table = new Table({
      head: ['Package', 'Local', 'NPM', 'Registry', 'Storybook'],
    });

    combinedData.forEach((pkg) => {
      // we'll use chalk to make the output nice and readable
      const name = chalk.white(pkg.name);
      const localVersion = chalk.white(pkg.localVersion);
      const npmVersion = versionIsFine(pkg.localVersion, pkg.npmVersion) ?
        chalk.green(pkg.npmVersion) :
        chalk.red(pkg.npmVersion);
      const registryVersion = versionIsFine(pkg.localVersion, pkg.registryVersion) ?
        chalk.green(pkg.registryVersion) :
        chalk.red(pkg.registryVersion);
      const storybookExists = pkg.storybookExists ?
        chalk.green(pkg.storybookExists) :
        chalk.red(pkg.storybookExists);
      table.push([name, localVersion, npmVersion, registryVersion, storybookExists]);
    });

    console.log(table.toString());
  });

/* eslint-enable no-console */
