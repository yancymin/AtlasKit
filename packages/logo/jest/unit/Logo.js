import { shallow, mount } from 'enzyme';
import React from 'react';
import Logo from '../../src/components/LogoBase';

describe('<Logo />', () => {
  describe('props', () => {
    it('should render an svg', () => {
      const wrapper = mount(<Logo><svg /></Logo>);
      // throw shallow(<svg />);
      expect(wrapper.find('svg')).toHaveLength(1);
    });
    describe('collapseTo prop', () => {
      it('should not collapse by default', () => {
        const wrapper = shallow(<Logo size="small" />);
        expect(wrapper.props().collapseTo).toBe(undefined);
      });

      // Note: other values can be supplied, but will cause a PropType warning
      it('should accept "type" or "icon"', () => {
        const typeWrapper = shallow(<Logo collapseTo="type" size="small" />);
        expect(typeWrapper.props().collapseTo).toBe('type');

        const iconWrapper = shallow(<Logo collapseTo="icon" size="small" />);
        expect(iconWrapper.props().collapseTo).toBe('icon');
      });
    });
  });
});
