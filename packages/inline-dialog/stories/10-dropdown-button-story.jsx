import { storiesOf } from '@kadira/storybook';
import React from 'react';

import ButtonActivatedDialog from './examples/ButtonActivatedDialog'; // eslint-disable-line import/no-duplicates
import { name } from '../package.json';

/* eslint-disable import/no-duplicates, import/first */
import buttonActivatedDropdownRaw from '!raw!./examples/ButtonActivatedDialog';
/* eslint-enable import/no-duplicates, import/first */

const centeredContainerStyles = {
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
};

const codeExampleOverrrides = { style: '...' };

storiesOf(name, module)
  .addCodeExampleStory('Dialog opened from a button', () => {
    const dialogContent = (<div style={{ maxWidth: '300px' }}>
      <h5>Use the HipChat app</h5>
      <p>Would you rather open links in the HipChat application intead of your browser?</p>
      <p>Don&#39;t have the HipChat app? <a href="https://hipchat.com/">Get it!</a></p>
    </div>);

    return (
      <div style={centeredContainerStyles}>
        <ButtonActivatedDialog content={dialogContent} position="top right" />
      </div>);
  }, { scripts: [buttonActivatedDropdownRaw], overrides: codeExampleOverrrides });
