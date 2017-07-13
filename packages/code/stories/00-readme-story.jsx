import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Readme from '@atlaskit/util-readme';

import { name, description } from '../package.json';

/* eslint-disable import/no-duplicates, import/first, import/extensions */
import { AkCode, AkCodeBlock } from '@atlaskit/code';
import codeRaw from '!raw!../src/Code.tsx';
import codeBlockRaw from '!raw!../src/CodeBlock.tsx';
import CodeOverview from './examples/code-overview';
import CodeBlockOverview from './examples/code-block-overview';
import CodeOverviewExampleRaw from '!raw!./examples/code-overview.tsx';
import CodeBlockOverviewExampleRaw from '!raw!./examples/code-block-overview.tsx';
/* eslint-enable import/no-duplicates, import/first, import/extensions */

storiesOf(name, module)
  .add('📖 Code Readme', () => (
    <Readme
      component={AkCode}
      componentSource={codeRaw}
      description={description}
      example={CodeOverview}
      exampleSource={CodeOverviewExampleRaw}
      name={name}
    />
    )
  )
  .add('📖 CodeBlock Readme', () => (
    <Readme
      component={AkCodeBlock}
      componentSource={codeBlockRaw}
      description={description}
      example={CodeBlockOverview}
      exampleSource={CodeBlockOverviewExampleRaw}
      name={name}
    />
    )
  );
