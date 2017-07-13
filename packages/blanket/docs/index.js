import React from 'react';

/* eslint-disable import/no-duplicates, import/first */
import Example from './example';
import exampleSrc from '!raw-loader!./example';
/* eslint-enable import/no-duplicates, import/first */

export componentSource from '!raw-loader!../src/Blanket';

export const description = (
  <div>
    <p>
      The blanket component is designed to be used with a modal or popup, and
      overlay the rest of the page. It comes with
      an <code>onBlanketClicked</code> option that is designed to catch clicks
      elsewhere on the page other than the modal.
    </p>
    <p>
      Blanket does not have its own show/hide functionality, as it should be
      shown or hidden with its parent element.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Usage',
    Component: Example,
    src: exampleSrc,
  },
];
