const allConf = require('./all');
const assignPattern = require('../assignPattern');

const base = 'test';
const files = `${base}/**/*@(Spec|spec).+(js|jsx|ts|tsx)`;

module.exports = (config) => {
  allConf(config, { keepSourceMaps: true });
  assignPattern(config, files);
};
