const webpack = require('webpack');
const standardConfig = require('./base.js');

standardConfig.devtool = 'cheap-module-source-map';
standardConfig.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
  },
}));

module.exports = standardConfig;
