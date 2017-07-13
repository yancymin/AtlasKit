import { NodeSpec, Node as PMNode } from '../../prosemirror';

/**
 * @name applicationCard_node
 * @additionalProperties false
 */
export interface Definition {
  type: 'applicationCard';
  /**
   * @additionalProperties false
   */
  attrs: Attributes;
}

export interface Attributes {
  text: string;
  textUrl?: string;
  link?: {
    /**
     * @pattern "^https:\/\/|^data:image\/"
     */
    url: string;
  };
  background?: {
    /**
     * @pattern "^https:\/\/|^data:image\/"
     */
    url: string;
  };
  collapsible?: boolean;
  preview?: {
    /**
     * @pattern "^https:\/\/|^data:image\/"
     */
    url: string;
  };
  title: {
    text: string;
  };
  description?: {
    text: string;
  };
  details?: Array<Detail>;
}

export interface Detail {
  title?: string;
  text?: string;
  icon?: Icon;
  badge?: {
    value: number;
    max?: number;
    appearance?: 'default' | 'primary' | 'important' | 'added' | 'removed';
  };
  lozenge?: {
    text: string,
    bold?: boolean;
    appearance?: 'default' | 'success' | 'removed' | 'inprogress' | 'new' | 'moved';
  };
  users?: Array<User>;
}

export interface User {
  id?: string;
  icon: Icon;
}

export interface Icon {
  /**
   * @pattern "^https:\/\/|^data:image\/"
   */
  url: string;
  label: string;
}

const defaultAttrs = {
  text: { default: '' },
  textUrl: { default: null },
  link: { default: null },
  background: { default: null },
  collapsible: { default: null },
  preview: { default: null },
  title: { default: { text: '' } },
  description: { default: null },
  details: { default: null },
};

export const applicationCard: NodeSpec = {
  inline: false,
  selectable: true,
  attrs: defaultAttrs,
  parseDOM: [{
    tag: 'div[data-node-type="media"]',
    getAttrs: (dom: HTMLElement) => {
      const attrs: Attributes = { text: '', title: { text: '' } };

      Object.keys(defaultAttrs).forEach(key => {
        attrs[key] = dom.dataset[key];
      });

      return attrs;
    }
  }],
  toDOM(node: PMNode) {
    return ['div', node.attrs];
  }
};
