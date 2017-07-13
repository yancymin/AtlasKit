import { expect } from 'chai';

import Picker, * as other from '../src';
import { name } from '../package.json';

describe(name, () => {
  describe('exports', () => {
    it('should export a base component', () => {
      expect(Picker).to.not.equal(null);
      other.default.should.be.equals(Picker);
    });
  });
});
