import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import exampleSrc from '!raw-loader!./Example';
/* eslint-enable import/no-duplicates, import/first */

const Usage = styled.pre`
  background-color: #F4F5F7;
  border-radius: 5px;
  margin: 14px 0;
  padding: 8px;
`;

export const description = (
  <div>
    Toggle is a checkbox input, which is styled as a toggle. It exports both a
    default stateful component, and a stateless component.
    <Usage>
      {"import Toggle, { ToggleStateless } from '@atlaskit/toggle'"}
    </Usage>
    <p>
      Both stateful and stateless components manage the internal state of the toggle
      regarding whether it is checked or not. The stateful component allows you
      to specify a default value for whether it is checked.
    </p>
    <p>
      In the stateless version, the value passed in to isChecked is used as the
      initial value for the internal state, but cannot be externally provided
      to change it.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Example',
    Component: Example,
    src: exampleSrc,
  },
];
