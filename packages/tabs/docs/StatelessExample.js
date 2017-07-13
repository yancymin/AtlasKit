import React, { PureComponent } from 'react';
import { TabsStateless } from '@atlaskit/tabs';

const tabs2 = [
  { label: 'Tab a', content: 'Tab a content' },
  { label: 'Tab b', content: 'Tab b content' },
  { label: 'Tab c', content: 'Tab c content' },
  { label: 'Tab d', content: 'Tab d content' },
];

export default class TabsStatelessExample extends PureComponent {
  state = {
    selectedTab: null,
    tabs: tabs2,
  }

  getTabs = () => this.state.tabs.map((tab, index) => ({
    ...tab,
    ...{
      isSelected: index === this.state.selectedTab,
      onKeyboardNav: this.tabKeyboardNavHandler,
      onSelect: () => this.tabSelectHandler(index),
    },
  }));

  tabSelectHandler = (selectedTabIndex) => {
    this.setState({ selectedTab: selectedTabIndex });
  }

  tabKeyboardNavHandler = (key) => {
    const selectedIndex = this.state.selectedTab;
    if (selectedIndex !== null) {
      let nextIndex = selectedIndex;

      if (key === 'ArrowLeft') {
        nextIndex = selectedIndex - 1 < 0 ? 0 : selectedIndex - 1;
      } else if (key === 'ArrowRight') {
        nextIndex = selectedIndex + 1 > this.state.tabs.length - 1
          ? this.state.tabs.length - 1
          : selectedIndex + 1;
      }

      if (nextIndex !== selectedIndex) {
        this.tabSelectHandler(nextIndex);
      }
    }
  }

  render() {
    return (
      <TabsStateless
        tabs={this.getTabs()}
        onKeyboardNav={this.tabKeyboardNavHandler}
      />
    );
  }
}
