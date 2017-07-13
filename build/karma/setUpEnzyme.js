function setUpEnzyme(config) {
  // Following is copied from https://github.com/airbnb/enzyme/blob/master/docs/guides/karma.md
  // and then modified to match https://github.com/lelandrichardson/enzyme-example-karma-webpack due
  // to running into the issue here https://github.com/producthunt/chai-enzyme/issues/46
  Object.assign(config.webpack, {
    devtool: 'inline-source-map', // just do inline source maps instead of the default
    externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
    },
  });
}
module.exports = setUpEnzyme;
