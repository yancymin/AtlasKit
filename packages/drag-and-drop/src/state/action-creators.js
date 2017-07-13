// @flow
import type {
  DraggableId,
  DropResult,
  TypeId,
  Dimension,
  Position,
  Dispatch,
  State,
} from '../types';
import getNewHomeOffset from './get-new-home-offset';
import isPositionEqual from './is-position-equal';

export type RequestDimensionsAction = {|
  type: 'REQUEST_DIMENSIONS',
  payload: TypeId
|}

export const requestDimensions = (type: TypeId): RequestDimensionsAction => ({
  type: 'REQUEST_DIMENSIONS',
  payload: type,
});

export type BeginLiftAction = {|
  type: 'BEGIN_LIFT'
|}

const beginLift = (): BeginLiftAction => ({
  type: 'BEGIN_LIFT',
});

export type CompleteLiftAction = {|
  type: 'COMPLETE_LIFT',
  payload: {|
    id: DraggableId,
    type: TypeId,
    center: Position,
    selection: Position,
  |}
|}

const completeLift = (id: DraggableId,
  type: TypeId,
  center: Position,
  selection: Position): CompleteLiftAction => ({
    type: 'COMPLETE_LIFT',
    payload: {
      id,
      type,
      center,
      selection,
    },
  });

export type PublishDraggableDimensionAction = {|
  type: 'PUBLISH_DRAGGABLE_DIMENSION',
  payload: Dimension
|}

export const publishDraggableDimension =
  (dimension: Dimension): PublishDraggableDimensionAction => ({
    type: 'PUBLISH_DRAGGABLE_DIMENSION',
    payload: dimension,
  });

export type PublishDroppableDimensionAction = {|
  type: 'PUBLISH_DROPPABLE_DIMENSION',
  payload: Dimension
|}

export const publishDroppableDimension =
  (dimension: Dimension): PublishDroppableDimensionAction => ({
    type: 'PUBLISH_DROPPABLE_DIMENSION',
    payload: dimension,
  });

export type MoveAction = {|
  type: 'MOVE',
  payload: {|
    id: DraggableId,
    offset: Position,
    center: Position
  |}
|}

export const move = (id: DraggableId, offset: Position, center: Position): MoveAction => ({
  type: 'MOVE',
  payload: {
    id,
    offset,
    center,
  },
});

export type MoveBackwardAction = {|
  type: 'MOVE_BACKWARD',
  payload: DraggableId
|}

export const moveBackward = (id: DraggableId): MoveBackwardAction => ({
  type: 'MOVE_BACKWARD',
  payload: id,
});

export type MoveForwardAction = {|
  type: 'MOVE_FORWARD',
  payload: DraggableId
|}

export const moveForward = (id: DraggableId): MoveForwardAction => ({
  type: 'MOVE_FORWARD',
  payload: id,
});

export type CancelAction = {
  type: 'CANCEL',
  payload: DraggableId
}

export const cancel = (id: DraggableId): CancelAction => ({
  type: 'CANCEL',
  payload: id,
});

export type DropAnimateAction = {
  type: 'DROP_ANIMATE',
  payload: {|
    newHomeOffset: Position,
    result: DropResult,
  |}
}

const animateDrop = (newHomeOffset: Position, result: DropResult): DropAnimateAction => ({
  type: 'DROP_ANIMATE',
  payload: {
    newHomeOffset,
    result,
  },
});

export type DropCompleteAction = {
  type: 'DROP_COMPLETE',
  payload: DropResult,
}

export const completeDrop = (result: DropResult): DropCompleteAction => ({
  type: 'DROP_COMPLETE',
  payload: result,
});

export const drop = (id: DraggableId) =>
  (dispatch: Dispatch, getState: () => State): void => {
    const state: State = getState();

    // This can occur if the user ends a drag before
    // the collecting phase is finished.
    // This will not trigger a hook as the hook waits
    // for a DRAGGING phase before firing a onDragStart
    if (state.phase === 'COLLECTING_DIMENSIONS') {
      console.error('canceling drag while collecting');
      dispatch(cancel(id));
      return;
    }

    if (state.phase !== 'DRAGGING') {
      console.error('cannot drop if not dragging', state);
      dispatch(cancel(id));
      return;
    }

    if (!state.drag) {
      console.error('invalid drag state', state);
      dispatch(cancel(id));
      return;
    }

    const { impact, initial, current } = state.drag;

    const result: DropResult = {
      draggableId: current.id,
      source: initial.source,
      destination: impact.destination,
    };

    const newHomeOffset: Position = getNewHomeOffset(
      impact.movement, current.offset, state.dimension.draggable
    );

    // Do not animate if you do not need to.
    // This will be the case if either you are dragging with a
    // keyboard or if you manage to nail it just with a mouse.
    const isAnimationRequired = !isPositionEqual(current.offset, newHomeOffset);

    if (isAnimationRequired) {
      dispatch(animateDrop(newHomeOffset, result));
      return;
    }
    dispatch(completeDrop(result));
  };

export const dropAnimationFinished = (id: DraggableId) =>
  (dispatch: Dispatch, getState: () => State): void => {
    const state: State = getState();

    if (state.phase !== 'DROP_ANIMATING') {
      console.error('cannot end drop that is no longer animating', state);
      dispatch(cancel(id));
      return;
    }

    if (!state.drop || !state.drop.pending) {
      console.error('cannot end drop that has no pending state', state);
      dispatch(cancel(id));
      return;
    }

    dispatch(completeDrop(state.drop.pending.result));
  };

export type LiftAction = {|
  type: 'LIFT',
  payload: {|
    id: DraggableId,
    type: TypeId,
    center: Position,
    selection: Position,
  |}
|}

// using redux-thunk
export const lift = (id: DraggableId,
  type: TypeId,
  center: Position,
  selection: Position,
) => (dispatch: Dispatch, getState: Function) => {
  (() => {
    const state: State = getState();
  // quickly finish any current animations
    if (state.phase === 'DROP_ANIMATING') {
      if (!state.drop || !state.drop.pending) {
        console.error('cannot flush drop animation if there is no pending');
        dispatch(cancel('super cool id'));
        return;
      }
      dispatch(completeDrop(state.drop.pending.result));
    }
  })();

  // https://github.com/chenglou/react-motion/issues/437
  // need to allow a flush of react-motion
  setTimeout(() => {
    const state: State = getState();

    if (state.phase !== 'IDLE' || state.phase !== 'DRAG_COMPLETE') {
      // TODO: cancel does not need an id
      dispatch(cancel('some-fake-id'));
    }

    dispatch(beginLift());
    dispatch(requestDimensions(type));

    // Dimensions will be requested synronously
    // after they are done - lift.
    // Could improve this by explicitly waiting until all dimensions are published.
    // Could also allow a lift to occur before all the dimensions are published
    setTimeout(() => {
      const newState: State = getState();

      // drag was already cancelled before dimensions all collected
      if (newState.phase !== 'COLLECTING_DIMENSIONS') {
        return;
      }
      dispatch(completeLift(id, type, center, selection));
    });
  });
};

export type Action = BeginLiftAction |
  CompleteLiftAction |
  RequestDimensionsAction |
  PublishDraggableDimensionAction |
  PublishDroppableDimensionAction |
  MoveAction |
  MoveBackwardAction |
  MoveForwardAction |
  DropAnimateAction |
  DropCompleteAction |
  CancelAction;
