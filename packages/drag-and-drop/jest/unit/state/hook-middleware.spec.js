// @flow
import { expect } from 'chai';
import sinon from 'sinon';
import middleware from '../../../src/state/hook-middleware';
import { cancel } from '../../../src/state/action-creators';
import getDimension from '../../utils/get-dimension-util';
import noImpact from '../../../src/state/no-impact';
import type {
  Dimension,
  DraggableId,
  DroppableId,
  DropResult,
  TypeId,
  DragState,
  Hooks,
  State,
  DimensionState,
  DraggableLocation,
} from '../../../src/types';

const execute = (hooks: Hooks, current: State, previous: State) => {
  const stateStub = sinon.stub();
  stateStub.onFirstCall().returns(previous);
  stateStub.onSecondCall().returns(current);
  const store = {
    getState: stateStub,
  };
  const next = x => x;
  // does not matter what this is - but using cancel to get correct typing
  const action = cancel('some-fake-id');

  middleware(hooks)(store)(next)(action);
};

const draggableId: DraggableId = 'drag-1';
const droppableId: DroppableId = 'drop-1';
const typeId: TypeId = 'TYPE';

const noDimensions: DimensionState = {
  request: null,
  draggable: {},
  droppable: {},
};

const state = (() => {
  const idle: State = {
    phase: 'IDLE',
    drag: null,
    drop: null,
    dimension: noDimensions,
  };

  const collecting: State = {
    phase: 'COLLECTING_DIMENSIONS',
    drag: null,
    drop: null,
    dimension: {
      request: typeId,
      draggable: {},
      droppable: {},
    },
  };

  const source: DraggableLocation = {
    droppableId,
    index: 0,
  };

  const draggableDimension: Dimension = getDimension({ id: draggableId });
  const droppableDimension: Dimension = getDimension({ id: droppableId });

  const drag: DragState = {
    initial: {
      source,
      center: { x: 50, y: 50 },
      selection: { x: 10, y: 10 },
      dimension: draggableDimension,
    },
    current: {
      id: draggableId,
      type: typeId,
      offset: { x: 20, y: 20 },
      center: { x: 70, y: 70 },
      shouldAnimate: true,
    },
    impact: noImpact,
  };

  const dragging: State = {
    phase: 'DRAGGING',
    drag,
    drop: null,
    dimension: {
      request: 'TYPE',
      draggable: {
        [draggableId]: draggableDimension,
      },
      droppable: {
        [droppableId]: droppableDimension,
      },
    },
  };

  const result: DropResult = {
    draggableId,
    source,
    destination: null,
  };

  const dropAnimating: State = {
    phase: 'DROP_ANIMATING',
    drag: null,
    drop: {
      pending: {
        newHomeOffset: { x: 100, y: 100 },
        last: drag,
        result,
      },
      result: null,
    },
    dimension: noDimensions,
  };

  const complete: State = {
    phase: 'DROP_COMPLETE',
    drag: null,
    drop: {
      pending: null,
      result,
    },
    dimension: noDimensions,
  };

  return { idle, collecting, dragging, dropAnimating, complete };
})();

