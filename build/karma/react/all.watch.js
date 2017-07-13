const allConf = require('./all');
const enableWatch = require('../enableWatch');

module.exports = (config) => {
  allConf(config);
  enableWatch(config);
};
