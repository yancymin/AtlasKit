import React from 'react';
import DropdownMenu from '@atlaskit/dropdown-menu';

const trigger = (<div style={{ border: '1px solid black', padding: '8px' }}>
    This is the trigger
</div>);

export default (
  <DropdownMenu
    items={[
      {
        heading: 'Menu Heading',
        items: [
          {
            content: 'Status project',
          },
          {
            content: 'Move to done',
          },
          {
            content: 'View workflow',
          },
        ],
      },
    ]}
    onItemActivated={(item) => {
      // you can do allthethings here!
      console.log(item);
    }}
    shouldFitContainer
  >
    {trigger}
  </DropdownMenu>
);
