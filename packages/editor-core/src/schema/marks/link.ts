import { MarkSpec } from '../../prosemirror';
import { LINK, COLOR } from '../groups';
import { isSafeUrl } from '../../renderer/validator';

/**
 * @name link_mark
 * @additionalProperties false
 */
export interface Definition {
  type: 'link';
  /**
   * @additionalProperties false
   */
  attrs: {
    href: string;
    title?: string;
  };
}

export const link: MarkSpec = {
  excludes: COLOR,
  group: LINK,
  attrs: {
    href: {}
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'a[href]', getAttrs: (dom: Element) => {
        const href = dom.getAttribute('href') || '';

        return isSafeUrl(href)
          ? { href }
          : false;
      }
    }
  ],
  toDOM(node): [string, any] { return ['a', node.attrs]; }
};
