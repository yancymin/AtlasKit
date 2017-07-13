const allConf = require('./all.js');
const addPolyFills = require('../addPolyFills');
const path = require('path');
const webpack = require('webpack');

module.exports = (config) => {
  const testDirectory = `${process.cwd()}/test/browser`;
  const entry = path.join(__dirname, 'single.entry.js');

  allConf(config);

  config.set({
    files: [entry],
    preprocessors: {
      [entry]: ['webpack', 'sourcemap'],
    },
  });

  config.webpack.plugins.push(new webpack.DefinePlugin({
    'process.env.TEST_DIRECTORY': JSON.stringify(testDirectory),
  }));

  addPolyFills(config);
};
