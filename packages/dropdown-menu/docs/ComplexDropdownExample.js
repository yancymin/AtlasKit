import React from 'react';
import DropdownMenu from '@atlaskit/dropdown-menu';

const simpleDropdownItems = [
  {
    heading: 'Cities',
    items: [
      { content: 'Sydney', type: 'checkbox' },
      { content: 'Canberra', type: 'checkbox' },
      {
        content: '"shouldAllowMultilineItems" makes this line wrap.',
        type: 'checkbox',
      },
    ],
  },
];

const DefaultMenuExample = () => (
  <DropdownMenu
    items={simpleDropdownItems}
    triggerType="button"
    appearance="tall"
    shouldFlip={false}
    position="right middle"
    shouldAllowMultilineItems
    onItemActivated={e => console.log(e.item)}
    onOpenChange={e => console.log('dropdown opened', e)}
  >
    Choices
  </DropdownMenu>
);

export default DefaultMenuExample;
