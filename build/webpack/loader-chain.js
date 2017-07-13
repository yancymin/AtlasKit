/**
 * Build a loader chain.
 *
 * @param {Object} spec -- {loader2: {}, loader1: {}, ...}
 *   The order of definition is significant. The prior example would return:
 *
 *       'loader1?{}!loader2?{}'
 */
module.exports.encode = spec => Object.keys(spec)
  .map(key => `${key}?${JSON.stringify(spec[key])}`)
  .join('!');

/**
 * Decode a webpack loader URI into an object.
 *
 * @param url -- e.g. 'loader1?{}!loader2?{}
 *   A string version of a webpack loader URI. The prior example would return:
 *
 *       {
 *         loader1: {},
 *         loader2: {}
 *       }
 */
module.exports.decode = url => url
  .split('!')
  .map((loader) => {
    const [name, params] = loader.split('?');
    return {
      [name]: JSON.parse(params),
    };
  })
  .reduce((acc, x) => Object.assign(acc, x), {});
