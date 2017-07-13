import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from '@atlaskit/util-readme';

// eslint-disable-next-line import/no-duplicates
import ProfilecardExampleResourced from './examples/ProfilecardResourced';

/* eslint-disable import/first, import/no-duplicates */
import ProfilecardExampleResourcedRaw from '!raw!./examples/ProfilecardResourced-source';

import { name, description } from '../package.json';
import AkProfilecardResourced from '../src';

const profilecardPropDescriptions = {
  cloudId: '',
  userId: '',
  actions: 'Action buttons',
  resourceClient: 'Instance of AkProfileClient',
};

const profilecardPropTypes = {
  userId: 'string',
  cloudId: 'string',
  actions: `arrayOf(React.PropTypes.shape({
    callback: React.PropTypes.function,
    id: React.PropTypes.string
    label: React.PropTypes.string
  }))`,
  resourceClient: 'AkProfilecardClient',
};

storiesOf(`${name}-resourced`, module)
  .add('📖 ProfilecardResourced ReadMe', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={ProfilecardExampleResourcedRaw}>
          {ProfilecardExampleResourced}
        </Code>
        <Props
          component={AkProfilecardResourced}
          descriptions={profilecardPropDescriptions}
          types={profilecardPropTypes}
        />
      </Readme>
    </div>
  ));
