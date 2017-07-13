// @flow
import { expect } from 'chai';
import getDroppableOver from '../../../src/state/get-droppable-over';
import getDimension from '../../utils/get-dimension-util';
import type { Dimension, DimensionMap, DroppableId, Position } from '../../../src/types';

const droppable1: Dimension = getDimension({
  top: 0,
  left: 0,
  bottom: 100,
  right: 100,
});

const droppable2: Dimension = getDimension({
  top: 101,
  left: 0,
  bottom: 200,
  right: 100,
});

const droppableMap: DimensionMap = {
  [droppable1.id]: droppable1,
  [droppable2.id]: droppable2,
};

// Most functionality is tested by get getInsideDimension
describe('get droppable over', () => {
  it('should return null if the target is not over any dimension', () => {
    const target: Position = {
      x: 1000,
      y: 1000,
    };

    const result: ?DroppableId = getDroppableOver(target, droppableMap);

    expect(result).to.equal(null);
  });

  it('should return the droppable dimension that the target is over', () => {
    const target: Position = {
      x: 10,
      y: 10,
    };

    const result: ?DroppableId = getDroppableOver(target, droppableMap);

    expect(result).to.equal(droppable1.id);
  });
});
