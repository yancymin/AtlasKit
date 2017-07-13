// @flow
import React, { Component } from 'react';
import memoizeOne from 'memoize-one';
import invariant from 'invariant';
import type { Position, ZIndex, InitialDrag, HTMLElement } from '../../types';
import { DraggableDimensionPublisher } from '../dimension-publisher/';
import Moveable from '../moveable/';
import DragHandle from '../drag-handle';
// eslint-disable-next-line no-duplicate-imports
import type {
  Callbacks as DragHandleCallbacks,
  Provided as DragHandleProvided,
} from '../drag-handle/drag-handle-types';
import getCenterPosition from '../get-center-position';
import Placeholder from './placeholder';
import type {
  Props,
  Provided,
  StateSnapshot,
  DefaultProps,
  PlacementStyle,
  DraggableStyle,
  ZIndexOptions,
} from './draggable-types';
import type { Speed, Style as MovementStyle } from '../moveable/moveable-types';

type PlacementInfo = {|
  showPlaceholder: boolean,
  speed: Speed,
  style?: PlacementStyle
|}

type State = {|
  ref: ?HTMLElement,
|}

export const zIndexOptions: ZIndexOptions = {
  dragging: 100,
  dropAnimating: 50,
};

export default class Draggable extends Component {
  /* eslint-disable react/sort-comp */
  props: Props
  state: State
  callbacks: DragHandleCallbacks

  state: State = {
    ref: null,
  }

  static defaultProps: DefaultProps = {
    isDragDisabled: false,
    type: 'DEFAULT',
  }
  /* eslint-enable */

  constructor(props: Props, context: mixed) {
    super(props, context);

    this.callbacks = {
      onLift: this.onLift,
      onMove: this.onMove,
      onDrop: this.onDrop,
      onCancel: this.onCancel,
      onKeyLift: this.onKeyLift,
      onMoveBackward: this.onMoveBackward,
      onMoveForward: this.onMoveForward,
    };
  }

  // This should already be handled gracefully in DragHandle.
  // Just being extra clear here
  throwIfCannotDrag() {
    invariant(this.state.ref,
      'Draggable: cannot drag as no DOM node has been provided'
    );
    invariant(!this.props.isDragDisabled,
      'Draggable: cannot drag as dragging is not enabled'
    );
  }

  onMoveEnd = () => {
    if (!this.props.isDropAnimating) {
      return;
    }

    this.props.dropAnimationFinished(this.props.draggableId);
  }

  onLift = (selection: Position) => {
    this.throwIfCannotDrag();
    const { lift, draggableId, type } = this.props;

    const center: Position = getCenterPosition(this.state.ref);

    lift(draggableId, type, center, selection);
  }

  onKeyLift = () => {
    this.throwIfCannotDrag();
    const { lift, draggableId, type } = this.props;

    const center: Position = getCenterPosition(this.state.ref);

    // using center position as selection
    lift(draggableId, type, center, center);
  }

  onMove = (point: Position) => {
    this.throwIfCannotDrag();

    const { draggableId, initial, move } = this.props;

    // dimensions not provided yet
    if (!initial) {
      return;
    }

    const offset: Position = {
      x: point.x - initial.selection.x,
      y: point.y - initial.selection.y,
    };
    const center: Position = {
      x: initial.center.x + offset.x,
      y: initial.center.y + offset.y,
    };

    move(draggableId, offset, center);
  }

  onMoveForward = () => {
    this.throwIfCannotDrag();
    this.props.moveForward(this.props.draggableId);
  }

  onMoveBackward = () => {
    this.throwIfCannotDrag();
    this.props.moveBackward(this.props.draggableId);
  }

  onDrop = () => {
    this.throwIfCannotDrag();
    this.props.drop(this.props.draggableId);
  }

  onCancel = () => {
    // Not checking if drag is enabled.
    // Cancel is an escape mechanism
    this.props.cancel(this.props.draggableId);
  }

