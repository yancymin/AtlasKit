import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme from '@atlaskit/util-readme';

/* eslint-disable import/first, import/no-duplicates */
import component from '../src/';
import componentSrc from '!raw!../src/Banner';
import example from './examples/basic-usage';
import exampleSrc from '!raw!./examples/basic-usage';
/* eslint-enable import/first, import/no-duplicates */

import { name, description } from '../package.json';

storiesOf(name, module)
  .add('📖 Banner readme', () => (
    <Readme
      name={name}
      component={component}
      componentSource={componentSrc}
      example={example}
      exampleSource={exampleSrc}
      description={description}
    />
  ));
