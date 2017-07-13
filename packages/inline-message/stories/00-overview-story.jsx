import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from '@atlaskit/util-readme';

import InlineMessageExample from './examples/InlineMessageExample'; // eslint-disable-line import/first, import/no-duplicates
import InlineMessageExampleRaw from '!raw!./examples/InlineMessageExample'; // eslint-disable-line import/first, import/no-duplicates

import { name, description } from '../package.json';
import InlineMessage from '@atlaskit/inline-message';

const inlineMessagePropDescriptions = {
  children: 'Content to display inside the dialog that is shown when the user clicks the inline message',
  title: 'Main text to be shown next to the icon',
  type: 'Defines the icon and colour to be used for the message',
  secondaryText: 'Text to be shown in a more subtle color next to the main text',
  position: 'Position of inline dialog',
};

const inlineMessagePropTypes = {
  children: 'node',
  title: 'string',
  type: 'oneOf(["connectivity", "confirmation", "info", "warning", "error"])',
  secondaryText: 'string',
  position: 'oneOf(["top left", "top center", "top right", "right top", "right middle", "right bottom", "bottom left", "bottom center", "bottom right", "left top", "left middle", "left bottom"])',
};

storiesOf(name, module)
  .add('Overview', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={InlineMessageExampleRaw}>
          {InlineMessageExample}
        </Code>
        <Props
          component={InlineMessage}
          descriptions={inlineMessagePropDescriptions}
          types={inlineMessagePropTypes}
        />
      </Readme>
    </div>
  ));
