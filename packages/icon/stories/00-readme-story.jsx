import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme from '@atlaskit/util-readme';

import { name, description } from '../package.json';

/* eslint-disable import/no-duplicates, import/first */
import Icon from '../src';
import IconSource from '!raw!../src/components/Icon';
import defaultOverview from './examples/icon-example';
import defaultOverviewSource from '!raw!./examples/icon-example';
/* eslint-enable import/no-duplicates, import/first */

storiesOf(name, module)
  .add('📖 Icon readme', () => (
    <Readme
      name={name}
      component={Icon}
      componentSource={IconSource}
      example={defaultOverview}
      exampleSource={defaultOverviewSource}
      description={description}
    />
  ));
