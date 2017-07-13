import { storiesOf } from '@kadira/storybook';
import React from 'react';

import InteractiveLogo from './components/interactive-logo';
import { name } from '../package.json';

storiesOf(name, module)
    .add('Interactive example', () => (
      <InteractiveLogo />
    ));
