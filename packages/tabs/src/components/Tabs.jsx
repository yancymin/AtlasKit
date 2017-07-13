import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TabsStateless from './TabsStateless';

export default class Tabs extends PureComponent {
  static propTypes = {
    /** Handler for selecting a new tab. Called with the number of the tab, zero-indexed */
    onSelect: PropTypes.func,
    /** The tabs to display, with content being hidden unless the tab is selected. */
    tabs: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      defaultSelected: PropTypes.bool,
      label: PropTypes.node.isRequired,
    })),
  }

  static defaultProps = {
    onSelect: () => {},
    tabs: [],
  }

  constructor(props) {
    super(props);

    // Set the selected tab to the first tab with defaultSelected provided
    let defaultSelectedIndex = null;
    if (props) {
      for (let i = 0; i < props.tabs.length; i++) {
        if (props.tabs[i].defaultSelected) {
          defaultSelectedIndex = i;
          break;
        }
      }
    }

    this.state = {
      selectedTab: defaultSelectedIndex,
    };
  }

  getTabs = () => this.props.tabs.map((tab, index) => ({
    ...tab,
    isSelected: index === this.state.selectedTab,
    onKeyboardNav: this.tabKeyboardNavHandler,
    onSelect: () => this.tabSelectHandler(index),
  }));

  tabSelectHandler = (selectedTabIndex) => {
    this.props.onSelect(selectedTabIndex);
    this.setState({ selectedTab: selectedTabIndex });
  }

  tabKeyboardNavHandler = (key) => {
    // Handle left and right arrow key presses by selecting the previous or next tab
    const selectedIndex = this.state.selectedTab;
    if (selectedIndex !== null) {
      let nextIndex = selectedIndex;

      if (key === 'ArrowLeft') {
        nextIndex = selectedIndex - 1 < 0 ? 0 : selectedIndex - 1;
      } else if (key === 'ArrowRight') {
        nextIndex = selectedIndex + 1 > this.props.tabs.length - 1
          ? this.props.tabs.length - 1
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
        onKeyboardNav={this.tabKeyboardNavHandler}
        tabs={this.getTabs()}
      />
    );
  }
}
