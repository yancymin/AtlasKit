import { NodeSpec, nodes } from '../../prosemirror';

/**
 * @name text_node
 * @additionalProperties false
 */
export interface Definition {
  type: 'text';
  /**
   * @minLength 1
   */
  text: string;
  marks?: object;
}

export const text: NodeSpec = nodes.text;
