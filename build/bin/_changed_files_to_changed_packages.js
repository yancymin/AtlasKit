// Takes an array of file names (with paths) and returns a list of packages that those files came
// from. i.e ['packages/foo/bar.js','packages/foo/xyz.js','packages/abc/something.js']
// would return ['@atlaskit/foo', '@atlaskit/abc']
function changedFilesToChangedPackages(changedFiles) {
  return changedFiles
    // remove files not in /packages directory
    .filter(filePath => filePath.match(/^packages\//))
    // get packageNames from paths
    .map(filePath => filePath.match(/^packages\/(.+?)\//)[1])
    // remove duplicate names (if the first index of ourself isnt our idx, we arent unique)
    .filter((packageName, idx, arr) => arr.indexOf(packageName) === idx)
    // add the @atlaskit scope to them
    .map(packageName => `@atlaskit/${packageName}`);
}

module.exports = changedFilesToChangedPackages;
