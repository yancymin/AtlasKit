import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Avatar from '@atlaskit/avatar';

import Tag from '../src';
import { name } from '../package.json';

const imports = [
  ['React', 'react'],
  ['Tag', '@atlaskit/tag'],
  ['Avatar', '@atlaskit/avatar'],
];

storiesOf(name, module)
  .addCodeExampleStory('ElemBefore: Avatar', () => (
    <Tag
      appearance="rounded"
      elemBefore={<Avatar size="xsmall" />}
      text="Default Avatar"
      removeButtonText="Remove me"
    />
  ), { imports });
