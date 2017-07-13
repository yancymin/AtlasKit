// @flow
import { expect } from 'chai';
import getNewHomeOffset from '../../../src/state/get-new-home-offset';
import noImpact from '../../../src/state/no-impact';
import getDimension from '../../utils/get-dimension-util';
import type { DragMovement, Position, Dimension, DimensionMap } from '../../../src/types';

const origin: Position = {
  x: 0,
  y: 0,
};

const draggable1: Dimension = getDimension({
  id: 'drag-1',
  top: 0,
  left: 0,
  bottom: 100,
  right: 100,
});

// huge height: 199
const draggable2: Dimension = getDimension({
  id: 'drag-2',
  top: 101,
  left: 0,
  bottom: 300,
  right: 100,
});

// height: 299
const draggable3: Dimension = getDimension({
  id: 'drag-3',
  top: 301,
  left: 0,
  bottom: 600,
  right: 100,
});

const dimensions: DimensionMap = [draggable1, draggable2, draggable3]
  .reduce((map: DimensionMap, dimension: Dimension) => {
    map[dimension.id] = dimension;
    return map;
  }, {});

describe('get new home offset', () => {
  it('should return to the start position (origin) if nothing has moved', () => {
    const result: Position = getNewHomeOffset(
      noImpact.movement, { x: 100, y: 200 }, dimensions
    );

    expect(result).to.deep.equal(origin);
  });

  it('should return new position required to move to', () => {
    // Moving down past two items, and a bit too far vertically and to the right
    const finishOffset: Position = {
      x: draggable3.withMargin.right + 20,
      y: draggable3.withMargin.bottom + 50,
    };
    const goal: Position = {
      x: 0,
      y: draggable2.withMargin.height + draggable3.withMargin.height,
    };
    const movement: DragMovement = {
      draggables: [draggable2.id, draggable3.id],
      amount: draggable1.withMargin.height,
      isMovingForward: true,
    };

    const result: Position = getNewHomeOffset(
      movement, finishOffset, dimensions
    );

    expect(result).to.deep.equal(goal);
  });

  it('should return a negative value when the draggable is moving backwards', () => {
    // Moving draggable3 back past draggable2 and draggable1, and a little to the left
    const finishOffset: Position = {
      x: draggable1.withMargin.top - 50,
      y: draggable1.withMargin.left - 20,
    };
    const goal: Position = {
      x: 0,
      y: -1 * (draggable2.withMargin.height + draggable1.withMargin.height),
    };
    const movement: DragMovement = {
      draggables: [draggable2.id, draggable1.id],
      amount: draggable3.withMargin.height,
      isMovingForward: false,
    };

    const result: Position = getNewHomeOffset(
      movement, finishOffset, dimensions
    );

    expect(result).to.deep.equal(goal);
  });
});
