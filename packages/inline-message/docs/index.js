import React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable import/no-duplicates, import/first */
import OptionExamples from './OptionExamples';
import optionExamplesSrc from '!raw-loader!./OptionExamples';
import TypeExamples from './TypeExamples';
import typeExamplesSrc from '!raw-loader!./TypeExamples';
/* eslint-enable import/no-duplicates, import/first */

export const description = (
  <div>
    <p>
      Creates a link that opens an <Link to="/components/inline-dialog">Inline
      Dialog</Link>. Provides an icon to indicate the type of dialog, with options
      for a heading and secondary text.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Usage',
    Component: OptionExamples,
    src: optionExamplesSrc,
  },
  {
    title: 'Different Types',
    Component: TypeExamples,
    src: typeExamplesSrc,
  },
];
