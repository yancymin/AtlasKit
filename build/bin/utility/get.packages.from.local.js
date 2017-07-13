const path = require('path');
const fs = require('fs');

// returns an array of all the package.json's from each of the packages, while skipping packages
// with no package.json
function getAllPackageJsons() {
  const packagesDir = './packages';
  const packages = fs.readdirSync(packagesDir)
    .filter(file => fs.statSync(path.join(packagesDir, file)).isDirectory())
    .map(pkgName => path.join(packagesDir, pkgName, 'package.json'))
    .filter(packageJsonPath => fs.existsSync(packageJsonPath))
    .map(packageJsonPath => fs.readFileSync(packageJsonPath))
    .map(JSON.parse);
  return packages;
}

module.exports = getAllPackageJsons;
