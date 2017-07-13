import React from 'react';
import { shallow } from 'enzyme';
import styles from '../../src/styles/profilecard.less';

import IconLabel from '../../src/components/IconLabel';

describe('Profilecard', () => {
  describe('IconLabel', () => {
    it('should render no label when not children are present', () => {
      const wrapper = shallow(<IconLabel />);
      expect(wrapper.text()).toBe('');
    });

    it('should render LabelIcon without icon when icon property is not set', () => {
      const wrapper = shallow(<IconLabel>Labeltext</IconLabel>);
      expect(wrapper.length).toBeGreaterThan(0);
      expect(wrapper.find('span').text()).toBe('Labeltext');

      const icon = wrapper.find(`.${styles.detailsLabelIcon}`);
      expect(icon.text()).toBe('');
    });

    it('should render LabelIcon without icon when icon property is an available icon', () => {
      const wrapper = shallow(<IconLabel icon="foobar">Labeltext</IconLabel>);
      expect(wrapper.length).toBeGreaterThan(0);
      expect(wrapper.find('span').text()).toBe('Labeltext');

      const icon = wrapper.find(`.${styles['pf-icon']}`);
      expect(icon.length).toBe(0);
    });

    it('should render LabelIcon with icon', () => {
      const wrapper = shallow(<IconLabel icon="time">Labeltext</IconLabel>);
      expect(wrapper.length).toBeGreaterThan(0);
      expect(wrapper.find('span').text()).toBe('Labeltext');

      const icon = wrapper.find(`.${styles.detailsLabelIcon}`);
      expect(icon.length).toBeGreaterThan(0);
    });
  });
});
