import { shallow } from 'enzyme';
import React from 'react';
import DrawerBackIcon from '../../src/components/js/DrawerBackIcon';

describe('<DrawerBackIcon />', () => {
  describe('props', () => {
    it('renders children', () => {
      const icon = <em>test</em>;
      expect(shallow(<DrawerBackIcon>{icon}</DrawerBackIcon>).contains(icon)).toBe(true);
    });
    it('isVisible controls the presence of the isVisible class', () => {
      expect(shallow(<DrawerBackIcon isVisible />).find('DrawerBackIconInner').props().isVisible).toBe(true);
      expect(shallow(<DrawerBackIcon />).find('DrawerBackIconInner').props().isVisible).toBe(false);
    });
  });
});