describe('Hook middleware', () => {
  let hooks: Hooks;

  beforeEach(() => {
    hooks = {
      onDragStart: sinon.stub(),
      onDragEnd: sinon.stub(),
    };
    sinon.stub(console, 'error');
  });

  afterEach(() => {
    console.error.restore();
  });

  describe('drag start', () => {
    it('should call the onDragStart hook when a drag starts', () => {
      execute(hooks, state.dragging, state.collecting);

      // $ExpectError - onDragStart is nullable
      expect(hooks.onDragStart.calledWith(draggableId, {
        droppableId,
        index: 0,
      })).to.equal(true);
    });

    it('should do nothing if no onDragStart is not provided', () => {
      const customHooks: Hooks = {
        onDragEnd: sinon.stub(),
      };

      execute(customHooks, state.dragging, state.collecting);

      expect(console.error.called).to.equal(false);
    });

    it('should log an error and not call the callback if there is no current drag', () => {
      const invalid: State = {
        ...state.dragging,
        drag: null,
      };

      execute(hooks, invalid, state.collecting);

      expect(console.error.called).to.equal(true);
    });

    it('should not call if only collecting dimensions (not dragging yet)', () => {
      execute(hooks, state.idle, state.collecting);

      // $ExpectError - type of hook
      expect(hooks.onDragStart.called).to.equal(false);
    });
  });

  describe('drag end', () => {
    // it is possible to complete a drag from a DROP_ANIMATING phase or a DRAGGING_PHASE
    const preEndStates: State[] = [state.dragging, state.dropAnimating];

    preEndStates.forEach((previous: State): void => {
      it('should call onDragEnd with the drop result', () => {
        execute(hooks, state.complete, previous);

        if (!state.complete.drop || !state.complete.drop.result) {
          expect.fail('invalid state');
          return;
        }

        const result: DropResult = state.complete.drop.result;

        expect(hooks.onDragEnd.calledWith({
          draggableId,
          source: result.source,
          destination: result.destination,
        })).to.equal(true);
      });

      it('should log an error and not call the callback if there is no drop result', () => {
        const invalid: State = {
          phase: 'DROP_COMPLETE',
          drop: null,
          drag: null,
          dimension: noDimensions,
        };

        execute(hooks, invalid, previous);

        expect(hooks.onDragEnd.called).to.equal(false);
        expect(console.error.called).to.equal(true);
      });

      it('should call onDragEnd with null as the destination if there is no destination', () => {
        const result: DropResult = {
          draggableId,
          source: {
            droppableId,
            index: 0,
          },
          destination: null,
        };
        const custom: State = {
          phase: 'DROP_COMPLETE',
          drop: {
            pending: null,
            result,
          },
          drag: null,
          dimension: noDimensions,
        };

        execute(hooks, custom, previous);

        expect(hooks.onDragEnd.calledWith({
          draggableId,
          source: result.source,
          destination: null,
        })).to.equal(true);
      });

      it('should call onDragEnd with null if the item did not move', () => {
        const location: DraggableLocation = {
          droppableId,
          index: 0,
        };
        const result: DropResult = {
          draggableId,
          source: location,
          destination: location,
        };
        const custom: State = {
          phase: 'DROP_COMPLETE',
          drop: {
            pending: null,
            result,
          },
          drag: null,
          dimension: noDimensions,
        };

        execute(hooks, custom, previous);

        expect(hooks.onDragEnd.calledWith({
          draggableId,
          source: result.source,
          destination: null,
        })).to.equal(true);
      });
    });
  });

  describe('drag cancelled', () => {
    describe('cancelled while dragging', () => {
      it('should return a result with a null destination', () => {
        execute(hooks, state.idle, state.dragging);

        if (!state.dragging.drag) {
          expect.fail();
          return;
        }

        expect(hooks.onDragEnd.calledWith({
          draggableId,
          source: state.dragging.drag.initial.source,
          destination: null,
        })).to.equal(true);
      });

      it('should log an error and do nothing if it cannot find a previous drag to publish', () => {
        const invalid: State = {
          phase: 'DRAGGING',
          drag: null,
          drop: null,
          dimension: noDimensions,
        };

        execute(hooks, state.idle, invalid);

        expect(hooks.onDragEnd.called).to.equal(false);
        expect(console.error.called).to.equal(true);
      });
    });

    // this should never really happen - but just being safe
    describe('cancelled while drop animating', () => {
      it('should return a result with a null destination', () => {
        execute(hooks, state.idle, state.dropAnimating);

        if (!state.dropAnimating.drop || !state.dropAnimating.drop.pending) {
          expect.fail();
          return;
        }

        expect(hooks.onDragEnd.calledWith({
          draggableId,
          source: state.dropAnimating.drop.pending.result.source,
          destination: null,
        })).to.equal(true);
      });

      it('should log an error and do nothing if it cannot find a previous drag to publish', () => {
        const invalid: State = {
          phase: 'DROP_ANIMATING',
          drag: null,
          drop: null,
          dimension: noDimensions,
        };

        execute(hooks, state.idle, invalid);

        expect(hooks.onDragEnd.called).to.equal(false);
        expect(console.error.called).to.equal(true);
      });
    });
  });
});
