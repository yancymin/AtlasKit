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
      Single Select Renders a dropdown component with a list of options. It exports
      a stateful component by default, as well as a stateless component.
    </p>
    <Usage>
      {"import SingleSelect, { StatelessSelect } from '@atlaskit/single-select'"}
    </Usage>
    <p>
        It can be rendered as a searchable field, using
        the <code>hasAutocomplete</code> prop.
    </p>
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
];
