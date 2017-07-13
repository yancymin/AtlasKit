import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { name } from '../package.json';
import EventedGroup from './EventedGroup';

const tags = ['Candy canes', 'Tiramisu', 'Gummi bears', 'Wagon Wheels', 'Chupa Chups'];
const onRemove = text => action('Removing tag')(text);

const alignmentStory = dir => (
  <EventedGroup
    onRemove={onRemove}
    initialTags={tags}
    alignment={dir}
  />
);

storiesOf(name, module)
  .add('animation (text-start alignment)', () => alignmentStory('start'))
  .add('animation (text-end alignment)', () => alignmentStory('end'));
