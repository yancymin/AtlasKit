import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme from '@atlaskit/util-readme';

import { name } from '../package.json';

const description = 'Toggles are a quick way to view and switch between enabled or disabled states. Use toggles when your main intent is to turn something on or off';

/* eslint-disable import/no-duplicates, import/first */
import statefulComponent from '../src/Toggle';
import statefulComponentSource from '!raw!../src/Toggle';
import statefulOverview from './examples/stateful-example';
import statefulOverviewSource from '!raw!./examples/stateful-example';

import statelessComponent from '../src/ToggleStateless';
import statelessComponentSource from '!raw!../src/ToggleStateless';
import statelessOverview from './examples/stateless-example';
import statelessOverviewSource from '!raw!./examples/stateless-example';
/* eslint-enable import/no-duplicates, import/first */

storiesOf(name, module)
  .add('📖 Toggle readme', () => (
    <Readme
      name={name}
      component={statefulComponent}
      componentSource={statefulComponentSource}
      example={statefulOverview}
      exampleSource={statefulOverviewSource}
      description={description}
    />
  ))
  .add('📖 Toggle (Stateless) readme', () => (
    <Readme
      name={name}
      component={statelessComponent}
      componentSource={statelessComponentSource}
      example={statelessOverview}
      exampleSource={statelessOverviewSource}
      description={description}
    />
  ));
