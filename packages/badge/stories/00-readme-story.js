import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Readme from '@atlaskit/util-readme';

import { name } from '../package.json';

/* eslint-disable import/no-duplicates, import/first */
import defaultComponent from '../src/components/Badge';
import defaultComponentSource from '!raw!../src/components/Badge';
import defaultOverview from './examples/basic-usage';
import defaultOverviewSource from '!raw!./examples/basic-usage';
/* eslint-enable import/no-duplicates, import/first */

const description = (
  <div>
    <p>Badges are visual indicators for numeric values such as tallies and scores.
      They&#40;re commonly used before and after the label of the thing they&#40;re quantifying.
    </p>
    <p>They must be used singly after a single item name, and have only numbers.</p>
    <ul>
      <li>Use lozenges for statuses.</li>
      <li>Use labels to call out tags and high-visibility attributes.</li>
      <li>Use a tooltip if you want to indicate units.</li>
    </ul>
  </div>
);

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
  ));
