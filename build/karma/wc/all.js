const path = require('path');

// NOTE! Despite the naming of this file, this is not use to test webcomponents. This is just used
// to run the browserstack tests locally in Chrome and Firefox

const karmaConf = require('../base');
const addPolyFills = require('../addPolyFills');
const setUpEnzyme = require('../setUpEnzyme');
const assignPattern = require('../assignPattern');
const removeSourcemaps = require('../removeSourceMaps');

module.exports = (config) => {
  karmaConf(config);
  assignPattern(config, path.join(__dirname, 'all.entry.js'));
  addPolyFills(config);
  setUpEnzyme(config);
  removeSourcemaps(config);
};
