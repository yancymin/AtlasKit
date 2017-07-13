import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';

/* eslint-disable import/first, import/no-duplicates, no-duplicate-imports */
import CSSColorExample from './examples/icon-color-css-example';
import CSSColorExampleRaw from '!raw!./examples/icon-color-css-example';

import JSColorExample from './examples/icon-color-js-example';
import JSColorExampleRaw from '!raw!./examples/icon-color-js-example';
/* eslint-enable import/first, import/no-duplicates, no-duplicate-imports */

// const imports = [['React', 'react'], ['Badge', '@atlaskit/badge']];

storiesOf(name, module)
  .addExampleWithCodeStory('Customise icon color with props',
   () => <JSColorExample />,
   { scripts: [JSColorExampleRaw] },
  )
  .addExampleWithCodeStory('Customise icon color with CSS',
   () => <CSSColorExample />,
   { scripts: [CSSColorExampleRaw] },
  );
