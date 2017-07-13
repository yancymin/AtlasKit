const webpack = require('webpack');
const standardConfig = require('./base.js');
const externalsMatcher = require('./externalsMatcher.js');

standardConfig.externals = [externalsMatcher];

standardConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  include: /\.js$/, // Only remove dead code
  dead_code: true,
  mangle: false,
  beautify: true,
  comments: true,
  compress: {
    warnings: false,
  },
}));
standardConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  // Minify any target that ends in .min.js.
  include: /\.min\.js$/,
  minimize: true,
  compress: {
    warnings: false,
  },
}));

standardConfig.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
}));

standardConfig.plugins.push(new webpack.optimize.DedupePlugin());

module.exports = standardConfig;
