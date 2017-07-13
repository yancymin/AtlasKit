const productionConfig = require('./production.js');

Object.assign(productionConfig.entry, {
  'dist/bundle.min.js': productionConfig.entry['dist/bundle.js'],
});

productionConfig.output.libraryTarget = 'umd';

module.exports = productionConfig;
