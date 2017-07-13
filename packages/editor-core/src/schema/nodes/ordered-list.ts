import { NodeSpec } from '../../prosemirror';
import { Definition as ListItemNode } from './list-item';

/**
 * @name orderedList_node
 * @additionalProperties false
 */
export interface Definition {
  type: 'orderedList';
  /**
   * @minItems 1
   */
  content: Array<ListItemNode>;
  /**
   * @additionalProperties false
   */
  attrs?: {
    /**
     * @minimum 1
     */
    order: number;
  };
}

export const orderedList: NodeSpec = {
  group: 'block',
  content: 'listItem+',
  parseDOM: [{ tag: 'ol' }],
  toDOM() {
    return ['ol', 0];
  }
};
