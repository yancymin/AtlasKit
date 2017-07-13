import { mount } from 'enzyme';
import React from 'react';

import Lozenge, { APPEARANCE_ENUM } from '../../src/Lozenge';

describe('Lozenge', () => {
  describe('isBold property', () => {
    it('should not be the default', () => {
      expect(mount(<Lozenge />).prop('isBold')).toBe(false);
    });
    it('should change when toggled', () => {
      expect(mount(<Lozenge isBold />).prop('isBold')).toBe(true);
    });
  });
  describe('appearance property', () => {
    it('should be "default" when not set', () => {
      expect(mount(<Lozenge />).prop('appearance')).toBe('default');
    });
    it('should change when set to an approved value', () => {
      APPEARANCE_ENUM.values.forEach((value) => {
        expect(mount(<Lozenge appearance={value} />).prop('appearance')).toBe(value);
      });
    });
    it('should revert to "default" when set to an invalid value', () => {
      expect(mount(<Lozenge appearance="foo" />).getNode().validAppearance()).toBe('default');
    });
  });
});
