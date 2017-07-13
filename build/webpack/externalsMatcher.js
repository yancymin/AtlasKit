const log = require('minilog')('externalsMatcher');
// enable the next line to debug
// require('minilog').enable();

module.exports = (context, request, callback) => {
  log.info(context, request);
  const internal = () => {
    log.info(`internal: ${request}`);
    callback();
  };

  if (/^\./.test(request)) {
    internal();
    return;
  }
  if (/!/.test(request)) {
    internal();
    return;
  }

  log.info(`external: ${request}`);
  callback(null, request);
};
