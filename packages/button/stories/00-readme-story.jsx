import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from '@atlaskit/util-readme';

import ButtonOverviewExampleRaw from '!raw!./examples/ButtonOverview'; // eslint-disable-line import/no-duplicates
import ButtonOverviewExample from './examples/ButtonOverview'; // eslint-disable-line import/no-duplicates

import { name, description } from '../package.json';
import Button from '../src';

const buttonPropDescriptions = {
  appearance: 'Predefined appearances of an ak-button. One of: \'primary\', \'default\', \'subtle\', \'compact\', \'subtle-link\'',
  type: 'Type of the ak-button. One of: \'button\', \'submit\'',
  href: 'href of the ak-button.',
  target: 'Standard target attribute for hyperlinks',
  form: 'Standard HTML5 form attribute for buttons',
  isDisabled: 'Option to disable button and every click event',
  spacing: 'Option to change button\'s padding. One of: \'none\', \'compact\', \'default\'',
  isSelected: 'Option to make a button selected',
  theme: 'Option to have a dark look and feel of a button.',
  iconBefore: 'An @atlaskit/icon to be placed on the left of the button text',
  iconAfter: 'An @atlaskit/icon to be placed on the right of the button text',
  className: 'A custom class to be added to the button',
  onClick: 'Standard HTML5 \'click\' event handler',
  tabIndex: 'Standard HTML5 tab-index attribute',
  ariaHaspopup: 'Standard HTML5 aria-haspopup attribute',
  ariaExpanded: 'Standard HTML5 aria-expanded attribute',
  ariaControls: 'Standard HTML5 aria-controls attribute',
  id: 'Standard HTML5 id attribute',
  shouldFitContainer: 'Option to fit button width to its parent width',
};

storiesOf(name, module)
  .add('📖 Button readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={ButtonOverviewExampleRaw}>
          {ButtonOverviewExample}
        </Code>
        <Props component={Button} descriptions={buttonPropDescriptions} />
      </Readme>
    </div>
  ));
