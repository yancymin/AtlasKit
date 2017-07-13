import React from 'react';
import DropdownMenu from '@atlaskit/dropdown-menu';

const items = [
  {
    heading: '',
    items: [
      {
        content: 'This is a very long text that will be cut off at some point',
        title: 'Show something here',
        href: 'http://atlassian.com',
      },
      {
        content: 'Another very long text that doesn`t have enough space in this tiny dropdown',
        title: 'Another very long text that doesn`t have enough space in this tiny dropdown',
        href: 'http://atlassian.com',
      },
    ],
  },
];

export default (
  <div style={{ padding: '40px' }}>
    <p>
      This is an example a dropdown with long items showing the default behaviour
    </p>
    <div style={{ padding: '20px 0' }}>
      <DropdownMenu
        defaultOpen
        items={items}
        triggerType="button"
      >
        Long Items
      </DropdownMenu>
    </div>
    <p>
      And this shows a dropdown with long items with multiline behaviour
    </p>
    <div style={{ padding: '20px 0' }}>
      <DropdownMenu
        items={items}
        triggerType="button"
        shouldAllowMultilineItems
      >
        Long multiline Items
      </DropdownMenu>
    </div>
  </div>
);
