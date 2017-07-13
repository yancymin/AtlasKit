function addPolyFills(config) {
  const customEventPolyfill = require.resolve('custom-event-polyfill');
  const babelPolyfill = require.resolve('babel-polyfill');
  config.files.unshift(babelPolyfill, customEventPolyfill);

  Object.assign(config.preprocessors, {
    [customEventPolyfill]: ['webpack'],
    [babelPolyfill]: ['webpack', 'sourcemap'],
  });
}
module.exports = addPolyFills;
