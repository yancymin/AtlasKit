import { mount } from 'enzyme';
import React from 'react';
import { AkSearchDrawer } from '../../../src/index';
import { searchIconOffset } from '../../../src/shared-variables';

describe('<SearchDrawer />', () => {
  describe('the inner Drawer', () => {
    it('isFullWidth should pass width="full" to the inner drawer', () => {
      expect(mount(<AkSearchDrawer isFullWidth />).find('Drawer').props().width).toBe('full');
    });
    it('isFullWidth={false} should pass width="wide" to the inner drawer', () => {
      expect(mount(<AkSearchDrawer isFullWidth={false} />).find('Drawer').props().width).toBe('wide');
    });
    it('should render the backIcon in the correct position default to false', () => {
      expect(mount(<AkSearchDrawer />).find('Drawer').props().backIconOffset).toBe(searchIconOffset);
    });
  });
});
