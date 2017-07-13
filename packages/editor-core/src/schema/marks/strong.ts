import { MarkSpec, marks } from '../../prosemirror';
import { FONT_STYLE } from '../groups';

/**
 * @name strong_mark
 * @additionalProperties false
 */
export interface Definition {
  type: 'strong';
}

export const strong: MarkSpec = {
  ...marks.strong,
  inclusive: true,
  group: FONT_STYLE,
};
