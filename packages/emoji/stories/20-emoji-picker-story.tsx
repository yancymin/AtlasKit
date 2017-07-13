import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';
import Layer from '@atlaskit/layer';
import EmojiPicker from '../src/components/picker/EmojiPicker';

import { name } from '../package.json';
import { getEmojiResource, lorem } from './story-data';
import TriggeredEmojiResource from './TriggeredEmojiResource';

storiesOf(`${name}/EmojiPicker`, module)
  .add('picker popup', () => (
    <div style={{ padding: '10px' }} >
      <Layer
        content={
          <EmojiPicker
            emojiProvider={getEmojiResource()}
            onSelection={action('emoji selected')}
          />
        }
        position="bottom left"
      >
      <input
        id="picker-input"
        style={{
          height: '20px',
          margin: '10px',
        }}
      />
      </Layer>
      <p style={{ width: '400px' }}>{lorem}</p>
    </div>
  ))
  .add('picker inline', () => (
    <div style={{ padding: '10px' }} >
      <p style={{ width: '400px' }}>{lorem}</p>
      <EmojiPicker
        emojiProvider={getEmojiResource()}
        onSelection={action('emoji selected')}
      />
      <p style={{ width: '400px' }}>{lorem}</p>
    </div>
  ))
  .add('slow loading picker', () => {
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
        <EmojiPicker
          emojiProvider={Promise.resolve(emojiResource)}
          onSelection={action('emoji selected')}
        />
      </div>
    );
  })
  .add('picker popup with upload support', () => (
    <div style={{ padding: '10px' }} >
      <Layer
        content={
          <EmojiPicker
            emojiProvider={getEmojiResource({ uploadSupported: true })}
            onSelection={action('emoji selected')}
          />
        }
        position="bottom left"
      >
      <input
        id="picker-input"
        style={{
          height: '20px',
          margin: '10px',
        }}
      />
      </Layer>
    </div>
  ));

