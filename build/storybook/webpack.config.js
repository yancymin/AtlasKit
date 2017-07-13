const webpackConfig = require('../webpack/development.js');
const webpack = require('webpack');

module.exports = (storybookBaseConfig, configType) => { // eslint-disable-line no-unused-vars
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  storybookBaseConfig.devtool = webpackConfig.devtool;
  storybookBaseConfig.plugins = storybookBaseConfig.plugins.concat(webpackConfig.plugins);
  storybookBaseConfig.module.loaders = webpackConfig.module.loaders;
  storybookBaseConfig.postcss = webpackConfig.postcss;

  storybookBaseConfig.resolve = Object.assign(
    storybookBaseConfig.resolve || {},
    webpackConfig.resolve || {}
  );

  if (configType === 'PRODUCTION') {
    // Attempting to use source maps will cause out-of-memory errors when
    // building very large sets of stories.
    storybookBaseConfig.plugins.forEach((plugin) => {
      if (plugin instanceof webpack.optimize.UglifyJsPlugin) {
        plugin.options.sourceMap = false;
      }
    });
  }

  // Return the altered config
  return storybookBaseConfig;
};
