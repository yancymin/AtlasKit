import React from 'react';
import DropdownMenu from '@atlaskit/dropdown-menu';

const simpleDropdownItems = [
  {
    heading: 'Cities',
    items: [
      { content: 'Sydney', type: 'radio' },
      { content: 'Canberra', type: 'radio' },
      {
        content: 'Line is too long and so the last words are lost',
        type: 'radio',
      },
    ],
  },
];

const DefaultMenuExample = () => (
  <DropdownMenu
    items={simpleDropdownItems}
    onItemActivated={e => console.log(e.item)}
    triggerType="button"
  >
    Choose
  </DropdownMenu>
);

export default DefaultMenuExample;
