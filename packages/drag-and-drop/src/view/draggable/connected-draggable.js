// @flow
import memoizeOne from 'memoize-one';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  dragSelector,
  pendingDropSelector,
  phaseSelector,
} from '../../state/selectors';
import Draggable from './draggable';
import storeKey from '../../state/get-store-key';
import {
  lift as liftAction,
  move as moveAction,
  moveForward as moveForwardAction,
  moveBackward as moveBackwardAction,
  drop as dropAction,
  cancel as cancelAction,
  dropAnimationFinished as dropAnimationFinishedAction,
} from '../../state/action-creators';
import type {
  State,
  Position,
  DraggableId,
  DragState,
  PendingDrop,
  Phase,
  DragMovement,
} from '../../types';
import type {
  MapProps,
  OwnProps,
  DispatchProps,
} from './draggable-types';

const origin = { x: 0, y: 0 };
const defaultMapProps: MapProps = {
  isDropAnimating: false,
  isDragging: false,
  canAnimate: true,
  offset: origin,
  initial: null,
};

export const makeSelector = () => {
  const idSelector = (state: State, ownProps: OwnProps) => ownProps.draggableId;

  const memoizedOffset = memoizeOne(
    (x: number, y: number): Position => ({
      x, y,
    })
  );

  const getWithMovement = memoizeOne(
    (offset: Position): MapProps => ({
      isDropAnimating: false,
      isDragging: false,
      canAnimate: true,
      offset,
      initial: null,
    })
  );

  const getNotDraggingProps = memoizeOne(
    (draggableId: DraggableId, movement: DragMovement): MapProps => {
      const needsToMove = movement.draggables.indexOf(draggableId) !== -1;

      if (!needsToMove) {
        return defaultMapProps;
      }

      const amount = movement.isMovingForward ? -movement.amount : movement.amount;

      return getWithMovement(
        // currently not handling horizontal movement
        memoizedOffset(0, amount),
      );
    }
  );

  return createSelector(
    [
      phaseSelector,
      dragSelector,
      pendingDropSelector,
      idSelector,
    ],
    (phase: Phase,
      drag: ?DragState,
      pending: ?PendingDrop,
      id: DraggableId,
    ): MapProps => {
      if (phase === 'DRAGGING') {
        if (!drag) {
          console.error('invalid dragging state');
          return defaultMapProps;
        }

        const { current, initial, impact } = drag;

        if (current.id !== id) {
          return getNotDraggingProps(
            id,
            impact.movement,
          );
        }

        // this item is dragging
        const offset = current.offset;
        const canAnimate = current.shouldAnimate;

        // not memoizing result as it should not move without an update
        return {
          isDragging: true,
          isDropAnimating: false,
          canAnimate,
          offset,
          initial,
        };
      }

      if (phase === 'DROP_ANIMATING') {
        if (!pending) {
          console.error('cannot animate drop without a pending drop');
          return defaultMapProps;
        }

        if (pending.last.current.id !== id) {
          return getNotDraggingProps(
            id,
            pending.last.impact.movement,
          );
        }

        return {
          // Tell the consumer that the drag is still
          // occurring with props to keep the isDragging appearance
          // while dropping.
          isDragging: true,
          isDropAnimating: true,
          canAnimate: true,
          offset: pending.newHomeOffset,
          initial: pending.last.initial,
        };
      }

      if (phase === 'DROP_COMPLETE') {
        // Cut off all animation as the item is already reordered
        // If it is not everyone is going to have a bad time
        return {
          offset: origin,
          isDropAnimating: false,
          isDragging: false,
          canAnimate: false,
          initial: null,
        };
      }

      // All unhandled phases
      return defaultMapProps;
    }
  );
};

const makeMapStateToProps = () => {
  const selector = makeSelector();
  return (state: State, props: OwnProps) => selector(state, props);
};

const mapDispatchToProps: DispatchProps = {
  lift: liftAction,
  move: moveAction,
  moveBackward: moveBackwardAction,
  moveForward: moveForwardAction,
  drop: dropAction,
  dropAnimationFinished: dropAnimationFinishedAction,
  cancel: cancelAction,
};

// Leaning heavily on the default shallow equality checking
// that `connect` provides.
// It avoids needing to do it own within `Draggable`
export default connect(
  makeMapStateToProps(),
  mapDispatchToProps,
  null,
  { storeKey }
)(Draggable);

