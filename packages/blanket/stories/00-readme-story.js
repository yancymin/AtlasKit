import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme from '@atlaskit/util-readme';

/* eslint-disable import/first, import/no-duplicates */
import defaultComponent from '../src/Blanket';
import defaultComponentSource from '!raw!../src/Blanket';
import defaultOverviewSource from '!raw!./examples/basic-usage';
/* eslint-enable import/first, import/no-duplicates */

import { name } from '../package.json';

const description = (
  <div>
    <p>The main purpose of the blanket component is to provide the overlay layer for components such
      as a modal dialog or a tooltip.
    </p>
    <p>
      No custom z-index style is applied, so make sure you put it into an appropriate DOM position.
    </p>
    <p>For the purpose of simplicity blanket doesn&#40;t have any `show/hide` functionality.
      Since the main use of it suppose to be inside `popup` elements it would appear/disappear with
      the parent element.
    </p>
  </div>
);

storiesOf(name, module)
  .add('📖 Export: Default', () => (
    <Readme
      name={name}
      component={defaultComponent}
      componentSource={defaultComponentSource}
      example={'To see a live example of this, use the storybooks on the left'}
      exampleSource={defaultOverviewSource}
      description={description}
    />
  ));
