const axios = require('axios');

/*
  This package is used to fetch the package.json's from npm. It exposes two functions, one for
  fetching packages at specific versions and one for fetching the latest versoin of each package.

  Both return arrays of packages in the form:
    { name, version, exists, json? } where name and package are the name and package used to look
    up the package, exists is a boolean for if the package was found and json is the returned json
    object (if it exists)
*/

const BASE_NPM_CDN_URL = 'https://npmcdn.com/';

function getPackageFromNpm(packageName, packageVersion = 'latest') {
  const packageUrl = `${BASE_NPM_CDN_URL}${packageName}@${packageVersion}/package.json`;
  return axios.get(packageUrl, { responseType: 'json' })
    // If the promise resolved, the package is up to date on npm
    .then(response => Promise.resolve({
      name: packageName,
      version: packageVersion,
      exists: true,
      json: response.data,
    }))
    // if there was an error, we'll resolve the promise telling with info saying it didnt exist
    .catch(() => Promise.resolve({ name: packageName, version: packageVersion, exists: false }));
}

/* Fetches packages at specific versions. `packages` should be in the form:
     [{ name: 'package-a', version: '1.0.0' }, { name: 'package-b', version: '1.0.0' }, ...]
*/
function getPackagesFromNpmAtVersion(packages) {
  return Promise.all(packages.map(pkg => getPackageFromNpm(pkg.name, pkg.version)));
}

/* Fetches latest versions of each of the packages requested. `packages` should be in the form:
    [{ name: 'package-a' }, { name: 'package-b' }, ...]
*/
function getLatestPackagesFromNpm(packages) {
  return Promise.all(packages.map(pkg => getPackageFromNpm(pkg.name)));
}

module.exports = {
  getPackagesFromNpmAtVersion,
  getLatestPackagesFromNpm,
};
