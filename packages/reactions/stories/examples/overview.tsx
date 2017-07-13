import { ReactionPicker, Reactions } from '../../src/';
import * as React from 'react';

import { reactionsProvider } from '../../src/mock-reactions-provider';
import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { getEmojiResource } = emojiTestData.emojiStoryData;

const demoAri = 'ari:cloud:owner:demo-cloud-id:item/1';
const containerAri = 'ari:cloud:owner:demo-cloud-id:container/1';

const handlePickerSelection = (emojiId) => reactionsProvider.toggleReaction(containerAri, demoAri, emojiId);
const handleReactionClick = (emojiId) => reactionsProvider.toggleReaction(containerAri, demoAri, emojiId);

export default (
  <div style={{ position: 'relative' }}>
    <ReactionPicker
      emojiProvider={getEmojiResource()}
      onSelection={handlePickerSelection}
    />
    <Reactions
      containerAri={containerAri}
      ari={demoAri}
      emojiProvider={getEmojiResource()}
      reactionsProvider={reactionsProvider}
      onReactionClick={handleReactionClick}
    />
  </div>
);
