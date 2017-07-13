import React, { Component } from 'react';
import DropdownList, { Group, Item } from '@atlaskit/droplist';
import { akColorN800 } from '@atlaskit/util-shared-styles';
import Arrow from '@atlaskit/icon/glyph/arrow-right-long';
import Lozenge from '@atlaskit/lozenge';

const DroplistOverview = class extends Component {
  render() {
    return (
      <div style={{ maxWidth: '400px' }}>
        <DropdownList
          isOpen
          shouldFitContainer
          trigger={<div style={{ border: `1px solid ${akColorN800}` }}>This is the wide trigger</div>}
        >
          <Item>This is not that long</Item>
          <Item type="checkbox">
            some checkbox with a long long long long long long content
          </Item>
          <Item
            elemAfter={
              <div style={{ display: 'flex', alignItems: 'center', width: '105px' }}>
                <Arrow label="" /><Lozenge appearance="success">done</Lozenge>
              </div>
            }
          >this item should display an arrow with a done lozenge</Item>
          <Group heading="Some heading">
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
