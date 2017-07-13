import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';

import { customCategory } from '../src/constants';
import { name } from '../package.json';
import { EmojiDescription, EmojiId } from '../src/types';

import { ResourcedEmojiList, ResourcedFilteredEmojiList } from './demo-resourced-emoji-list';
import ResourcedEmojiControl from './demo-resource-control';
import ResourcedEmojiById from './demo-resourced-emoji-by-id';
import EmojiPickerTextInput from './demo-emoji-picker-text-input';
import EmojiTypeAheadTextInput from './demo-emoji-typeahead-text-input';
import { getEmojiResource } from './story-data';

declare var require: {
    <T>(path: string): T;
};

let emojiConfig;
try {
  // tslint:disable-next-line import/no-unresolved, no-var-requires
  emojiConfig = require('../local-config')['default'];
} catch (e) {
  // tslint:disable-next-line import/no-unresolved, no-var-requires
  emojiConfig = require('../local-config-example')['default'];
}

const defaultEmojiProvider = Promise.resolve(getEmojiResource());

storiesOf(`${name}/external-emoji`, module)
  .add('resourced picker', () => {
    const picker = (
      <EmojiPickerTextInput
        onSelection={action('emoji selected')}
        emojiProvider={defaultEmojiProvider}
      />
    );
    return (
      <ResourcedEmojiControl
        emojiConfig={emojiConfig}
        children={picker}
      />
    );
  })
  .add('resourced picker - allow uploads', () => {
    const picker = (
      <EmojiPickerTextInput
        onSelection={action('emoji selected')}
        emojiProvider={defaultEmojiProvider}
      />
    );
    return (
      <ResourcedEmojiControl
        emojiConfig={{
          ...emojiConfig,
          allowUpload: true,
        }}
        children={picker}
      />
    );
  })
  .add('resourced typeahead', () => {
    const typeAhead = (
      <EmojiTypeAheadTextInput
        label="Emoji search"
        onSelection={action('emoji selected')}
        position="below"
        afterContent={true}
        emojiProvider={defaultEmojiProvider}
      />
    );
    return (
      <ResourcedEmojiControl
        emojiConfig={emojiConfig}
        children={typeAhead}
      />
    );
  })
  .add('resource emoji', () => {
    const emojiIds: EmojiId[] = [
      { shortName: ':grimacing:', id: '1f62c' },
      { shortName: ':disappear:', id: 'atlassian-disappear' },
      { shortName: ':not-known:', id: 'bogus-not-known' },
    ];
    const emojiList = (
      <ResourcedEmojiList
        emojiIds={emojiIds}
        emojiProvider={defaultEmojiProvider}
      />
    );
    return (
      <ResourcedEmojiControl
        emojiConfig={emojiConfig}
        children={emojiList}
      />
    );
  })
  .add('resource emoji - all media api', () => {
    const filter = (emoji: EmojiDescription) => (emoji.category === customCategory);
    const emojiList = (
      <ResourcedFilteredEmojiList
        filter={filter}
        emojiProvider={defaultEmojiProvider}
      />
    );
    return (
      <ResourcedEmojiControl
        emojiConfig={emojiConfig}
        children={emojiList}
      />
    );
  })
  .add('resource emoji - by id', () => {
    const emojiById = (
      <ResourcedEmojiById
        emojiProvider={defaultEmojiProvider}
      />
    );
    return (
      <div>

        <ResourcedEmojiControl
          emojiConfig={emojiConfig}
          children={emojiById}
        />
      </div>
    );
  });
