import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Component from '../src';
import { name } from '../package.json';

function handleRemoveAction() {
  console.log('Oh you did not believe me did you !');
  return false;
}

function handleAfterRemoveAction() {
  console.log('My last words!');
}

const imports = [
  ['React', 'react'],
  ['Tag', '@atlaskit/tag'],
];

storiesOf(name, module)
  .addCodeExampleStory('remove-button: simple', () => (
    <Component
      text="Liquorice"
      removeButtonText="Remove me"
    />
  ), { imports })
  .addCodeExampleStory('remove-button: with href', () => (
    <div>
      Our Events are handled ! Check da console
      <hr />
      <Component
        href="http://www.atlassian.com"
        text="Gingerbread"
        removeButtonText="Nibble, nibble, gnaw who is nibbling at my little house?"
        onAfterRemoveAction={handleAfterRemoveAction}
      />
      <Component
        href="http://www.atlassian.com"
        text="Magicbread"
        removeButtonText="Nibble, nibble, gnaw who is nibbling at my little house?"
        onBeforeRemoveAction={handleRemoveAction}
      />
    </div>
  ), { imports, scripts: [handleAfterRemoveAction, handleRemoveAction] })
  .addCodeExampleStory('remove-button: hover unlinked vs. linked', () => (
    <div>
      Hover over our remove buttons
      <hr />
      <Component
        text="Fruitcake"
        removeButtonText="Brush your teeth!"
      />
      <Component
        href="http://www.cupcakeipsum.com"
        text="Chupa chups"
        removeButtonText="Floss your teeth!"
      />
    </div>
  ), { imports });
