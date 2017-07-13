import React, { PureComponent } from 'react';
import { mount } from 'enzyme';
import ContainerNavigationNested from '../../src/components/js/nested/ContainerNavigationNested';
import { getAnimation } from '../../src/components/styled/NestedNavigationPage';

class Child extends PureComponent {
  render() {
    return <div />;
  }
}

let wrapper;
const page = [<Child key="child" />];
const initialStack = [page, page];

describe('Nested Navigation', () => {
  describe('triggering a transition', () => {
    beforeEach(() => {
      wrapper = mount(<ContainerNavigationNested stack={initialStack} />);
    });

    it('should traverse \'down\' the tree if the stack length increases', () => {
      const stack = [page, ...wrapper.state().stack];
      wrapper.setProps({ stack }).update();
      expect(wrapper.state().traversalDirection).toBe('down');
    });

    it('should traverse \'up\' the tree if the stack length decreases', () => {
      const stack = wrapper.state().stack.slice(0, wrapper.state().stack.length - 1);
      wrapper.setProps({ stack }).update();
      expect(wrapper.state().traversalDirection).toBe('up');
    });
  });

  describe('running a transition', () => {
    beforeEach(() => {
      wrapper = mount(<ContainerNavigationNested stack={initialStack} />);
    });

    it('should only render one child when not transitioning', () => {
      expect(wrapper.children().length).toBe(1);
    });

    it('should render two children while transitioning', () => {
      const stack = [page, ...wrapper.state().stack];
      wrapper.setProps({ stack }).update();
      expect(wrapper.children().length).toBe(2);
    });

    it('should not have an animation rule while not transitioning', () => {
      expect(getAnimation({})).toBe(null);
    });
  });
});
