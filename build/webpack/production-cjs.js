const productionConfig = require('./production.js');

productionConfig.entry = {
  'dist/bundle-cjs.js': productionConfig.entry['dist/bundle.js'],
  'dist/bundle-cjs.min.js': productionConfig.entry['dist/bundle.js'],
};

productionConfig.output.libraryTarget = 'commonjs2';

module.exports = productionConfig;
