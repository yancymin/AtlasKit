import { storiesOf } from '@kadira/storybook';
import Tag from '@atlaskit/tag';
import React from 'react';

import Group from '../src';
import { name } from '../package.json';

const imports = [
  ['React', 'react'],
  ['TagGroup', '@atlaskit/tag-group'],
  ['Tag', '@atlaskit/tag'],
];

storiesOf(name, module)
  .addCodeExampleStory('a simple @atlaskit/tag-group', () => (
    <Group>
      <Tag text="Cupcake" />
      <Tag text="Wagon Wheel" />
      <Tag text="Jelly beans" />
      <Tag text="Chocolate" />
    </Group>
  ), { imports });
