import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import ExampleSrc from '!raw-loader!./Example';
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
      Text Field exports both a stateful default component, and a stateless
      component. The stateful component manages the value of the input for you
      and passes all other props on to the stateless version.
    </p>
    <Usage>
      {"import TextField, { FieldText } from '@atlaskit/field-text'"}
    </Usage>
  </div>
);

export const examples = [
  {
    title: 'Basic Examples',
    Component: Example,
    src: ExampleSrc,
  },
  {
    title: 'Stateless Example',
    Component: StatelessExample,
    src: statelessExampleSrc,
  },
];
