import React, { Component } from 'react';
import DropdownList, { Group, Item } from '@atlaskit/droplist';
import { akColorN800 } from '@atlaskit/util-shared-styles';

const DroplistOverview = class extends Component {
  render() {
    return (<DropdownList
      isOpen
      shouldFitContainer
      trigger={<div style={{ border: `1px solid ${akColorN800}` }}>This is the wide trigger</div>}
    >
      <Group heading="Australia">
        <Item>Sydney</Item>
        <Item>Canberra</Item>
        <Item>Melbourne</Item>
      </Group>
    </DropdownList>);
  }
};

export default (
  <DroplistOverview />
);