  // React calls ref callback twice for every render
  // https://github.com/facebook/react/pull/8333/files
  setRef = ((ref: ?HTMLElement) => {
    // TODO: need to clear this.state.ref on unmount
    if (ref === null) {
      return;
    }

    if (ref === this.state.ref) {
      return;
    }

    // need to trigger a child render when ref changes
    this.setState({
      ref,
    });
  })

  getPlaceholder() {
    invariant(this.props.initial, 'cannot get a drag placeholder when not dragging');
    const dimension = this.props.initial.dimension;

    return (
      <Placeholder
        height={dimension.withMargin.height}
        width={dimension.withMargin.width}
      />
    );
  }

  getMovingStyle = memoizeOne((initial: ?InitialDrag, zIndex: ZIndex): PlacementStyle => {
    invariant(initial, 'initial dimension required to drag');
    return {
      zIndex,
      position: 'absolute',
      boxSizing: 'border-box',
      // when we use position absolute we need to
      // force the height and width because it looses
      // its standard positioning logic
      width: initial.dimension.withoutMargin.width,
      height: initial.dimension.withoutMargin.height,
      // Not applying any 'left' or 'top' value as we
      // want the element to sit in the place that it started.
      // If we use 'left' or 'top' then it would be relative
      // to any parent that has a position:relative on it.
    };
  });

  getPlacementInfo(): PlacementInfo {
    const { isDragging, canAnimate, initial, isDropAnimating } = this.props;

    if (isDropAnimating) {
      return {
        showPlaceholder: true,
        speed: 'STANDARD',
        style: this.getMovingStyle(initial, zIndexOptions.dropAnimating),
      };
    }

    if (isDragging) {
      return {
        showPlaceholder: true,
        speed: canAnimate ? 'FAST' : 'INSTANT',
        style: this.getMovingStyle(initial, zIndexOptions.dragging),
      };
    }

    if (!canAnimate) {
      return {
        showPlaceholder: false,
        speed: 'INSTANT',
      };
    }

    // Default: can move quickly.
    // Can move out of the way when other draggables are dragging
    return {
      showPlaceholder: false,
      speed: 'FAST',
    };
  }

  getProvided = memoizeOne(
    (showPlaceholder: boolean,
      dragHandleProps: ?DragHandleProvided,
      movementStyle: ?MovementStyle,
      placementStyle: ?PlacementStyle,
    ): Provided => {
      const draggableStyle: ?DraggableStyle = (() => {
        if (!placementStyle && !movementStyle) {
          return null;
        }

        // $ExpectError - using spread
        const style: DraggableStyle = {
          ...placementStyle,
          ...movementStyle,
        };

        return style;
      })();

      const provided: Provided = {
        innerRef: this.setRef,
        placeholder: showPlaceholder ? this.getPlaceholder() : null,
        dragHandleProps,
        draggableStyle,
      };
      return provided;
    }
  )

  getSnapshot = memoizeOne((isDragging: boolean): StateSnapshot => ({
    isDragging,
  }))

  render() {
    const info: PlacementInfo = this.getPlacementInfo();

    return (
      <DraggableDimensionPublisher
        itemId={this.props.draggableId}
        type={this.props.type}
        targetRef={this.state.ref}
      >
        <Moveable
          speed={info.speed}
          destination={this.props.offset}
          onMoveEnd={this.onMoveEnd}
        >
          {(movementStyle: ?MovementStyle) => (
            <DragHandle
              isEnabled={!this.props.isDragDisabled}
              callbacks={this.callbacks}
            >
              {(dragHandleProps: ?DragHandleProvided) =>
                this.props.children(
                  this.getProvided(
                    info.showPlaceholder,
                    dragHandleProps,
                    movementStyle,
                    info.style,
                  ),
                  this.getSnapshot(this.props.isDragging)
                )
              }
            </DragHandle>
        )}
        </Moveable>
      </DraggableDimensionPublisher>
    );
  }
}
