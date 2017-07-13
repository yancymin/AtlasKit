import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import FlagExample from './FlagExample';
import flagExampleSrc from '!raw-loader!./FlagExample';
/*
=============================================
NOTE: Flag group example is commented out as it does not display correctly.
We need to come back to this once the component is easier to make display correctly.
Currently it is mostly hidden behind the left navbar.
=============================================
*/
// import FlagGroupExample from './FlagGroupExample';
// import flagGroupExampleSrc from '!raw-loader!./FlagGroupExample';
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
      Flags are designed to place a message above the regular page content.
      The <code>Flag</code> component applies styling, while <code>FlagGroup</code> animates
      the loading and unloading of flags.
    </p>
    <Usage>
      {'import Flag, { FlagGroup } from @atlaskit/flag'}
    </Usage>
  </div>
);

export const examples = [
  {
    title: 'Flag Component',
    Component: FlagExample,
    src: flagExampleSrc,
  },
  // {
  //   title: 'Flag Group Example',
  //   Component: FlagGroupExample,
  //   src: flagGroupExampleSrc,
  // },
];
