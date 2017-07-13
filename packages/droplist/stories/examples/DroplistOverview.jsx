import React, { Component } from 'react';
import Button from '@atlaskit/button';
import DropdownList, { Group, Item } from '@atlaskit/droplist';

const DroplistOverview = class extends Component {
  render() {
    return (<DropdownList
      appearance="default"
      isOpen
      isTriggerNotTabbable
      onOpenChange={(attrs) => {
        console.log(attrs.isOpen);
      }}
      position="right top"
      trigger={<Button isSelected>...</Button>}
    >
      <Group heading="Australia">
        <Item href="//atlassian.com" target="_blank">Sydney</Item>
        <Item isHidden>Hidden item</Item>
        <Item>Canberra</Item>
        <Item
          onActivated={(attrs) => {
            console.log(attrs.item);
          }}
        >Melbourne</Item>
      </Group>
    </DropdownList>);
  }
};

export default (
  <DroplistOverview />
);
