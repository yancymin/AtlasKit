import React from 'react';
import { mount, shallow } from 'enzyme';
import { akColorN0, akColorR400 } from '@atlaskit/util-shared-styles';
import WarningIcon from 'ak-icon/glyph/warning';
import Banner from '../../src';
import Container, { getMaxHeight } from '../../src/styled/Container';
import { getBackgroundColor, getTextColor } from '../../src/styled/Content';
import Text from '../../src/styled/Text';

describe('banner', () => {
  it('basic sanity check', () =>
    expect(shallow(<Banner />)).not.toBe(undefined)
  );
  describe('props', () => {
    describe('appearance prop', () => {
      it('should default to warning appearance', () =>
        expect(mount(<Banner />).prop('appearance')).toBe('warning')
      );
      it('should apply error styles when error appearance supplied', () => {
        const props = { appearance: 'error' };
        expect(getBackgroundColor(props)).toBe(akColorR400);
        expect(getTextColor(props)).toBe(akColorN0);
      });
    });
    it('should render children prop', () => {
      const wrapper = mount(<Banner>Testing!</Banner>);
      expect(wrapper.find(Text).text()).toBe('Testing!');
    });
    it('should render icon prop', () => {
      const wrapper = shallow(<Banner icon={<WarningIcon label="Warning" />} />);
      expect(wrapper.find(WarningIcon).exists()).toBe(true);
    });
    describe('isOpen prop', () => {
      it('should default to not being open', () =>
        expect(mount(<Banner />).prop('isOpen')).toBe(false)
      );
      it('should apply a max-height of 52px when isOpen', () => {
        const props = { isOpen: true };
        expect(getMaxHeight(props)).toBe('52px');
      });
    });
  });
  describe('a11y', () => {
    it('should have role=alert', () =>
      expect(shallow(
        <Banner />
      ).find(Container).is('[role="alert"]')).toBe(true)
    );
    it('should be aria-hidden=false when isOpen is true', () =>
      expect(shallow(
        <Banner isOpen />
      ).find(Container).is('[aria-hidden=false]')).toBe(true)
    );
    it('should be aria-hidden=true when isOpen is false', () =>
      expect(shallow(
        <Banner />
      ).find(Container).is('[aria-hidden=true]')).toBe(true)
    );
  });
});
