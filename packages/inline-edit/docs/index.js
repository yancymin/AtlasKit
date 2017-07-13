import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import EditExamples from './EditExamples';
import editExamplesSrc from '!raw-loader!./EditExamples';
import SelectExample from './SelectExample';
import selectExampleSrc from '!raw-loader!./SelectExample';
import WaitingExample from './WaitingExample';
import waitingExampleSrc from '!raw-loader!./WaitingExample';
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
      The inline editor is designed to not stand out as an input when it is not
      focused or being interacted with. It is designed to be used as a wrapper
      to control an input component such
      as <Link to="/components/input">@atlaskit/input</Link> field.
    </p>
    <p>
      The package exports a stateful (default) and stateless version of <code>InlineEdit</code>:
    </p>
    <Usage>
      {'import InlineEditor, { InlineEdit } from @atlaskit/inline-edit'}
    </Usage>
    <p>
      The stateful inline editor manages the <code>onEditRequested</code>,
      {' '}<code>onCancel</code>, and <code>onConfirm</code> events and exposes
      {' '}<code>onCancel</code> and <code>onConfirm</code> handlers.
      All other props passed to the <code>InlineEditor</code> component are passed
      directly through to the stateless <code>InlineEdit</code> component.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Example',
    Component: EditExamples,
    src: editExamplesSrc,
  },
  {
    title: 'Select Input Example',
    Component: SelectExample,
    src: selectExampleSrc,
  },
  {
    title: 'Other States Examples',
    Component: WaitingExample,
    src: waitingExampleSrc,
  },
  {
    title: 'Stateless Example',
    Component: StatelessExample,
    src: statelessExampleSrc,
  },
];
