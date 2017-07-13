const chai = require('chai');

chai.should();

const externalsMatcher = require('../build/webpack/externalsMatcher.js');

const matchAgainst = (dep, context = '') => new Promise((resolve, reject) => {
  externalsMatcher(context, dep, (err, isExternal) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(!!isExternal);
  });
});

describe('externalsMatcher', () => {
  describe('relative dependencies', () => {
    it('should not match relative dependencies', () => matchAgainst('../some/lib').then((result) => {
      result.should.equal(false);
    }));
  });

  it('should not match dependencies with loaders', () => matchAgainst('style!bla.less').then((result) => {
    result.should.equal(false);
  }));
});
