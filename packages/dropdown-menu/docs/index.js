import React from 'react';

/* eslint-disable import/no-duplicates, import/first */
import DefaultDropdownExample from './DefaultDropdownExample';
import defaultDropdownExampleSrc from '!raw-loader!./DefaultDropdownExample';
import StatelessDropdownExample from './StatelessDropdownExample';
import statelessDropdownExampleSrc from '!raw-loader!./StatelessDropdownExample';
import ComplexDropdownExample from './ComplexDropdownExample';
import complexDropdownExampleSrc from '!raw-loader!./ComplexDropdownExample';
/* eslint-enable import/no-duplicates, import/first */

const preStyles = {
  backgroundColor: '#F4F5F7',
  borderRadius: 5,
  marginBottom: 14,
  marginTop: 14,
  padding: 8,
};

export const description = (
  <div>
    <p>
      The dropdown menu has two exports, a default stateful component,
      and a stateless component when you want to have more direct control over
      all actions.
    </p>
    <pre style={preStyles}>
      {'import DropdownMenu, { DropdownMenuStateless } from @atlaskit/dropdown-menu'}
    </pre>
    <p>
      The stateful component handles selection for you, while
      still providing several functions that allow you to retrieve information
      from a form, most notably <code>onItemActivated</code>, which returns an
      item when it is clicked on.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Default Dropdown Menu',
    Component: DefaultDropdownExample,
    src: defaultDropdownExampleSrc,
  },
  {
    title: 'Complex Dropdown Menu',
    Component: ComplexDropdownExample,
    src: complexDropdownExampleSrc,
  },
  {
    title: 'Stateless Dropdown Menu',
    Component: StatelessDropdownExample,
    src: statelessDropdownExampleSrc,
  },
];
