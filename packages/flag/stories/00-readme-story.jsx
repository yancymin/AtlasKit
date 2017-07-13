import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme from '@atlaskit/util-readme';

import { name } from '../package.json';

const description = 'Toggles are a quick way to view and switch between enabled or disabled states. Use toggles when your main intent is to turn something on or off';

/* eslint-disable import/no-duplicates, import/first */
import flagComponent from '../src/components/Flag';
import flagComponentSource from '!raw!../src/components/Flag';
import flagOverview from './examples/FlagExample';
import flagOverviewSource from '!raw!./examples/FlagExample';

import flagGroupComponent from '../src/components/FlagGroup';
import flagGroupComponentSource from '!raw!../src/components/FlagGroup';
import flagGroupOverview from './examples/FlagGroupExample';
import flagGroupOverviewSource from '!raw!./examples/FlagGroupExample';
/* eslint-enable import/no-duplicates, import/first */

storiesOf(name, module)
  .add('📖 Flag readme', () => (
    <Readme
      name={name}
      component={flagComponent}
      componentSource={flagComponentSource}
      example={flagOverview}
      exampleSource={flagOverviewSource}
      description={description}
    />
  ))
  .add('📖 FlagGroup readme', () => (
    <Readme
      name={name}
      component={flagGroupComponent}
      componentSource={flagGroupComponentSource}
      example={flagGroupOverview}
      exampleSource={flagGroupOverviewSource}
      description={description}
    />
  ));
