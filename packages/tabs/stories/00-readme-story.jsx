import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from '@atlaskit/util-readme';

import TabsExample from './examples/TabsExample'; // eslint-disable-line import/first, import/no-duplicates
import TabsExampleRaw from '!raw!./examples/TabsExample'; // eslint-disable-line import/first, import/no-duplicates

import { name, description } from '../package.json';
import Tabs from '@atlaskit/tabs';

const propDescriptions = {
  onSelect: 'Function that is called when the user selects a different tab. Not called on initial render.',
  tabs: 'Array of tab definition objects',
};

const propTypes = {
  tabs: `arrayOf(shape({
    content: node,
    label: node.isRequired,
    defaultSelected: bool,
  }))`,
};

storiesOf(name, module)
  .add('📖 Tabs Readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={TabsExampleRaw}>
          {TabsExample}
        </Code>
        <Props
          component={Tabs}
          descriptions={propDescriptions}
          types={propTypes}
        />
      </Readme>
    </div>
  ));
