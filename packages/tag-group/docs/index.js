import React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import exampleSrc from '!raw-loader!./Example';
/* eslint-enable import/no-duplicates, import/first */

export const description = (
  <div>
    <p>
      A container around a <Link to="/components/tag">Tag</Link> component that
      applies consistent styling to the collection of ties.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Example',
    Component: Example,
    src: exampleSrc,
  },
];
