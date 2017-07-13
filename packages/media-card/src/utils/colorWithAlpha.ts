import * as rgba from 'polished/lib/color/rgba';
import * as parseToRgb from 'polished/lib/color/parseToRgb';

export const colorWithAlpha = (color, alpha) => rgba({...parseToRgb(color), alpha});
