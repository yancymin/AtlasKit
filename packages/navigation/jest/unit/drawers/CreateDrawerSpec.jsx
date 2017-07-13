import { mount } from 'enzyme';
import React from 'react';
import { AkCreateDrawer } from '../../../src/index';
import { createIconOffset } from '../../../src/shared-variables';

describe('<CreateDrawer />', () => {
  describe('the inner Drawer', () => {
    it('isFullWidth should pass width="full" to the inner drawer', () => {
      expect(mount(<AkCreateDrawer isFullWidth />).find('Drawer').props().width).toBe('full');
    });
    it('isFullWidth={false} should pass width="narrow" to the inner drawer', () => {
      expect(mount(<AkCreateDrawer isFullWidth={false} />).find('Drawer').props().width).toBe('narrow');
    });
    it('should render the backIcon in the correct position default to false', () => {
      expect(mount(<AkCreateDrawer />).find('Drawer').props().backIconOffset).toBe(createIconOffset);
    });
  });
});
