import React, { Component } from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import TabsNav from '../../src/components/TabsNav';
import { name } from '../../package.json';
import { sampleTabs } from './_constants';
import { TabLabels, TabLabel } from '../../src/styled/TabsNav';

describe(name, () => {
  describe('TabsNav', () => {
    const kbNav = () => {};

    describe('exports', () => {
      it('the TabsNav component', () => {
        expect(TabsNav).not.toBe(undefined);
        expect(new TabsNav()).toBeInstanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<TabsNav onKeyboardNav={kbNav} />);
        expect(wrapper).not.toBe(undefined);
        expect(wrapper.instance()).toBeInstanceOf(Component);
      });

      it('should render a list container', () => {
        const wrapper = shallow(<TabsNav />);
        expect(wrapper.type()).toBe('div');
        const tabLabel = wrapper.find(TabLabels);
        expect(tabLabel.length).toBe(1);
        expect(tabLabel.props().role).toBe('tablist');
      });
    });

    describe('props', () => {
      describe('tabs prop', () => {
        it('should render a matching list item for each tab', () => {
          const wrapper = shallow(<TabsNav tabs={sampleTabs} onKeyboardNav={kbNav} />);
          const items = wrapper.find(TabLabel);
          expect(items).toHaveLength(sampleTabs.length);

          items.forEach((item, i) => {
            expect(item.props()['aria-posinset']).toBe(i + 1);
            expect(item.props()['aria-setsize']).toBe(sampleTabs.length);
            expect(item.props().role).toBe('tab');
            expect(item.props().tabIndex).toBe(sampleTabs[i].isSelected ? 0 : -1);
            expect(item.props().children).toBe(sampleTabs[i].label);
            if (sampleTabs[i].isSelected) {
              expect(item.props()['aria-selected']).toBe(sampleTabs[i].isSelected);
              expect(item.props().isSelected).toBe(true);
            }
          });
        });
      });
    });

    describe('props', () => {
      describe('onKeyboardNav', () => {
        const keys = ['ArrowRight', 'ArrowLeft'];
        keys.forEach((key) => {
          it(`is called in response to ${key} key press`, () => {
            const spy = sinon.spy();
            const wrapper = shallow(<TabsNav
              onKeyboardNav={spy}
              tabs={sampleTabs}
            />);
            wrapper.find(TabLabel).at(1).simulate('keyDown', { key });
            expect(spy.calledOnce).toBe(true);
            expect(spy.args[0][0]).toBe(key);
          });
        });
      });
    });
  });
});
