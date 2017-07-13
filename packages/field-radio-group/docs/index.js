import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import ExampleSrc from '!raw-loader!./Example';
import StatelessExample from './StatelessExample';
import statelessExampleSrc from '!raw-loader!./StatelessExample';
import SingleRadioExample from './SingleRadioExample';
import singleRadioExampleSrc from '!raw-loader!./SingleRadioExample';
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
      Radio group exports a stateful component as the default export. This handles
      the selection of items for you. You can also import a stateless version
      as <code>AkFieldRadioGroup</code>.
    </p>
    <Usage>
      {"import RadioGroup, { AkFieldRadioGroup, AkRadio } from '@atlaskit/field-radio-group'"}
    </Usage>
    <p>
      Both accept a list of items that pass the properties on to
      a <code>akRadio</code> component to render. Both stateful and stateless
      maintain the state of their children <code>akRadio</code> components.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Radio Group Examples',
    Component: Example,
    src: ExampleSrc,
  },
  {
    title: 'Stateless Radio Group StatelessExample',
    Component: StatelessExample,
    src: statelessExampleSrc,
  },
  {
    title: 'Single Radio Button Component',
    Component: SingleRadioExample,
    src: singleRadioExampleSrc,
  },
];
