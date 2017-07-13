import React from 'react';
import DropdownMenu from '@atlaskit/dropdown-menu';
import Arrow from '@atlaskit/icon/glyph/arrow-right-long';
import Lozenge from '@atlaskit/lozenge';

export default (
  <DropdownMenu
    defaultOpen
    triggerType="button"
    items={[
      {
        heading: '',
        items: [
          {
            content: 'Status project',
            elemAfter: <div style={{ display: 'flex', alignItems: 'center', width: '105px' }}>
              <Arrow label="" size="small" /><Lozenge appearance="inprogress">in progress</Lozenge>
            </div>,
          },
          {
            content: 'Move to done',
            elemAfter: <div style={{ display: 'flex', alignItems: 'center', width: '105px' }}>
              <Arrow label="" size="small" /><Lozenge appearance="success">done</Lozenge>
            </div>,
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
  >
    To do
  </DropdownMenu>
);
