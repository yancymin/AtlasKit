import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Badge from '../src';
import { name } from '../package.json';

/* eslint-disable import/first, import/no-duplicates, no-duplicate-imports */
import BasicUsageExample from './examples/basic-usage';
import BasicUsageExampleRaw from '!raw!./examples/basic-usage';
/* eslint-enable import/first, import/no-duplicates, no-duplicate-imports */

const imports = [['React', 'react'], ['Badge', '@atlaskit/badge']];
storiesOf(name, module)
  .addCodeExampleStory('BasicUsage handler prop', () => (
    BasicUsageExample
  ), { scripts: [BasicUsageExampleRaw] })
  .addCodeExampleStory('with no value', () => (
    <Badge />
  ), { imports })
  .addCodeExampleStory('with a negative value', () => (
    <Badge value={-5} />
  ), { imports })
  .addCodeExampleStory('with a max value', () => (
    <Badge max={99} value={500} />
  ), { imports })
  .addCodeExampleStory('with value <= max value', () => (
    <Badge max={99} value={50} />
  ), { imports })
  .addCodeExampleStory('with value === max value', () => (
    <Badge max={99} value={99} />
  ), { imports });
