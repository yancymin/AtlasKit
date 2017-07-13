// @flow
import { expect } from 'chai';
import type { Dimension, Position } from '../../../src/types';
import isInsideDimension from '../../../src/state/is-inside-dimension';
import getDimension from '../../utils/get-dimension-util';

describe('is inside dimension', () => {
  const dimension: Dimension = getDimension({
    top: 0,
    left: 0,
    right: 100,
    bottom: 100,
  });

  it('should return true when the target is inside the dimension', () => {
    const inside: Array<Position> = [
      { x: 0, y: 0 },
      // allowing items on the edges
      { x: 50, y: 50 },
      { x: 100, y: 100 },
    ];

    inside.forEach((target: Position) => {
      expect(isInsideDimension(target, dimension)).to.equal(true);
    });
  });

  it('should return false when the target is outside the dimension', () => {
    const outside: Array<Position> = [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
      { x: 101, y: 101 },
      { x: 100, y: 101 },
      { x: 101, y: 100 },
    ];

    outside.forEach((target: Position) => {
      expect(isInsideDimension(target, dimension)).to.equal(false);
    });
  });
});
