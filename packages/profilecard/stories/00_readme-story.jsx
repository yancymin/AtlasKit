import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from '@atlaskit/util-readme';

// eslint-disable-next-line import/no-duplicates
import ProfilecardExample from './examples/Profilecard';

/* eslint-disable import/first, import/no-duplicates */
import ProfilecardExampleRaw from '!raw!./examples/Profilecard';

import { name, description } from '../package.json';
import { AkProfilecard } from '../src';

const profilecardPropDescriptions = {
  avatarUrl: 'A url to load an image from (this can also be a base64 encoded image)',
  fullName: '',
  meta: 'Users job title / position',
  nickname: '',
  location: '',
  timestring: '',
  presence: 'Indicates a user\'s online status',
  actions: 'Action buttons',
  isLoading: 'Shows loading state if true',
  hasError: 'Shows error state if true',
  clientFetchProfile: 'Used in error state to retry loading profile data. Usually passed from AkProfilecardResourced',
};

const profilecardPropTypes = {
  avatarUrl: 'string',
  fullName: 'string',
  meta: 'string',
  nickname: 'string',
  location: 'string',
  timestring: 'string',
  presence: 'oneOf(["none", "available", "busy", "unavailable"]',
  actions: `arrayOf(React.PropTypes.shape({
    callback: React.PropTypes.function,
    id: React.PropTypes.string
    label: React.PropTypes.string
  }))`,
  isLoading: 'bool',
  hasError: 'bool',
  clientFetchProfile: 'func',
};

storiesOf(name, module)
  .add('📖 Profilecard ReadMe', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={ProfilecardExampleRaw}>
          {ProfilecardExample}
        </Code>
        <Props
          component={AkProfilecard}
          descriptions={profilecardPropDescriptions}
          types={profilecardPropTypes}
        />
      </Readme>
    </div>
  ));
