const singleConf = require('./single');
const enableWatch = require('../enableWatch');
const addPolyFills = require('../addPolyFills');

module.exports = (config) => {
  singleConf(config);
  enableWatch(config);
  addPolyFills(config);
};
