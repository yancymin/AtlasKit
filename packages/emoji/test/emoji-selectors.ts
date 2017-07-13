import { ReactWrapper } from 'enzyme';

export function getEmojiTypeAheadItemById(emojiTypeAhead: ReactWrapper<any, any>, itemKey?: string): ReactWrapper<any, any> {
  return emojiTypeAhead.findWhere(n => n.name() === 'EmojiTypeAheadItem' && n.key() === itemKey);
}

export function getSelectedEmojiTypeAheadItem(emojiTypeAhead: ReactWrapper<any, any>): ReactWrapper<any, any> {
  return emojiTypeAhead.findWhere(n => n.name() === 'EmojiTypeAheadItem' && n.prop('selected'));
}

export function isEmojiTypeAheadItemSelected(emojiTypeAhead: ReactWrapper<any, any>, itemKey?: string): boolean {
  const selectedItem = getSelectedEmojiTypeAheadItem(emojiTypeAhead);
  return !!(selectedItem.length && selectedItem.key() === itemKey);
}
