import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { EmojiId } from '@atlaskit/emoji';

import { ReactionPicker, Reactions, ResourcedReactions, ResourcedReactionPicker } from '../src';
import Reaction from '../src/internal/reaction';
import Selector, { defaultReactionsByShortName } from '../src/internal/selector';
import Trigger from '../src/internal/trigger';
import { reactionsProvider, reactionsProviderPromise } from '../src/mock-reactions-provider';
import { analyticsService } from '../src/analytics';

import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { getEmojiResource } = emojiTestData.emojiStoryData;

import { name } from '../package.json';

const demoAri = 'ari:cloud:owner:demo-cloud-id:item/1';
const demoAri2 = 'ari:cloud:owner:demo-cloud-id:item/2';
const containerAri = 'ari:cloud:owner:demo-cloud-id:container/1';

analyticsService.handler = (name, properties) => {
  action('analytic event')(name, properties);
};

storiesOf(name, module)
  .add('Picker and Reactions', () => (
    <div>
      <div style={{display: 'flex'}}>
        <p>Lorem ipsum dolor sit amet...</p>
        <ReactionPicker
          emojiProvider={getEmojiResource()}
          // tslint:disable-next-line:jsx-no-lambda
          onSelection={(emojiId) => reactionsProvider.toggleReaction(containerAri, demoAri, emojiId)}
        />
      </div>
      <hr />
      <Reactions
        containerAri={containerAri}
        ari={demoAri}
        emojiProvider={getEmojiResource()}
        reactionsProvider={reactionsProvider}
        // tslint:disable-next-line:jsx-no-lambda
        onReactionClick={(emojiId) => reactionsProvider.toggleReaction(containerAri, demoAri, emojiId)}
      />
    </div>
  ))
  .add('Picker', () => (
    <ReactionPicker
      emojiProvider={getEmojiResource()}
      onSelection={action('reaction selected')}
    />
  ))
  .add('Picker with all emojis enabled', () => (
    <ReactionPicker
      emojiProvider={getEmojiResource()}
      onSelection={action('reaction selected')}
      allowAllEmojis={true}
    />
  ))
  .add('Reactions', () => (
    <div>
      <p>This is a message with some reactions</p>
      <Reactions
        containerAri={containerAri}
        ari={demoAri}
        emojiProvider={getEmojiResource()}
        reactionsProvider={reactionsProvider}
        onReactionClick={action('reaction clicked')}
      />
    </div>
  ))
  .add('Empty Reactions', () => (
      <div>
          <p>This is a message with some reactions</p>
          <Reactions
              containerAri={containerAri}
              ari={demoAri2}
              emojiProvider={getEmojiResource()}
              reactionsProvider={reactionsProvider}
              onReactionClick={action('reaction clicked')}
              allowAllEmojis={true}
          />
      </div>
  ))
  .add('Reactions with all emojis enabled', () => (
    <div>
      <p>This is a message with some reactions</p>
      <Reactions
        containerAri={containerAri}
        ari={demoAri}
        emojiProvider={getEmojiResource()}
        reactionsProvider={reactionsProvider}
        onReactionClick={action('reaction clicked')}
        allowAllEmojis={true}
      />
    </div>
  ))
;

storiesOf(`${name}/Resourced Components`, module)
  .add('Resourced Picker and Reactions', () => (
    <div>
      <div style={{display: 'flex'}}>
        <p>Lorem ipsum dolor sit amet...</p>
        <ResourcedReactionPicker
          containerAri={containerAri}
          ari={demoAri}
          emojiProvider={getEmojiResource()}
          reactionsProvider={reactionsProviderPromise}
        />
      </div>
      <hr />
      <ResourcedReactions
        containerAri={containerAri}
        ari={demoAri}
        emojiProvider={getEmojiResource()}
        reactionsProvider={reactionsProviderPromise}
      />
    </div>
  ))
  .add('Resourced Reaction Picker', () => (
    <ResourcedReactionPicker
      containerAri={containerAri}
      ari={demoAri}
      emojiProvider={getEmojiResource()}
      reactionsProvider={reactionsProviderPromise}
    />
  ))
  .add('Resourced Reactions', () => (
    <div>
      <p>This is a message with some reactions</p>
      <ResourcedReactions
        containerAri={containerAri}
        ari={demoAri}
        emojiProvider={getEmojiResource()}
        reactionsProvider={reactionsProviderPromise}
        allowAllEmojis={true}
      />
    </div>
  ))
;

storiesOf(`${name}/Internal Components`, module)
  .add('Reaction', () => (
    <Reaction
      reaction={{ emojiId: (defaultReactionsByShortName.get(':grinning:') as EmojiId).id!, count: 1, reacted: false, ari: demoAri, containerAri: containerAri }}
      emojiProvider={getEmojiResource()}
      onClick={action('reaction clicked')}
    />
  ))
  .add('Reaction - reacted', () => (
    <Reaction
      reaction={{ emojiId: (defaultReactionsByShortName.get(':grinning:') as EmojiId).id!, count: 1, reacted: true, ari: demoAri, containerAri: containerAri }}
      emojiProvider={getEmojiResource()}
      onClick={action('reaction clicked')}
    />
  ))
  .add('Selector', () => (
    <Selector
      emojiProvider={getEmojiResource()}
      onSelection={action('reaction selected')}
    />
  ))
  .add('Trigger', () => (
    <Trigger
      onClick={action('trigger clicked')}
    />
  ))
;
