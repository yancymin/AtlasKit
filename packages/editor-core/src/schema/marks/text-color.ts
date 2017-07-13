import { Mark, MarkSpec } from '../../prosemirror';
import {
  akColorN80, akColorB500, akColorB200, akColorG500, akColorG200,
  akColorY500, akColorY100, akColorR500, akColorR100, akColorP500, akColorP200,
} from '@atlaskit/util-shared-styles';
import { COLOR } from '../groups';

export interface Attributes {
  /**
   * @pattern "^#[0-9a-f]{6}$"
   */
  color: string;
}

/**
 * @name textColor_mark
 * @additionalProperties false
 */
export interface Definition {
  type: 'textColor';
  /**
   * @additionalProperties false
   */
  attrs: Attributes;
}

export interface TextColorMark extends Mark {
  attrs: Attributes;
}

const rgbToHex = (value: string): string | undefined => {
  const matches = value.match(/(0?\.?\d{1,3})%?\b/g);
  if (matches && matches.length >= 3) {
    const [red, green, blue] = matches.map(Number);
    // tslint:disable-next-line:no-bitwise
    return '#' + ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1);
  }
};

// @see https://product-fabric.atlassian.net/wiki/spaces/E/pages/55979455/Colour+picker+decisions#Colourpickerdecisions-Visualdesigndecisions
export const colorPalette = new Map<string, string>();
[
  // [akColorN80, default],
  [akColorB500, 'Blue'],
  [akColorG500, 'Green'],
  [akColorY500, 'Orange'],
  [akColorR500, 'Red'],
  [akColorP500, 'Purple'],
  [akColorN80, 'Light grey'],
  [akColorB200, 'Light blue'],
  [akColorG200, 'Light green'],
  [akColorY100, 'Yellow'],
  [akColorR100, 'Pink'],
  [akColorP200, 'Light purple'],
].forEach(([color, label]) => colorPalette.set(color.toLowerCase(), label));

export const textColor: MarkSpec = {
  attrs: { color: { } },
  inclusive: true,
  group: COLOR,
  parseDOM: [
    {
      style: 'color',
      getAttrs: (value: string) => {
        let hexColor;
        if (value.match(/^rgb/i)) {
          hexColor = rgbToHex(value);
        }
        else if (value[0] === '#') {
          hexColor = value.toLowerCase();
        }
        // else handle other colour formats
        return colorPalette.has(hexColor) ? { color: hexColor } : false;
      }
    }
  ],
  toDOM(mark: TextColorMark): [string, object] {
    return ['span', {
      style: `color: ${mark.attrs.color}`
    }];
  }
};
