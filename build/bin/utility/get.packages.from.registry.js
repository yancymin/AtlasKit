const axios = require('axios');

/*
  This package is used to collect the latest information that the registry has on each of our
  packages. It exposes two functions, one for finding the latest version of each package and one
  for finding specific versions of packages on the registry.

  Both return an array of responses in the form
    { name, version, exists, json? } where name and version are the name and version that were
      searched for, exists is a boolean that is true if the json was found and json is the return
      json object from the registry (if it exists)
*/

const REGISTRY_FULL_JSON_URL = 'https://aui-cdn.atlassian.com/atlaskit/registry/api/full.json';

function getRegistryData() {
  return axios.get(REGISTRY_FULL_JSON_URL, { responseType: 'json' })
    .then(response => Promise.resolve(response.data));
}

function getPackageFromRegistryData(registryData, packageName, packageVersion = 'latest') {
  const registryPackage = registryData.components
    .find(pkg => pkg.latestPublishedVersion.name === packageName);
  if (registryPackage) {
    if (packageVersion === 'latest') {
      // there is a bug in panop where this package doesnt contain the correct data, but we can look
      // at the rest of the known package versions and the first one will be the actual latest
      // version registry knows about
      return registryPackage.versions[0];
    }
    // otherwise look for the specific version
    return registryPackage.versions.find(pkg => pkg.version === packageVersion);
  }
  return undefined;
}

function getPackagesFromRegistry(packages, getLatest = true) {
  return getRegistryData()
    .then((registryData) => {
      const registryResponses = [];

      packages.forEach((pkg) => {
        const getVersion = getLatest ? 'latest' : pkg.version;
        const registryPackage = getPackageFromRegistryData(registryData, pkg.name, getVersion);
        registryResponses.push({
          name: pkg.name,
          version: getVersion,
          exists: !!registryPackage,
          json: registryPackage,
        });
      });

      return Promise.resolve(registryResponses);
    });
}

/* Fetches the latest version of packages from registry. `packages` should be in the form:
     [{ name: 'package-a' }, { name: 'package-b' }, ...]
*/
function getLatestPackagesFromRegistry(packages) {
  return getPackagesFromRegistry(packages);
}

/* Fetches packages at specific versions. `packages` should be in the form:
     [{ name: 'package-a', version: '1.0.0' }, { name: 'package-b', version: '1.0.0' }, ...]
*/
function getPackagesFromRegistryAtVersion(packages) {
  // tell getPackagesFromRegistry to not get latest
  return getPackagesFromRegistry(packages, false);
}

module.exports = {
  getLatestPackagesFromRegistry,
  getPackagesFromRegistryAtVersion,
};

