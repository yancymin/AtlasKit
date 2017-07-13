import { Node, NodeSpec } from '../../prosemirror';

/**
 * @name emoji_node
 * @additionalProperties false
 */
export interface Definition {
  type: 'emoji';
  /**
   * @additionalProperties false
   */
  attrs: {
    id?: string; // Optional to support legacy formats
    shortName: string;
    fallback?: string;
  };
}

export const emoji: NodeSpec = {
  inline: true,
  group: 'inline',
  attrs: {
    shortName: { default: '' },
    id: { default: '' },
    text: { default: '' },
  },
  parseDOM: [{
    tag: 'span[data-emoji-short-name]',
    getAttrs: (dom: Element) => ({
      shortName: dom.getAttribute('data-emoji-short-name')!,
      id: dom.getAttribute('data-emoji-id')!,
      text: dom.getAttribute('data-emoji-text')!,
    })
  }],
  toDOM(node: Node): [string, any, string] {
    const { shortName, id, text } = node.attrs;
    const attrs = {
      'data-emoji-short-name': shortName,
      'data-emoji-id': id,
      'data-emoji-text': text,
      'contenteditable': 'false',
    };
    return ['span', attrs, text];
  }
};
