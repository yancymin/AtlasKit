import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme from '@atlaskit/util-readme';

import { name, description } from '../package.json';

/* eslint-disable import/no-duplicates, import/first */
import defaultComponent from '../src/components/Stateful';
import defaultComponentSource from '!raw!../src/components/Stateful';
import defaultOverview from './examples/default-example';
import defaultOverviewSource from '!raw!./examples/default-example';

import fieldBaseComponent from '../src/components/Stateless';
import fieldBaseComponentSource from '!raw!../src/components/Stateless';
import fieldBaseOverview from './examples/field-base-example';
import fieldBaseOverviewSource from '!raw!./examples/field-base-example';

import labelComponent from '../src/components/Label';
import labelComponentSource from '!raw!../src/components/Label';
import labelOverview from './examples/label-example';
import labelOverviewSource from '!raw!./examples/label-example';
/* eslint-enable import/no-duplicates, import/first */

storiesOf(name, module)
  .add('📖 FieldBase readme', () => (
    <Readme
      name={name}
      component={defaultComponent}
      componentSource={defaultComponentSource}
      example={defaultOverview}
      exampleSource={defaultOverviewSource}
      description={description}
    />
  ))
  .add('📖 FieldBaseStateless readme', () => (
    <Readme
      name={name}
      component={fieldBaseComponent}
      componentSource={fieldBaseComponentSource}
      example={fieldBaseOverview}
      exampleSource={fieldBaseOverviewSource}
      description={description}
    />
  ))
  .add('📖 Label readme', () => (
    <Readme
      name={name}
      component={labelComponent}
      componentSource={labelComponentSource}
      example={labelOverview}
      exampleSource={labelOverviewSource}
      description={description}
    />
  ));
