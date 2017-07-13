import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Button from '@atlaskit/button';
import { akColorG300 } from '@atlaskit/util-shared-styles';

import InlineDialog from '../src';
import { name } from '../package.json';

const centeredContainerStyles = {
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
};

const targetStyles = {
  background: akColorG300,
  padding: '10px',
};

const codeExampleOverrrides = { style: '...' };

storiesOf(name, module)
  .addCodeExampleStory('Basic dialog story', () => {
    const dialogContent = <div>This is some inline dialog content!</div>;

    return (
      <div style={centeredContainerStyles}>
        <InlineDialog
          content={dialogContent}
          isOpen
        >
          <div style={targetStyles}>I am the target</div>
        </InlineDialog>
      </div>);
  }, { overrides: codeExampleOverrrides })
  .addCodeExampleStory('Dialog with flipping enabled', () => {
    const dialogContent = <div>This is some inline dialog content!</div>;

    return (
      <div style={centeredContainerStyles}>
        <InlineDialog
          content={dialogContent}
          position="left middle"
          isOpen
          shouldFlip
        >
          <div style={targetStyles}>I am the target</div>
        </InlineDialog>
      </div>);
  }, { overrides: codeExampleOverrrides })
  .addCodeExampleStory('Dialog with custom flipping enabled', () => (
    <div style={centeredContainerStyles}>
      <InlineDialog
        content="I will flip to the top instead of the right!"
        position="left middle"
        isOpen
        shouldFlip={['top']}
      >
        <div style={targetStyles}>I am the target</div>
      </InlineDialog>
    </div>
  ), { overrides: codeExampleOverrrides })
  .addCodeExampleStory('Dialog with trigger that takes full width', () => (
    <div
      style={{
        border: '1px dashed orange',
        margin: '32px auto',
        width: 400,
      }}
    >
      <style>{`
          .inline-dialog-story-button {
            display: block;
            width: 100%;
          }
      `}</style>
      <InlineDialog
        content="The button should fill the dashed orange container"
        isOpen
        position="bottom left"
        shouldFlip
      >
        <Button
          className="inline-dialog-story-button"
          isSelected
        >I take full width</Button>
      </InlineDialog>
    </div>
  ), { overrides: codeExampleOverrrides });
