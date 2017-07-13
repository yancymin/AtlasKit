import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import { AkProfilecardTrigger } from '../src';

import TriggerInteractive from './interactive-trigger-position';

import MockProfileClient from './story-data';

const mockClient = new MockProfileClient({
  cacheSize: 10,
  cacheMaxAge: 0,
});

// have some more space around the profilecard
const canvasStyle = { padding: '30px' };

storiesOf(`${name}-trigger`, module)
  .add('In textblock', () => (
    <div style={canvasStyle}>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco <AkProfilecardTrigger
          cloudId="DUMMY-10ae0bf3-157e-43f7-be45-f1bb13b39048"
          userId="1"
          position="bottom left"
          resourceClient={mockClient}
          actions={[
            {
              label: 'View profile',
              callback: () => {},
            },
          ]}
        >
          <strong>Hover Over Me!</strong>
        </AkProfilecardTrigger> laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
        id est laborum.
      </div>
    </div>
  ))
  .add('Positioning', () => (
    <div style={canvasStyle}>
      <TriggerInteractive
        resourceClient={mockClient}
      />
    </div>
  ));
