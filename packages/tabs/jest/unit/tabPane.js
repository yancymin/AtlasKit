import React, { Component } from 'react';
import { shallow } from 'enzyme';

import TabPane from '../../src/components/TabPane';
import TabPaneDiv from '../../src/styled/TabPane';
import { name } from '../../package.json';

describe(name, () => {
  describe('TabPane', () => {
    describe('exports', () => {
      it('the TabPane component', () => {
        expect(TabPane).not.toBe(undefined);
        expect(new TabPane()).toBeInstanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<TabPane />);
        expect(wrapper).not.toBe(undefined);
        expect(wrapper.instance()).toBeInstanceOf(Component);
      });

      it('should render a container wrapping the content', () => {
        const content = <span>My content</span>;
        const wrapper = shallow(<TabPane>{content}</TabPane>);
        const container = wrapper.find(TabPaneDiv);
        expect(container.props().children).toBe(content);
      });
    });

    describe('props', () => {
      describe('isSelected prop', () => {
        it('should default to false and set aria-hidden to true', () => {
          const wrapper = shallow(<TabPane />);
          expect(wrapper.props()['aria-hidden']).toBe('true');
          expect(wrapper.find(TabPaneDiv).props().selected).toBe(false);
        });

        it('should set aria attribute and styles', () => {
          const wrapper = shallow(<TabPane isSelected />);
          expect(wrapper.props()['aria-hidden']).toBe('false');
          expect(wrapper.find(TabPaneDiv).props().selected).toBe(true);
        });
      });
    });
  });
});
