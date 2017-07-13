import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';

import { TabsStateless } from '../../src/index';
import TabsNav from '../../src/components/TabsNav';
import TabPane from '../../src/components/TabPane';
import { sampleTabs, sampleTabsNoSelection } from './_constants';
import { name } from '../../package.json';

describe(name, () => {
  describe('StatelessTabs', () => {
    const kbNav = () => {};

    describe('exports', () => {
      it('the StatelessTabs component', () => {
        expect(TabsStateless).not.toBe(undefined);
        expect(new TabsStateless()).toBeInstanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<TabsStateless onKeyboardNav={kbNav} />);
        expect(wrapper).not.toBe(undefined);
        expect(wrapper.instance()).toBeInstanceOf(Component);
      });

      it('should render the TabsNav element', () => {
        const wrapper = mount(<TabsStateless tabs={sampleTabs} onKeyboardNav={kbNav} />);
        const tabsNav = wrapper.find(TabsNav);
        expect(tabsNav).toHaveLength(1);
      });

      it('should render tabs inside the TabsNav element', () => {
        const wrapper = mount(<TabsStateless tabs={sampleTabs} onKeyboardNav={kbNav} />);
        const tabsNav = wrapper.find(TabsNav);
        tabsNav.props().tabs.forEach((tab, i) => {
          const sampleTab = sampleTabs[i];
          expect(tab.content).toBe(sampleTab.content);
          expect(tab.label).toBe(sampleTab.label);
        });
      });

      it('should render the selected TabPane item', () => {
        const wrapper = mount(<TabsStateless tabs={sampleTabs} onKeyboardNav={kbNav} />);
        const selectedTab = sampleTabs[1];

        const tab = wrapper.find(TabPane);
        expect(tab).toHaveLength(1);

        expect(tab.props().isSelected).toBe(selectedTab.isSelected);
        expect(tab.props().children).toBe(selectedTab.content);
      });

      it('should not render a TabPane item if there is no selected tab', () => {
        const wrapper = shallow(
          <TabsStateless tabs={sampleTabsNoSelection} onKeyboardNav={kbNav} />
        );
        const tab = wrapper.find(TabPane);
        expect(tab.length).toBe(0);
      });
    });

    describe('props', () => {
      describe('onKeyboardNav prop', () => {
        it('should be reflected to the TabsNav element', () => {
          const keyboardNavHandler = () => {};
          const wrapper = shallow(<TabsStateless onKeyboardNav={keyboardNavHandler} />);
          expect(wrapper.find(TabsNav).prop('onKeyboardNav')).toBe(keyboardNavHandler);
        });
      });
    });
  });
});
