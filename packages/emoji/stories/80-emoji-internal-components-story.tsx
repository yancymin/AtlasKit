import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';

import { name } from '../package.json';
import { getEmojis, getStandardEmojis, getAtlassianEmojis } from './story-data';

import EmojiPreview from '../src/components/common/EmojiPreview';
import EmojiTypeAheadList from '../src/components/typeahead/EmojiTypeAheadList';

import { emojiPickerWidth } from '../src/constants';
import filters from '../src/util/filters';

import RefreshableEmojiList from './demo-refreshable-emoji-list';

const emoji = {
  id: '118608',
  name: 'Zoidberg',
  shortName: ':zoidberg:',
  type: 'ATLASSIAN',
  category: 'ATLASSIAN',
  order: 2147483647,
  skinVariations: [],
  representation: {
    imagePath: 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/zoidberg-1417754444.png',
    height: 24,
    width: 30,
  },
  hasSkinVariations: false,
};

const emojis = getEmojis();

const tongueEmoji = filters.byShortName(emojis, ':stuck_out_tongue_closed_eyes:');
const longTongueEmoji = {
  ...tongueEmoji,
  name: `${tongueEmoji.name} ${tongueEmoji.name} ${tongueEmoji.name}`,
  shortName: `${tongueEmoji.shortName}_${tongueEmoji.shortName}_${tongueEmoji.shortName}`,
};

const toneEmoji = filters.toneEmoji(emojis);

const borderedStyle = {
  margin: '20px',
  border: '1px solid #ddd',
  backgroundColor: 'white',
  width: emojiPickerWidth,
};

storiesOf(`${name}/Internal components`, module)
  .add('emoji preview with description', () => (
    <div style={borderedStyle} >
      <EmojiPreview emoji={emoji} />
    </div>
  ))
  .add('emoji preview without description', () => {
    const newEmoji = { ...emoji, name: undefined };
    return (
      <div style={borderedStyle} >
        <EmojiPreview emoji={newEmoji} />
      </div>
    );
  })
  .add('emoji preview with long name and description', () => (
    <div style={borderedStyle} >
      <EmojiPreview emoji={longTongueEmoji} />
    </div>
  ))
  .add('emoji preview with long name and description with tone selector', () => (
    <div style={borderedStyle} >
      <EmojiPreview emoji={longTongueEmoji} toneEmoji={toneEmoji} />
    </div>
  ))
  .add('emoji preview with placeholder for media api', () => {
    const emoji = {
      ...longTongueEmoji,
      representation: {
        mediaPath: 'http://example.com/sample.png',
        height: 24,
        width: 24,
      }
    };

    return (
      <div style={borderedStyle} >
        <EmojiPreview emoji={emoji} />
      </div>
    );
  })
  .add('emoji typeahead list', () => <RefreshableEmojiList />)
  .add('emoji typeahead list - everything', () => (
    <EmojiTypeAheadList
      emojis={emojis}
      onEmojiSelected={action('onSelection')}
    />
  ))
  .add('fallback emoji rendering', () => {
    const emojis = [
      ...getStandardEmojis(),
      ...getAtlassianEmojis().slice(0, 20),
    ];
    return (
      <div>
        {emojis.map(emoji => {
          return (<span key={emoji.id}>{emoji.fallback} </span>);
        })}
      </div>
    );
  });
