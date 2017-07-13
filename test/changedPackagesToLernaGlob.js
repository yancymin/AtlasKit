const chai = require('chai');

chai.should();

const changedPackagesToLernaGlob = require('../build/bin/_changed_packages_to_lerna_glob');

describe('_changed_packages_to_lerna_glob.js', () => {
  describe('changedPackagesToLernaGlob()', () => {
    it('should return comma separated packages surrounded by braces', () => {
      const changedPackages = ['@atlaskit/foo', '@atlaskit/bar'];
      const lernaGlob = changedPackagesToLernaGlob(changedPackages);
      lernaGlob.should.equal('{@atlaskit/foo,@atlaskit/bar}');
    });

    it('should return single package name if only one package passed (no braces)', () => {
      const changedPackages = ['@atlaskit/foo'];
      const lernaGlob = changedPackagesToLernaGlob(changedPackages);
      lernaGlob.should.equal('@atlaskit/foo');
    });

    it('should return an empty string if an empty array is passed', () => {
      const changedPackages = [];
      const lernaGlob = changedPackagesToLernaGlob(changedPackages);
      lernaGlob.should.equal('');
    });
  });
});
