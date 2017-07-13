import React from 'react';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import exampleSrc from '!raw-loader!./Example';
import UsageExample from './UsageExample';
import usageExampleSrc from '!raw-loader!./UsageExample';
/* eslint-enable import/no-duplicates, import/first */

export const description = (
  <div>
    <p>
      Spinners are used for showing a system process of unknown length going on
      that ends with the system displaying results to the user. The spinner
      animates in, as well as animating out when <code>isCompleting</code> is
      passed to it.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Demonstration',
    Component: Example,
    src: exampleSrc,
  },
  {
    title: 'Animation Options',
    Component: UsageExample,
    src: usageExampleSrc,
  },
];
