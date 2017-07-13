import React from 'react';
import { mount } from 'enzyme';
import { akColorR400, akColorG75 } from '@atlaskit/util-shared-styles';
import sinon from 'sinon';

import AkToggle, { Toggle } from '../../src';
import { getContainerBackgroundColor } from '../../src/styled';

import { name } from '../../package.json';

describe(name, () => {
  describe('stateless', () => {
    it('should print out when it is active', () => {
      const wrapper = mount(<Toggle isActive />);
      expect(wrapper.find('button').text()).toBe('active');
    });

    it('should print out when it is not active', () => {
      const wrapper = mount(<Toggle />);
      expect(wrapper.find('button').text()).toBe('not active');
    });

    it('should prefix its active state with a label', () => {
      const wrapper = mount(
        <Toggle
          isActive
          label="My toggle"
        />
      );
      expect(wrapper.find('button').text()).toBe('My toggle: active');
    });

    it('should fire onToggle when the button is clicked', () => {
      const stub = sinon.stub();
      const wrapper = mount(
        <Toggle
          onToggle={stub}
        />
      );

      wrapper.find('button').simulate('click');

      expect(stub.callCount).toBe(1);
    });

    // [Current patterns for testing dynamic styles](https://extranet.atlassian.com/display/AtlasKit/Moving+from+Less+to+Styled+Components)
    it('should have a green background when active', () => {
      expect(getContainerBackgroundColor({ isActive: true })).toBe(akColorG75);
    });

    it('should have a red background when not active', () => {
      expect(getContainerBackgroundColor({ isActive: false })).toBe(akColorR400);
    });
  });

  describe('stateful', () => {
    it('should toggle the active state of the Toggle onToggle', () => {
      const wrapper = mount(<AkToggle label="hello" />);
      const stateless = wrapper.find(Toggle);

      expect(stateless.props().isActive).toBe(false);

      stateless.props().onToggle();

      expect(stateless.props().isActive).toBe(true);
    });
  });
});
