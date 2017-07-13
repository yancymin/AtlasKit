import React, { Component } from 'react';
import Button from '@atlaskit/button';

import DropdownMenu from '../src';
import { simpleDropdownItems } from './DropdownsData';

export default class DropWithBut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDropdownOpen: false,
      items: simpleDropdownItems,
    };
  }

  render() {
    return (<div style={{ padding: '40px' }}>
      <button
        onClick={() => {
          const newItems = [].concat(simpleDropdownItems[0].items.push({ content: 'new item!!' }));
          this.setState({
            items: newItems,
          });
        }}
      >Load more items!</button>
      <div style={{ padding: '20px 0' }}>
        <DropdownMenu
          items={simpleDropdownItems}
          onOpenChange={(attrs) => {
            this.setState({ isDropdownOpen: attrs.isOpen });
          }}
        >
          <Button isSelected={this.state.isDropdownOpen}>Click me, I&#39;m just a button</Button>
        </DropdownMenu>
      </div>
    </div>);
  }
}
