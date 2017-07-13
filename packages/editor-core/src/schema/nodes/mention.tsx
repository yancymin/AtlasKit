import { NodeSpec } from '../../prosemirror';

/**
 * @name mention_node
 * @additionalProperties false
 */
export interface Definition {
  type: 'mention';
  /**
   * @additionalProperties false
   */
  attrs: {
    id: string;
    text: string;
  };
}

export const mention: NodeSpec = {
  inline: true,
  group: 'inline',
  attrs: {
    id: { default: '' },
    text: { default: '' },
    accessLevel: { default: '' }
  },
  parseDOM: [{
    tag: 'span[mention-id]',
    getAttrs: (dom: Element) => ({
      id: dom.getAttribute('mention-id')!,
      text: dom.textContent!,
      accessLevel: dom.getAttribute('data-access-level')!
    })
  }],
  toDOM(node: any): [string, any, string] {
    const { id, accessLevel, text } = node.attrs;
    const attrs = {
      'mention-id': id,
      'data-access-level': accessLevel,
      'contenteditable': 'false',
    };
    return ['span', attrs, text];
  }
};
