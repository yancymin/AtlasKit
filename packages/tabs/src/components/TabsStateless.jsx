import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TabsDiv from '../styled/Tabs';

import TabPane from './TabPane';
import TabsNav from './TabsNav';

export default class Tabs extends PureComponent {
  static propTypes = {
    /** Handler for navigation using the keyboard buttons. */
    onKeyboardNav: PropTypes.func.isRequired,
    /** The tabs to display, with content being hidden unless the tab is selected. */
    tabs: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      isSelected: PropTypes.bool,
      label: PropTypes.node.isRequired,
      onSelect: PropTypes.func.isRequired,
    })),
  }

  static defaultProps = {
    tabs: [],
  }

  render() {
    const selectedTabs = this.props.tabs.filter(tab => tab.isSelected);
    const selectedTab = selectedTabs.length ? (
      <TabPane isSelected={selectedTabs[0].isSelected}>
        {selectedTabs[0].content}
      </TabPane>
    ) : null;

    return (
      <TabsDiv>
        <TabsNav
          onKeyboardNav={this.props.onKeyboardNav}
          tabs={this.props.tabs}
        />
        {selectedTab}
      </TabsDiv>
    );
  }
}
