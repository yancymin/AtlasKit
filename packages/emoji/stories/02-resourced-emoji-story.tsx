import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import { name } from '../package.json';
import ResourcedEmoji from '../src/components/common/ResourcedEmoji';
import { EmojiProvider } from '../src/api/EmojiResource';

import { getEmojiResource, lorem } from './story-data';
import TriggeredEmojiResource from './TriggeredEmojiResource';

interface SampleEmojiProps {
  emojiProvider?: Promise<EmojiProvider>;
}

const lineStyle = {
  lineHeight: '24px',
};

// tslint:disable-next-line:variable-name
const SampleEmojis = (props: SampleEmojiProps) => (
  <span>
    <ResourcedEmoji
      emojiId={{ shortName: ':grimacing:', id: '1f62c' }}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
      showTooltip={true}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':awthanks:', id: 'atlassian-awthanks' }}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
      showTooltip={true}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':shrug:', id: 'atlassian-shrug' }}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
      showTooltip={true}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':disappear:', id: 'atlassian-disappear' }}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
      showTooltip={true}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':badpokerface:', id: 'atlassian-badpokerface' }}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
      showTooltip={true}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':freddie:', id: 'atlassian-freddie' }}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
      showTooltip={true}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':not-an-emoji:', id: 'not-an-emoji' }}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
      showTooltip={true}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':loading:', id: 'loading' }}
      emojiProvider={new Promise(() => {})}
      showTooltip={true}
    />
  </span>
);


storiesOf(`${name}/ResourcedEmoji`, module)
  .add('resourced emoji', () => (
    <p style={lineStyle}>
      <SampleEmojis />
    </p>
  ))
  .add('skin tones', () => (
    <p style={lineStyle}>
      <span>
        <ResourcedEmoji
          emojiId={{ shortName: ':thumbsup:', id: '1f44d' }}
          emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
          showTooltip={true}
        />
        <ResourcedEmoji
          emojiId={{ shortName: ':thumbsup::skin-tone-2:', id: '1f44d-1f3fb' }}
          emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
          showTooltip={true}
        />
        <ResourcedEmoji
          emojiId={{ shortName: ':thumbsup::skin-tone-3:', id: '1f44d-1f3fc' }}
          emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
          showTooltip={true}
        />
        <ResourcedEmoji
          emojiId={{ shortName: ':thumbsup::skin-tone-4:', id: '1f44d-1f3fd' }}
          emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
          showTooltip={true}
        />
        <ResourcedEmoji
          emojiId={{ shortName: ':thumbsup::skin-tone-5:', id: '1f44d-1f3fe' }}
          emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
          showTooltip={true}
        />
        <ResourcedEmoji
          emojiId={{ shortName: ':thumbsup::skin-tone-6:', id: '1f44d-1f3ff' }}
          emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
          showTooltip={true}
        />
        <ResourcedEmoji
          emojiId={{ shortName: ':thumbsup::skin-tone-7:', id: '1f44d-1f3fg', /* invalid - will fallback to text render */ }}
          emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
          showTooltip={true}
        />
      </span>
    </p>
  ))
  .add('Content resourced emoji', () => (
    <div>
      <h1>Heading 1 <SampleEmojis /></h1>
      <h2>Heading 2 <SampleEmojis /></h2>
      <h3>Heading 3 <SampleEmojis /></h3>
      <h4>Heading 4 <SampleEmojis /></h4>
      <h5>Heading 5 <SampleEmojis /></h5>
      <h6>Heading 6 <SampleEmojis /></h6>
      <p style={lineStyle}>Paragraph <SampleEmojis /></p>
      <code style={lineStyle}>Code <SampleEmojis /></code>
      <p style={lineStyle}>{lorem} <SampleEmojis /> {lorem} <SampleEmojis /> {lorem} <SampleEmojis /> {lorem}</p>
    </div>
  ))
  .add('slow loading emoji', () => {
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
      <div style={lineStyle}>
        <SampleEmojis emojiProvider={Promise.resolve(emojiResource)} />
        <div>
          <button onClick={loadStandard} ref={handleStandardRef}>Load Standard Emojis</button>
          <button onClick={loadAtlassian} ref={handleAtlassianRef}>Load Atlassian Emojis</button>
        </div>
      </div>
    );
  });

