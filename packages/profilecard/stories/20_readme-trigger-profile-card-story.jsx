import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from '@atlaskit/util-readme';

// eslint-disable-next-line import/no-duplicates
import ProfilecardExampleTrigger from './examples/ProfilecardTrigger';

/* eslint-disable import/first, import/no-duplicates */
import ProfilecardExampleTriggerRaw from '!raw!./examples/ProfilecardTrigger-source';

import { name, description } from '../package.json';
import AkProfilecardTrigger from '../src/profilecard-trigger';

const profilecardPropDescriptions = {
  cloudId: '',
  userId: '',
  actions: 'Action buttons',
  resourceClient: 'Instance of AkProfileClient',
};

const profilecardPropTypes = {
  userId: 'string',
  cloudId: 'string',
  position: 'string',
  actions: `arrayOf(React.PropTypes.shape({
    callback: React.PropTypes.function,
    label: React.PropTypes.string
  }))`,
  resourceClient: 'AkProfilecardClient',
};

storiesOf(`${name}-trigger`, module)
  .add('📖 ProfilecardTrigger ReadMe', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={ProfilecardExampleTriggerRaw}>
          {ProfilecardExampleTrigger}
        </Code>
        <Props
          component={AkProfilecardTrigger}
          descriptions={profilecardPropDescriptions}
          types={profilecardPropTypes}
        />
      </Readme>
    </div>
  ));
