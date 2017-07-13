// @flow
import getDimension from '../../src/state/get-dimension';
import type { Dimension } from '../../src/types';

let count = 0;

export default ({
  id = `item-${++count}`,
  top = 0,
  bottom = 100,
  left = 0,
  right = 100,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
  scroll = { x: 0, y: 0 },
}: Object = {}): Dimension => getDimension(
    id,
  {
    top,
    right,
    bottom,
    left,
    width: (right - left),
    height: (bottom - top),
  },
    margin,
    scroll,
  );
