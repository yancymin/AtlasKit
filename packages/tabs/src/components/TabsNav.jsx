import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TabLabel,
  TabLabels,
} from '../styled/TabsNav';

export default class TabsNav extends PureComponent {
  static propTypes = {
    onKeyboardNav: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      label: PropTypes.string.isRequired,
      onSelect: PropTypes.func.isRequired,
      isSelected: PropTypes.bool,
    })),
  }

  static defaultProps = {
    tabs: [],
  }

  state = {
    wasKeyboardNav: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Don't re-render when we are resetting the `wasKeyboardNav` state
    if (nextState.wasKeyboardNav !== this.state.wasKeyboardNav && !nextState.wasKeyboardNav) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    // Focus the selected tab if it was selected via keyboard nav
    this.tabs.forEach((tab) => {
      if (tab.el) {
        if (this.state.wasKeyboardNav && tab.isSelected) {
          tab.el.focus();
          this.setState({ wasKeyboardNav: false });
        } else {
          // Ensure that focus does not stay on an unselected tab
          tab.el.blur();
        }
      }
    });
  }

  tabKeyDownHandler = (e) => {
    this.setState({ wasKeyboardNav: true });
    this.props.onKeyboardNav(e.key);
  }

  tabMouseDownHandler = e => e.preventDefault()

  render() {
    this.tabs = [];
    const { tabs } = this.props;
    /* eslint-disable jsx-a11y/role-supports-aria-props, jsx-a11y/no-static-element-interactions */
    return (
      <div>
        {
          // without this outer div the ul renders incorrectly in Chrome only, tried for ages to
          // fix but can't see the reason. it has something to do with the UL having display: flex
          // ¯\_(ツ)_/¯
        }
        <TabLabels
          role="tablist"
        >
          {tabs.map((tab, index) => (
            <TabLabel
              aria-posinset={index + 1}
              aria-selected={tab.isSelected}
              aria-setsize={tabs.length}
              isSelected={tab.isSelected}
              key={index}
              onClick={tab.onSelect}
              onKeyDown={this.tabKeyDownHandler}
              onMouseDown={this.tabMouseDownHandler}
              innerRef={(ref) => {
                this.tabs.push({
                  el: ref,
                  isSelected: tab.isSelected,
                });
              }}
              role="tab"
              tabIndex={tab.isSelected ? 0 : -1}
            >
              {tab.label}
            </TabLabel>
          ))}
        </TabLabels>
      </div>
    );
    /* eslint-enable jsx-a11y/role-supports-aria-props, jsx-a11y/no-static-element-interactions */
  }
}
