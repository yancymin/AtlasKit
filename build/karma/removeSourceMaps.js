function removeSourceMaps(config) {
  delete config.webpack.devtool;
}
module.exports = removeSourceMaps;
