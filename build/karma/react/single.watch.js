const singleConf = require('./single');
const enableWatch = require('../enableWatch');

module.exports = (config) => {
  singleConf(config);
  enableWatch(config);
};
