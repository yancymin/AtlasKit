import { mount } from 'enzyme';
import React from 'react';

import Badge from '../../src';
import { APPEARANCE_ENUM } from '../../src/components/Badge';

describe('Badge', () => {
  describe('value property', () => {
    it('should be visibly displayed', () => {
      expect(mount(<Badge value={5} />).text()).toBe('5');
    });
    it('should only accept positive numbers', () => {
      expect(mount(<Badge value={-5} />).text()).toBe('0');
    });
    it('should show Infinity as the ∞ character', () => {
      expect(mount(<Badge value={Infinity} max={Infinity} />).text()).toBe('∞');
    });
    it('should trigger onValueUpdated when value prop changed with a number', (done) => {
      const badge = mount(
        <Badge
          value={1}
          onValueUpdated={(detail) => {
            expect(detail.oldValue).toBe(1);
            expect(detail.newValue).toBe(20);
            done();
          }}
        />
      );
      badge.setProps({ value: 20 });
    });
  });
  describe('max property', () => {
    it('should constrain to 99+ when not specified', () => {
      expect(mount(<Badge value={101} />).text()).toBe('99+');
    });
    it('should constrain the value when set', () => {
      expect(mount(<Badge value={200} max={100} />).text()).toBe('100+');
    });
    it('should pass the value through when max === 0', () => {
      expect(mount(<Badge value={Number.MAX_VALUE} max={0} />).text())
        .toBe(`${Number.MAX_VALUE}`);
    });
    it('should not constrain if equal to value', () => {
      expect(mount(<Badge value={200} max={200} />).text()).toBe('200');
    });
  });
  describe('appearance property', () => {
    it('should be "default" when not set', () => {
      expect(mount(<Badge />).prop('appearance')).toBe('default');
    });
    it('should change when set to an approved value', () => {
      APPEARANCE_ENUM.values.forEach((value) => {
        expect(mount(<Badge appearance={value} />).prop('appearance')).toBe(value);
      });
    });
    it('should revert to "default" when set to an invalid value', () => {
      expect(mount(<Badge appearance="foo" />).find('BadgeElement').prop('appearance')).toBe('default');
    });
  });
  describe('theme property', () => {
    it('should not have dark theme when not set', () => {
      expect(mount(<Badge />).prop('theme')).toBe('default');
    });
    it('should apply the dark theme class when the theme is dark', () => {
      expect(mount(<Badge theme="dark" />).prop('theme')).toBe('dark');
    });
  });
});
