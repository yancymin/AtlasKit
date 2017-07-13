import React, { Component } from 'react';
import DropdownList, { Group, Item } from '@atlaskit/droplist';
import { akColorN800 } from '@atlaskit/util-shared-styles';

const DroplistOverview = class extends Component {
  render() {
    return (
      <div style={{ maxWidth: '400px' }}>
        <DropdownList
          isOpen
          shouldFitContainer
          trigger={<div style={{ border: `1px solid ${akColorN800}` }}>This is the wide trigger</div>}
          shouldAllowMultilineItems
        >
          <Group heading="Allow multiline">
            <Item>What about if we put some really long content inside this dropdown menu</Item>
            <Item>And then we see how the text is hidden, okey now its going to be hidden </Item>
          </Group>
        </DropdownList>
      </div>
    );
  }
};

export default (
  <DroplistOverview />
);
