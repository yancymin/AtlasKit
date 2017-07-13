import { NodeSpec } from '../../prosemirror';
import { TopLevel } from './doc';

/**
 * @name blockQuote_node
 * @additionalProperties false
 */
export interface Definition {
  type: 'blockQuote';
  content: TopLevel;
}

export const blockquote: NodeSpec = {
  content: 'block+',
  group: 'block',
  defining: true,
  selectable: false,
  parseDOM: [{ tag: 'blockquote' }],
  toDOM() { return ['blockquote', 0]; }
};
