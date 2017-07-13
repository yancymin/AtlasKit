// @flow
import { expect } from 'chai';
import getDraggablesInsideDroppable from '../../../src/state/get-draggables-inside-droppable';
import getDimension from '../../utils/get-dimension-util';
import type { Dimension, DimensionMap } from '../../../src/types';

describe('get draggables inside a droppable', () => {
  const droppable: Dimension = getDimension({
    top: 0,
    left: 0,
    right: 100,
    bottom: 100,
  });

  const inside1: Dimension = getDimension({
    top: 20,
    left: 20,
    right: 80,
    bottom: 30,
  });

  const inside2: Dimension = getDimension({
    top: 31,
    left: 30,
    right: 70,
    bottom: 40,
  });

  const inside3: Dimension = getDimension({
    top: 41,
    left: 30,
    right: 70,
    bottom: 50,
  });

  const outside: Dimension = getDimension({
    top: 200,
    left: 200,
    right: 300,
    bottom: 400,
  });

  const getDimensionMap = (dimensions: Dimension[]): DimensionMap =>
    dimensions.reduce((previous: DimensionMap, current: Dimension): DimensionMap => {
      previous[current.id] = current;
      return previous;
    }, {});

  it('should only return dimensions that are inside a droppable', () => {
    const all: Dimension[] = [inside1, inside2, inside3, outside];

    const result: Dimension[] = getDraggablesInsideDroppable(droppable, getDimensionMap(all));

    expect(result).to.deep.equal([inside1, inside2, inside3]);
  });

  it('should order the dimensions in their vertical order', () => {
    const unordered: Dimension[] = [inside2, inside3, inside1];

    const result: Dimension[] = getDraggablesInsideDroppable(droppable, getDimensionMap(unordered));

    expect(result).to.deep.equal([inside1, inside2, inside3]);
  });

  // other edge cases tested in get-inside-dimension
});
