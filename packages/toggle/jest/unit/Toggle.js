import sinon from 'sinon';
import React from 'react';
import { mount, shallow } from 'enzyme';
import CloseIcon from 'ak-icon/glyph/cancel';
import ConfirmIcon from 'ak-icon/glyph/confirm';

import { ToggleStateless as Toggle } from '../../src';
import { IconWrapper, Input, Label } from '../../src/styled';

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

describe('Toggle', () => {
  it('defaults', () => {
    const wrapper = shallow(<Toggle />);
    const input = wrapper.find(Input);
    const label = wrapper.find(Label);
    const iconWrapper = wrapper.find(IconWrapper);

    expect(input.exists()).toBe(true);

    expect(label.exists()).toBe(true);
    expect(label.prop('size')).toBe('regular');

    expect(iconWrapper.exists()).toBe(true);
    expect(iconWrapper.find(CloseIcon).exists()).toBe(true);
  });

  describe('properties', () => {
    it('isChecked=true', () => {
      const wrapper = shallow(<Toggle isChecked />);
      expect(wrapper.find(Input).prop('checked')).toBe(true);
      expect(wrapper.find(ConfirmIcon).exists()).toBe(true);
      expect(wrapper.find(CloseIcon).exists()).toBe(false);
    });
    it('isChecked=false', () => {
      const wrapper = shallow(<Toggle />);
      expect(wrapper.find(Input).prop('checked')).toBe(false);
      expect(wrapper.find(ConfirmIcon).exists()).toBe(false);
      expect(wrapper.find(CloseIcon).exists()).toBe(true);
    });
    it('isDisabled=true', () => {
      const wrapper = shallow(<Toggle isDisabled />);
      expect(wrapper.find(Input).prop('disabled')).toBe(true);
    });
    it('isDisabled=false', () => {
      const wrapper = shallow(<Toggle />);
      expect(wrapper.find(Input).prop('disabled')).toBe(false);
    });

    it('name', () =>
      expect(shallow(<Toggle name="test" />).find(Input).prop('name')).toBe('test')
    );
    it('value', () =>
      expect(shallow(<Toggle value="test" />).find(Input).prop('value')).toBe('test')
    );
    it('size', () =>
      expect(shallow(<Toggle size="large" />).find(Label).prop('size')).toBe('large')
    );

    it('label', () => {
      expect(shallow(<Toggle isChecked label="test" />).find(ConfirmIcon).prop('label'))
        .toBe('test');
      expect(shallow(<Toggle label="test" />).find(CloseIcon).prop('label'))
        .toBe('test');
    });

    describe('input events handlers', () =>
      ['change', 'focus', 'blur'].forEach(eventName =>
        it('onChange', () => {
          const spy = sinon.spy();
          const props = { [`on${capitalize(eventName)}`]: spy };
          const wrapper = mount(<Toggle {...props} />);
          wrapper.find(Input).simulate(eventName);
          expect(spy.called).toBe(true);
        })
      )
    );
  });
});
