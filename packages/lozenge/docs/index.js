import React from 'react';

/* eslint-disable import/no-duplicates, import/first */
import Examples from './Examples';
import examplesSrc from '!raw-loader!./Examples';
/* eslint-enable import/no-duplicates, import/first */

export const description = (
  <div>
    <p>
      Use lozenges to highlight an item{"'"}s status for quick recognition.
      Use subtle lozenges by default and in instances where they may dominate
      the screen, such as in long tables.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Usage',
    Component: Examples,
    src: examplesSrc,
  },
];
