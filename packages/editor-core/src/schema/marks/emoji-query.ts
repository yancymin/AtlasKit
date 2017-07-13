import { akColorB400 } from '@atlaskit/util-shared-styles';
import { MarkSpec } from '../../prosemirror';
import { SEARCH_QUERY } from '../groups';

export const emojiQuery: MarkSpec = {
  inclusive: true,
  group: SEARCH_QUERY,
  parseDOM: [
    { tag: 'span[data-emoji-query]' }
  ],
  toDOM(): [string, any] {
    return ['span', {
      'data-emoji-query': true,
      style: `color: ${akColorB400}`
    }];
  }
};
