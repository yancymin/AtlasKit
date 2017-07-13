import { NodeSpec } from '../../prosemirror';
import { Definition as Media } from './media';

/**
 * @name mediaGroup_node
 * @additionalProperties false
 */
export interface Definition {
  type: 'mediaGroup';
  /**
   * @minItems 1
   */
  content: Array<Media>;
}

export const mediaGroup: NodeSpec = {
  inline: false,
  group: 'block',
  content: 'media+',
  attrs: {},
  parseDOM: [{
    tag: 'p[data-node-type="mediaGroup"]',
    getAttrs: (dom: Element) => ({})
  }],

  toDOM(node: any): [string, any, number] {
    return [
      'div',
      {
        'data-node-type': 'media_group'
      },
      0
    ];
  }
};
