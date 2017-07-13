import React from 'react';

/* eslint-disable import/no-duplicates, import/first */
import Example from './example';
import exampleSrc from '!raw-loader!./example';
/* eslint-enable import/no-duplicates, import/first */

export const description = (
  <div>
    <p>Badges are visual indicators for numeric values such as tallies and
      scores. They&#39;re commonly used before and after the label of the
      thing they&#39;re quantifying.
    </p>
    <p>
      They must be used once after a single item name, and have only numbers.
    </p>
    <ul>
      <li>Use lozenges for statuses.</li>
      <li>Use labels to call out tags and high-visibility attributes.</li>
      <li>Use a tooltip if you want to indicate units.</li>
    </ul>
  </div>
);

export const examples = [
  {
    title: 'Basic Usage',
    Component: Example,
    src: exampleSrc,
  },
];
