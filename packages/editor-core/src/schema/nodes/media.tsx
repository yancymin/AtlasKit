import { NodeSpec, Node as PMNode } from '../../prosemirror';

export type MediaType = 'file' | 'link';
export type DisplayType = 'file' | 'thumbnail';

/**
 * @name media_node
 * @additionalProperties false
 */
export interface Definition {
  type: 'media';
  /**
   * @minItems 1
   * @additionalProperties false
   */
  attrs: Attributes;
}

export interface Attributes {
  /**
   * @minLength 1
   */
  id: string;
  type: MediaType;
  collection: string;
  // For both CQ and JIRA
  __fileName?: string | null;
  // For CQ
  __fileSize?: number | null;
  __fileMimeType?: string | null;
  // For JIRA
  __displayType?: DisplayType | null;
}

const defaultAttrs = {
  id: { default: '' },
  type: { default: '' },
  collection: { default: null },
  __fileName: { default: null },
  __fileSize: { default: null },
  __fileMimeType: { default: null },
  __displayType: { default: null },
};

export const media: NodeSpec = {
  inline: false,
  selectable: true,
  attrs: defaultAttrs,
  parseDOM: [{
    tag: 'div[data-node-type="media"]',
    getAttrs: (dom: HTMLElement) => {
      const { id, type, collection } = dom.dataset;
      const attrs = { id, type, collection } as Attributes;
      Object.keys(dom.dataset).forEach(key => {
        if (defaultAttrs[`__${key}`]) {
          attrs[`__${key}`] = dom.dataset[key];
        }
      });
      // Need to do validation & type conversion manually
      if (attrs.__fileSize) {
        attrs.__fileSize = +attrs.__fileSize;
      }
      return attrs;
    }
  }],
  toDOM(node: PMNode) {
    const attrs = {
      'data-id': node.attrs.id,
      'data-node-type': 'media',
      'data-type': node.attrs.type,
      'data-collection': node.attrs.collection,
      // toDOM is used for static rendering as well as editor rendering. This comes into play for
      // emails, copy/paste, etc, so the title and styling here *is* useful (despite a React-based
      // node view being used for editing).
      'title': 'Attachment',
      // Manually kept in sync with the style of media cards. The goal is to render a plain grey
      // rectangle that provides an affordance for media.
      'style': 'display: inline-block; border-radius: 3px; background: #EBECF0; height: 104px; width: 156px; box-shadow: 0 1px 1px rgba(9, 30, 66, 0.2), 0 0 1px 0 rgba(9, 30, 66, 0.24);'
    };

    copyOptionalAttrs(node.attrs, attrs, key => `data-${camelCaseToKebabCase(key.slice(2))}`);

    return ['div', attrs];
  }
};

const camelCaseToKebabCase = str => str.replace(/([^A-Z]+)([A-Z])/g, (_, x, y) => `${x}-${y.toLowerCase()}`);

export const copyOptionalAttrs = (from: Object, to: Object, map?: (string) => string) => {
  Object.keys(media.attrs).forEach(key => {
    if (key[0] === '_' && key[1] === '_' && from[key]) {
      to[map ? map(key) : key] = from[key];
    }
  });
};

export const toJSON = (node: PMNode) => ({
  attrs: Object.keys(node.attrs)
    .filter(key => !(key[0] === '_' && key[1] === '_'))
    .reduce((obj, key) => {
      obj[key] = node.attrs[key];
      return obj;
    }, {})
});
