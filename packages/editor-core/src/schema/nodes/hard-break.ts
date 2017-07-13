import { NodeSpec } from '../../prosemirror';

/**
 * @name hardBreak_node
 * @additionalProperties false
 */
export interface Definition {
  type: 'hardBreak';
  /**
   * @additionalProperties false
   */
  attrs?: {
    text?: '\n';
  };
}

export const hardBreak: NodeSpec = {
  inline: true,
  group: 'inline',
  selectable: false,
  parseDOM: [{ tag: 'br' }],
  toDOM() { return ['br']; }
};
