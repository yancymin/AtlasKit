import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import exampleSrc from '!raw-loader!./Example';
import StatelessExample from './StatelessExample';
import statelessExampleSrc from '!raw-loader!./StatelessExample';
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
      The tooltip component exports a default stateful component, and a stateless
      named export.
    </p>
    <Usage>
      {"import StatefulToolTip, { Tooltip } from '@atlaskit/tooltip'"}
    </Usage>
    <p>
      The stateful component displays the tooltip automatically on mouseover.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Example',
    Component: Example,
    src: exampleSrc,
  },
  {
    title: 'Stateless Example',
    Component: StatelessExample,
    src: statelessExampleSrc,
  },
];
