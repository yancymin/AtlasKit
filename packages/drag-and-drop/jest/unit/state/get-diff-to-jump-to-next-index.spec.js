// @flow
import { expect } from 'chai';
import getDiffToJumpToNextIndex from '../../../src/state/get-diff-to-jump-to-next-index';
import getDimension from '../../utils/get-dimension-util';
import type {
  Dimension,
  DimensionMap,
  DraggableLocation,
  Position,
} from '../../../src/types';

const droppable: Dimension = getDimension({
  top: 0,
  left: 0,
  bottom: 1000,
  right: 100,
});

// height: 100
const draggable1: Dimension = getDimension({
  id: 'draggable1',
  top: 0,
  left: 10,
  bottom: 100,
  right: 90,
});

// height: 199
const draggable2: Dimension = getDimension({
  id: 'draggable2',
  top: 101,
  left: 10,
  bottom: 300,
  right: 90,
});

// height: 299
const draggable3: Dimension = getDimension({
  id: 'draggable3',
  top: 301,
  left: 10,
  bottom: 600,
  right: 90,
});

const droppables: DimensionMap = {
  [droppable.id]: droppable,
};

const draggables: DimensionMap = {
  [draggable1.id]: draggable1,
  [draggable2.id]: draggable2,
  [draggable3.id]: draggable3,
};

describe('jump to next index', () => {
  describe('jump forward', () => {
    const getDiffToJumpForward = getDiffToJumpToNextIndex.bind(null, true);

    it('should return null if cannot move forward', () => {
      const location: DraggableLocation = {
        index: 2,
        droppableId: droppable.id,
      };

      const point: ?Position = getDiffToJumpForward(
        draggable3.id,
        location,
        draggables,
        droppables,
      );

      expect(point).to.equal(null);
    });

    describe('is moving toward start position', () => {
      it('should return the height of the dimension in the current index', () => {
        // dragging the second item (draggable2), which has previously
        // been moved backwards and is now in the first position
        const currentIndex = 0;
        const location: DraggableLocation = {
          index: currentIndex,
          droppableId: droppable.id,
        };
        const expected: Position = {
          x: 0,
          y: draggable1.withMargin.height,
        };

        const result: ?Position = getDiffToJumpForward(
          draggable2.id,
          location,
          draggables,
          droppables,
        );

        expect(result).to.deep.equal(expected);
      });
    });

    describe('is moving away from start position', () => {
      describe('dragging first item forward one position', () => {
        it('should return the height of the second dimension', () => {
          // dragging the first item
          const location: DraggableLocation = {
            index: 0,
            droppableId: droppable.id,
          };
          const expected: Position = {
            x: 0,
            y: draggable2.withMargin.height,
          };

          const result: ?Position = getDiffToJumpForward(
          draggable1.id,
          location,
          draggables,
          droppables,
        );

          expect(result).to.deep.equal(expected);
        });
      });

      describe('dragging second item forward one position', () => {
        it('should return the height of the third dimension', () => {
          // dragging the second item
          const location: DraggableLocation = {
            index: 1,
            droppableId: droppable.id,
          };
          const expected: Position = {
            x: 0,
            y: draggable3.withMargin.height,
          };

          const result: ?Position = getDiffToJumpForward(
          draggable2.id,
          location,
          draggables,
          droppables,
        );

          expect(result).to.deep.equal(expected);
        });
      });

      describe('dragging first item forward one position after already moving it forward once', () => {
        it('should return the height of the third dimension', () => {
          // draggable1 is now in position 2 (index 1) after a first drag
          const location: DraggableLocation = {
            index: 1,
            droppableId: droppable.id,
          };
          // next dimension from the current index is draggable3
          const expected: Position = {
            x: 0,
            y: draggable3.withMargin.height,
          };

          const result: ?Position = getDiffToJumpForward(
            draggable1.id,
            location,
            draggables,
            droppables,
          );

          expect(result).to.deep.equal(expected);
        });
      });
    });
  });

  describe('jump backward', () => {
    const getDiffToJumpBackward = getDiffToJumpToNextIndex.bind(null, false);

    it('should return null if cannot move backward', () => {
      const location: DraggableLocation = {
        index: 0,
        droppableId: droppable.id,
      };

      const point: ?Position = getDiffToJumpBackward(
        draggable1.id,
        location,
        draggables,
        droppables,
      );

      expect(point).to.equal(null);
    });

    describe('is moving toward start position', () => {
      it('should return the height of the dimension in the current index', () => {
        // dragged the second item (draggable2) forward once, and is now
        // moving backwards towards the start again
        const location: DraggableLocation = {
          // now in the third position
          index: 2,
          droppableId: droppable.id,
        };
        const expected: Position = {
          x: 0,
          y: -draggable3.withMargin.height,
        };

        const point: ?Position = getDiffToJumpBackward(
            draggable2.id,
            location,
            draggables,
            droppables,
          );

        expect(point).to.deep.equal(expected);
      });
    });

    describe('is moving away from start position', () => {
      describe('dragging the second item back to the first position', () => {
        it('should return the negative of the height of the item in the first position', () => {
          const location: DraggableLocation = {
            index: 1,
            droppableId: droppable.id,
          };
          const expected: Position = {
            x: 0,
            y: -draggable1.withMargin.height,
          };

          const point: ?Position = getDiffToJumpBackward(
            draggable2.id,
            location,
            draggables,
            droppables,
          );

          expect(point).to.deep.equal(expected);
        });
      });

      describe('dragging the third item back to the second position', () => {
        it('should return the negative of the height of the item in the second position', () => {
          const location: DraggableLocation = {
            index: 2,
            droppableId: droppable.id,
          };
          const expected: Position = {
            x: 0,
            y: -draggable2.withMargin.height,
          };

          const point: ?Position = getDiffToJumpBackward(
            draggable3.id,
            location,
            draggables,
            droppables,
          );

          expect(point).to.deep.equal(expected);
        });
      });
    });
  });
});
