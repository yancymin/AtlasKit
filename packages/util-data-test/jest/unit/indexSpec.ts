import { expect } from 'chai';

import defaultExported from '../../src';
import { name } from '../../package.json';

describe(name, () => {
  describe('exports', () => {
    it('should export an empty base component', () => {
      expect(defaultExported).to.deep.equal({});
    });
  });
});
