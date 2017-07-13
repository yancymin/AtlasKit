import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Chrome, Code, Description } from '@atlaskit/util-readme';
import { name } from '../package.json';

/* eslint-disable import/first, import/no-duplicates */
import ElevationExample from './examples/elevation';
import ElevationExampleRaw from '!raw!./examples/elevation';
/* eslint-enable import/first, import/no-duplicates */

storiesOf(name, module)
  .add('Mixin: Elevation', () => (
    <Chrome>
      <Description>
        Below are representations of each increment in the elevation mixin:
      </Description>
      <Code code={ElevationExampleRaw}>
        {ElevationExample}
      </Code>
    </Chrome>
  ));
