import React from 'react';
import {
  AkProfilecardTrigger,
} from '@atlaskit/profilecard';

import MockProfileClient from '../story-data';

const mockClient = new MockProfileClient();

const canvasStyles = {
  paddingBottom: '360px',
};

export default (
  <div style={canvasStyles}>
    <AkProfilecardTrigger
      position="bottom left"
      cloudId="DUMMY-CLOUDID"
      userId="2"
      resourceClient={mockClient}
      actions={[
        {
          label: 'View profile',
          callback: () => {},
        },
      ]}
    >
      <strong>Hover Over Me</strong>
    </AkProfilecardTrigger>
  </div>
);
