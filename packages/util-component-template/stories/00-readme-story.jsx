import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Readme from '@atlaskit/util-readme';

import { name, description } from '../package.json';

/* eslint-disable import/no-duplicates, import/first */
import defaultComponent from '../src/stateful';
import defaultComponentSource from '!raw!../src/stateful';
import defaultOverview from './examples/stateful-overview';
import defaultOverviewSource from '!raw!./examples/stateful-overview';

import statelessComponent from '../src/stateless';
import statelessComponentSource from '!raw!../src/stateless';
import statelessOverview from './examples/stateless-overview';
import statelessOverviewSource from '!raw!./examples/stateless-overview';
/* eslint-enable import/no-duplicates, import/first */

storiesOf(name, module)
  .add('📖 Export: Default', () => (
    <Readme
      name={name}
      component={defaultComponent}
      componentSource={defaultComponentSource}
      example={defaultOverview}
      exampleSource={defaultOverviewSource}
      description={description}
    />
  )).add('📖 Export: Toggle', () => (
    <Readme
      name={name}
      component={statelessComponent}
      componentSource={statelessComponentSource}
      example={statelessOverview}
      exampleSource={statelessOverviewSource}
      description={description}
    />
  ));
