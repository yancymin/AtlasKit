import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';

import { name } from '../package.json';
import MentionTextInput from './demo-mention-text-input';
import { resourceProvider, resourceProviderWithInfoHints, slowResourceProvider, MockPresenceProvider } from './story-data';

const bottomStyle = {
  position: 'absolute',
  bottom: '30px',
};

const tallPageStyle = {
  height: '2000px',
};

const downPage = {
  position: 'absolute',
  top: '400px',
};

storiesOf(`${name}/MentionPicker`, module)
  .add('Input field mention list. Mock API. Key binding', () => (
    <MentionTextInput
      label="User search"
      onSelection={action('mention selected')}
      resourceProvider={resourceProvider}
    />
  ))
  .add('Input field mention list. Mock slow API. Key binding', () => (
    <MentionTextInput
      label="User search"
      onSelection={action('mention selected')}
      resourceProvider={slowResourceProvider}
    />
  ))
  .add('Input field mention list. Mock API with info-hints. Key binding', () => (
    <MentionTextInput
      label="User search"
      onSelection={action('mention selected')}
      resourceProvider={resourceProviderWithInfoHints}
    />
  ))
  .add('Input field at bottom mention list. Mock API. Key binding', () => (
    <div style={bottomStyle} >
      <MentionTextInput
        label="User search"
        onSelection={action('mention selected')}
        resourceProvider={resourceProvider}
        relativePosition="above"
      />
    </div>
  ))
  .add('Input field at top mention list. Mock API. Mocked presence', () => (
    <MentionTextInput
      label="User search"
      onSelection={action('mention selected')}
      resourceProvider={resourceProvider}
      presenceProvider={new MockPresenceProvider()}
    />
  ))
  .add('Input field at bottom mention list. Mock API. Mocked presence', () => (
    <div style={bottomStyle} >
      <MentionTextInput
        label="User search"
        onSelection={action('mention selected')}
        resourceProvider={resourceProvider}
        presenceProvider={new MockPresenceProvider()}
        relativePosition="above"
      />
    </div>
  ))
  .add('Input field at bottom mention list. Mock API. Mocked presence (slow)', () => (
    <div
      style={bottomStyle}
    >
      <MentionTextInput
        label="User search"
        onSelection={action('mention selected')}
        resourceProvider={resourceProvider}
        presenceProvider={new MockPresenceProvider(200, 500)}
        relativePosition="above"
      />
    </div>
  ))
  .add('Input field at part down tall page. Mock API. Mocked presence', () => (
    <div style={tallPageStyle} >
      <div style={downPage} >
        <MentionTextInput
          label="User search"
          onSelection={action('mention selected')}
          resourceProvider={resourceProvider}
          presenceProvider={new MockPresenceProvider()}
          relativePosition="above"
        />
      </div>
    </div>
  ));
