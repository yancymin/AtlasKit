import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';
import AkToggle from '../src/';

storiesOf(name, module)
  .addCodeExampleStory('Stateful Toggle', () => (
    <AkToggle label="My toggle" />
  ));
