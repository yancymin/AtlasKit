import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Lozenge from '../src';
import { name } from '../package.json';

const imports = [
  ['React', 'react'],
  ['Lozenge', '@atlaskit/lozenge'],
];

storiesOf(name, module)
  .addCodeExampleStory('standard and bold lozenges', () => (
    <div>
      <h2>Standard lozenges</h2>
      <p><Lozenge>Default</Lozenge></p>
      <p><Lozenge appearance="success">Success</Lozenge></p>
      <p><Lozenge appearance="removed">removed</Lozenge></p>
      <p><Lozenge appearance="inprogress">in progress</Lozenge></p>
      <p><Lozenge appearance="new">new</Lozenge></p>
      <p><Lozenge appearance="moved">moved</Lozenge></p>
      <h2>Bold lozenges</h2>
      <p><Lozenge isBold>Default</Lozenge></p>
      <p><Lozenge isBold appearance="success">Success</Lozenge></p>
      <p><Lozenge isBold appearance="removed">removed</Lozenge></p>
      <p><Lozenge isBold appearance="inprogress">in progress</Lozenge></p>
      <p><Lozenge isBold appearance="new">new</Lozenge></p>
      <p><Lozenge isBold appearance="moved">moved</Lozenge></p>
    </div>
  ), { imports })
  .addCodeExampleStory('truncation when too wide', () => (
    <div>
      <p>
        <Lozenge appearance="success">
          very very very wide text which truncates
        </Lozenge>
      </p>
      <p>
        <Lozenge appearance="success" isBold>
          very very very wide text which truncates
        </Lozenge>
      </p>
    </div>
  ), { imports })
  .addBaselineAligned('baseline alignment', () => (
    <Lozenge isBold appearance="new">lozenge</Lozenge>
  ));
