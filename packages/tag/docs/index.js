import React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import exampleSrc from '!raw-loader!./Example';
/* eslint-enable import/no-duplicates, import/first */

export const description = (
  <div>
    <p>
      Tags are designed to be displayed within a <Link to="/components/tag-group">Tag
      Group</Link>. They can be rendered flat, as links, or with a close button.
    </p>
    <p>
      <b>Note:</b> Once a tag has been removed, there is nothing that you can
      pass to it to make it re-render the tag.
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
