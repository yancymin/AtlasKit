import { NodeSpec } from '../../prosemirror';
import { TopLevel } from './doc';

/**
 * @name listItem_node
 * @additionalProperties false
 */
export interface Definition {
  type: 'listItem';
  content: TopLevel;
}

export const listItem: NodeSpec = {
  content: 'block+',
  parseDOM: [{ tag: 'li' }],
  toDOM() {
    return ['li', 0];
  }
};
