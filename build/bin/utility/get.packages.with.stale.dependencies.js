const semver = require('semver');
const getAllPackageJsons = require('./get.packages.from.local');

function getLocalDep(packageJsons, packageName) {
  return packageJsons.find(pkg => pkg.name === packageName);
}

function getPackagesWithStaleDeps(depsToCheck) {
  const packageJsons = getAllPackageJsons();
  const packagesWithStaleDeps = [];

  packageJsons.forEach((pkgJson) => {
    const deps = pkgJson[depsToCheck] || {};
    const staleDeps = [];
    Object.keys(deps).forEach((depName) => {
      const localDep = getLocalDep(packageJsons, depName);
      if (localDep) {
        if (!semver.satisfies(localDep.version, deps[depName])) {
          staleDeps.push({
            name: depName,
            expectedVersion: deps[depName],
            localVersion: localDep.version,
          });
        }
      }
    });
    if (staleDeps.length > 0) {
      packagesWithStaleDeps.push({
        packageName: pkgJson.name,
        deps: staleDeps,
      });
    }
  });

  return Promise.resolve(packagesWithStaleDeps);
}

module.exports = getPackagesWithStaleDeps;
