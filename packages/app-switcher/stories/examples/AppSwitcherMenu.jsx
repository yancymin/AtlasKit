import React, { Component } from 'react';
import Button from '@atlaskit/button';
import DropdownList from '@atlaskit/droplist';
import AppSwitcher from '../../src';

const AppSwitcherMenu = class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDropdownOpen: true,
    };
  }

  render() {
    return (<DropdownList
      isOpen={this.state.isDropdownOpen}
      onOpenChange={(attrs) => {
        this.setState({ isDropdownOpen: attrs.isOpen });
      }}
      isTriggerNotTabbable
      appearance="tall"
      position="bottom left"
      listContext="menu"
      shouldFlip={false}
      trigger={<Button isSelected={this.state.isDropdownOpen}>...</Button>}
    >
      <AppSwitcher {...this.props} />
    </DropdownList>);
  }
};

export default AppSwitcherMenu;
