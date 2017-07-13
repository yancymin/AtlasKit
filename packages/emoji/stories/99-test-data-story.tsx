import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import { name } from '../package.json';
import { EmojiServiceResponse, EmojiServiceDescription } from '../src/types';
import { getAllEmojiData, getAtlassianEmojiData, getStandardEmojiData } from './story-data';

const filterEmojiData = (data: EmojiServiceResponse): EmojiServiceResponse => {
  const { emojis, meta } = data;
  const categoryCount: Map<string, number> = new Map();
  const filteredEmojis: EmojiServiceDescription[] = emojis.filter(emoji => {
    const { category, shortName, type } = emoji;
    const count = categoryCount.get(category) || 0;
    if (shortName === ':thumbsup:' && type === 'STANDARD') {
      // has skin variations need for testing
      return true;
    }
    if (category === 'PEOPLE' && count < 9 || category !== 'PEOPLE' && count < 10) {
      // 1 less to allow for thumbsup in PEOPLE category
      categoryCount.set(category, count + 1);
      return true;
    }
    return false;
  });

  return {
    emojis: filteredEmojis,
    meta,
  };
};

storiesOf(`${name}/Test data generation`, module)
  .add('Story data subset - Standard service data', () => (
    <pre>{JSON.stringify(filterEmojiData(getStandardEmojiData()), null, 2)}</pre>
  ))
  .add('Story data subset - Atlassian service data', () => (
    <pre>{JSON.stringify(filterEmojiData(getAtlassianEmojiData()), null, 2)}</pre>
  ))
  .add('Story data subset - All service data', () => (
    <pre>{JSON.stringify(filterEmojiData(getAllEmojiData()), null, 2)}</pre>
  ));
