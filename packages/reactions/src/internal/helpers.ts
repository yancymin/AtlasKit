import { EmojiId } from '@atlaskit/emoji';
import { ReactionSummary } from '../reactions-resource';

export const isLeftClick = event => (
  event.button === 0
    && !event.altKey
    && !event.ctrlKey
    && !event.metaKey
    && !event.shiftKey
);

export const findIndex = (array: any[], predicate: (item: any) => boolean): number => {
  let index = -1;
  array.some((item, i) => {
    if (predicate(item)) {
      index = i;
      return true;
    }
    return false;
  });

  return index;
};

export const unique = (array: any[], predicate: (item: any) => string) => {
  const seen = {};
  return array.filter(item => seen[predicate(item)] ? false : (seen[predicate(item)] = true));
};

export const equalEmojiId = (l: EmojiId | string, r: EmojiId | string): boolean => {
  if (isEmojiId(l) && isEmojiId(r)) {
    return (l === r) || (l && r && l.id === r.id && l.shortName === r.shortName);
  } else {
    return l === r;
  }
};

const isEmojiId = (emojiId: EmojiId | string): emojiId is EmojiId => {
  return (emojiId as EmojiId).id !== undefined;
};

export const compareEmojiId = (l: string, r: string): number => {
  return l.localeCompare(r);
};

export const sortReactions = (a: ReactionSummary, b: ReactionSummary) => {
  if (a.count > b.count) {
    return -1;
  } else if (a.count < b.count) {
    return 1;
  } else {
    return compareEmojiId(a.emojiId, b.emojiId);
  }
};
