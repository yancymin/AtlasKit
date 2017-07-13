// @flow
import { expect } from 'chai';
import getCurrentLocation from '../../../src/state/get-current-location';
import getDimension from '../../utils/get-dimension-util';
import type { Dimension, DimensionMap, DraggableLocation } from '../../../src/types';

const droppable: Dimension = getDimension({
  top: 0,
  left: 0,
  bottom: 100,
  right: 100,
});

const inside1: Dimension = getDimension({
  top: 10,
  left: 10,
  bottom: 20,
  right: 90,
});

const inside2: Dimension = getDimension({
  top: 21,
  left: 10,
  bottom: 30,
  right: 90,
});

const outside: Dimension = getDimension({
  top: droppable.withMargin.bottom + 1,
  left: 0,
  right: 100,
  bottom: droppable.withMargin.bottom + 10,
});

const droppables: DimensionMap = {
  [droppable.id]: droppable,
};

const draggables: DimensionMap = {
  [inside1.id]: inside1,
  [inside2.id]: inside2,
  [outside.id]: outside,
};

describe('get current location', () => {
  it('return null if the draggable is not inside a droppable', () => {
    const result: ?DraggableLocation = getCurrentLocation(
      outside.id,
      draggables,
      droppables,
    );

    expect(result).to.equal(null);
  });

  it('should return the location of the draggable', () => {
    const expected: DraggableLocation = {
      droppableId: droppable.id,
      index: 1,
    };

    const result: ?DraggableLocation = getCurrentLocation(
      inside2.id,
      draggables,
      droppables,
    );

    expect(result).to.deep.equal(expected);
  });
});
