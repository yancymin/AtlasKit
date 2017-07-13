import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import exampleSrc from '!raw-loader!./Example';
import StatelessExample from './StatelessExample';
import statelessExampleSrc from '!raw-loader!./StatelessExample';
import GrouplessExample from './GrouplessExample';
import grouplessExampleSrc from '!raw-loader!./GrouplessExample';
/* eslint-enable import/no-duplicates, import/first */

const Usage = styled.pre`
  background-color: #F4F5F7;
  border-radius: 5px;
  margin: 14px 0;
  padding: 8px;
`;

export const description = (
  <div>
    <p>
      A dropdown select field that allows multiple items from the list to be selected
      at once. It exports a default stateful component, that handles updating the
      selected items, and a stateless component if you want to handle updates manually.
    </p>
    <Usage>
      {"import MultiSelect, { MultiSelectStateless } from '@atlaskit/multi-select'"}
    </Usage>
  </div>
);

export const examples = [
  {
    title: 'Basic Usage',
    Component: Example,
    src: exampleSrc,
  },
  {
    title: 'Stateless Usage',
    Component: StatelessExample,
    src: statelessExampleSrc,
  },
  {
    title: 'Groupless Usage',
    Component: GrouplessExample,
    src: grouplessExampleSrc,
  },
];
