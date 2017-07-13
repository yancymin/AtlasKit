// @flow
import type { Position, Dimension } from '../types';

export default (target: Position, dimension: Dimension): boolean => {
  const { top, right, bottom, left } = dimension.withMargin;

  return target.x >= left &&
    target.x <= right &&
    target.y >= top &&
    target.y <= bottom;
};
