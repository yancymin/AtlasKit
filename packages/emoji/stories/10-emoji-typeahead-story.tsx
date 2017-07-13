import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';

import { name } from '../package.json';
import EmojiTextInput from './demo-emoji-typeahead-text-input';
import { getEmojiResource } from './story-data';
import TriggeredEmojiResource from './TriggeredEmojiResource';

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

storiesOf(`${name}/EmojiTypeAhead`, module)
  .add('Input field emoji typeahead. Popup', () => (
    <EmojiTextInput
      label="Emoji search"
      onSelection={action('emoji selected')}
      emojiProvider={getEmojiResource()}
      position="below"
      afterContent={true}
    />
  ))
  .add('Input field emoji typeahead. Popup. No blur.', () => (
    <EmojiTextInput
      label="Emoji search"
      onSelection={action('emoji selected')}
      emojiProvider={getEmojiResource()}
      position="below"
      afterContent={true}
      disableBlur={true}
    />
  ))
  .add('Input field emoji typeahead. Inline', () => (
    <EmojiTextInput
      label="Emoji search"
      onSelection={action('emoji selected')}
      emojiProvider={getEmojiResource()}
      beforeContent={true}
      afterContent={true}
    />
  ))
  .add('Input field emoji typeahead, above.', () => (
    <div style={bottomStyle} >
      <EmojiTextInput
        label="Emoji search"
        onSelection={action('emoji selected')}
        emojiProvider={getEmojiResource()}
        position="above"
        beforeContent={true}
      />
    </div>
  ))
  .add('Input field emoji typeahead part way down tall page.', () => (
    <div style={tallPageStyle} >
      <div style={downPage} >
        <EmojiTextInput
          label="Emoji search"
          onSelection={action('emoji selected')}
          emojiProvider={getEmojiResource()}
          position="above"
          beforeContent={true}
          afterContent={true}
        />
      </div>
    </div>
  ))
  .add('slow loading typeahead', () => {
    let loadStandardRef;
    let loadAtlassianRef;
    const emojiResource: TriggeredEmojiResource = new TriggeredEmojiResource();

    const loadStandard = () => {
      emojiResource.triggerStandardLoaded();
      if (loadStandardRef) {
        loadStandardRef.disabled = 'disabled';
      }
    };

    const loadAtlassian = () => {
      emojiResource.triggerAtlassianLoaded();
      if (loadAtlassianRef) {
        loadAtlassianRef.disabled = 'disabled';
      }
    };

    const handleStandardRef = (ref) => { loadStandardRef = ref; };
    const handleAtlassianRef = (ref) => { loadAtlassianRef = ref; };

    return (
      <div style={{ padding: '10px' }} >
        <div style={{ padding: '10px' }}>
          <button onClick={loadStandard} ref={handleStandardRef}>Load Standard Emojis</button>
          <button onClick={loadAtlassian} ref={handleAtlassianRef}>Load Atlassian Emojis</button>
        </div>
        <EmojiTextInput
          label="Emoji search"
          onSelection={action('emoji selected')}
          emojiProvider={Promise.resolve(emojiResource)}
          position="below"
          afterContent={true}
        />
      </div>
    );
  });

