import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Avatar from '@atlaskit/avatar';

import styles from './styles.less';
import Component from '../src/index';
import { name } from '../package.json';

const imports = [
  ['React', 'react'],
  ['Tag', '@atlaskit/tag'],
];

storiesOf(name, module)
  .addCodeExampleStory('overview', () => (
    <div className={styles.flexContainer}>
      <Component
        text="Text only"
      />
      <Component
        href="https://some.link"
        text="Linked text"
      />
      <Component
        text="Removable"
        removeButtonText="Remove me"
      />
      <Component
        href="https://some.link"
        text="Removable & linked"
        removeButtonText="Remove me"
      />
      <Component
        text="Overflowing text that will be cut off"
      />
      <Component
        text="Text with button that will be cut off"
        removeButtonText="Remove me"
      />
      <Component
        appearance="rounded"
        text="A. Cool Name"
        elemBefore={<Avatar size="xsmall" />}
        removeButtonText="Remove me"
      />
      <Component
        appearance="rounded"
        href="https://some.link"
        text="A. Cool Name"
        elemBefore={<Avatar size="xsmall" />}
        removeButtonText="Remove me"
      />
    </div>
  ), { imports });
