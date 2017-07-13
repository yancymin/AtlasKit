const standardConfig = require('./development.js');

// We delete the entry from the normal config and let karma insert it for us
delete standardConfig.entry;

module.exports = standardConfig;
