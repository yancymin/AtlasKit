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
      Tabs are a way to create navigation within a page, setting content to be
      displayed of each of a list of items, with logic around the switching of
      the content provided for you.
    </p>
    <Usage>
      {"import tabs, { StatelessTabs } from '@atlaskit/tabs'"}
    </Usage>
  </div>
);

export const examples = [
  {
    title: 'Basic Example',
    Component: Example,
    src: exampleSrc,
  },
  {
    title: 'Stateless Component Example',
    Component: StatelessExample,
    src: statelessExampleSrc,
  },
];
