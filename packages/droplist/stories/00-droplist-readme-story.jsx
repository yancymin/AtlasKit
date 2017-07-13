import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code, Props, Description, Chrome } from '@atlaskit/util-readme';

import DropList from '../src';

/* eslint-disable import/first, import/no-duplicates */
import DroplistOverviewExample from './examples/DroplistOverview';
import DroplistOverviewExampleRaw from '!raw!./examples/DroplistOverview';
import DroplistFitExample from './examples/DroplistFit';
import DroplistFitExampleRaw from '!raw!./examples/DroplistFit';
import DroplistOverflowItemsExample from './examples/DroplistOverflowItems';
import DroplistOverflowItemsExampleRaw from '!raw!./examples/DroplistOverflowItems';
import DroplistMultilineItemsExample from './examples/DroplistMultilineItems';
import DroplistMultilineItemsExampleRaw from '!raw!./examples/DroplistMultilineItems';
/* eslint-enable import/first, import/no-duplicates */

import { name } from '../package.json';

const droplistPropDescriptions = {
  appearance: `Controls the appearance of the dropdown. Available types: 'default', 'tall'.
  Default dropdown has scroll after its height exceeds the pre-defined amount. Tall dropdown has no
  restrictions.`,
  position: 'Position of the menu. See the documentation of ak-layer for more details.',
  isLoading: 'Controls whether or not a Spinner will be shown (if isOpen)',
  isOpen: 'Controls the open state of the dropdown',
  onOpenChange: `This is a handler function which is called when the droplist should be open/closed.
  Received an object with isOpen state. Activates when page is clicked outside of the dropdown or
  Esc key is pressed.`,
  children: 'Content of the droplist.',
  trigger: 'Content that will be rendered inside the trigger element.',
  shouldFitContainer: 'Defines whether the dropdown should fill all available space',
  onClick: 'onClick handler that is attached to the first wrapper div inside',
  onKeyDown: 'onKeyDown handler that is attached to the first wrapper div inside',
  shouldFlip: 'Defines whether droplist should flip its position when there is not enough space',
};

const droplistPropTypes = {
  appearance: 'oneOf([default, tall])',
};

storiesOf(name, module)
  .add('Droplist overview', () => (
    <Chrome title={name}>
      <Description>
        <p>This is a `base` component on which such components as @atlaskit/dropdown-menu,
          @atlaskit/single-select, @atlaskit/multi-select are built. It contains only styles and
          very basic logic. It does not have any keyboard interactions, selectable logic or
          open/close functionality</p>
      </Description>
      <Code code={DroplistOverviewExampleRaw}>
        {DroplistOverviewExample}
      </Code>
      <Props
        component={DropList}
        descriptions={droplistPropDescriptions}
        types={droplistPropTypes}
      />
    </Chrome>
  ))
  .add('Droplist that fits container width', () => (
    <Chrome title={name}>
      <Description>
        <p>Droplist that fits container width.</p>
        {DroplistFitExample}
      </Description>
      <Code>
        {DroplistFitExampleRaw}
      </Code>
    </Chrome>
  ))
  .add('Droplist with long items (default behaviour)', () => (
    <Chrome title={name}>
      <Description>
        <p>Droplist with long items (default behaviour).</p>
        {DroplistOverflowItemsExample}
      </Description>
      <Code>
        {DroplistOverflowItemsExampleRaw}
      </Code>
    </Chrome>
  ))
  .add('Droplist with long items with multiline option', () => (
    <Chrome title={name}>
      <Description>
        <p>Droplist with long items with multiline option.</p>
        {DroplistMultilineItemsExample}
      </Description>
      <Code>
        {DroplistMultilineItemsExampleRaw}
      </Code>
    </Chrome>
  ))
  .add('Droplist that is loading', () => (
    <Chrome title={name}>
      <Description>
        <p>Droplist that is loading</p>
        <DropList isLoading isOpen />
      </Description>
    </Chrome>
  ));
