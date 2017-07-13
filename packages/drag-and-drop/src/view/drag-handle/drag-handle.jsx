// @flow
import { Component } from 'react';
import invariant from 'invariant';
import memoizeOne from 'memoize-one';
import rafScheduler from 'raf-schd';
import getScrollPosition from '../get-scroll-position';
import type { Position } from '../../types';
import type { Props, DragTypes, Provided } from './drag-handle-types';

const noop = (): void => { };
const getFalse: () => boolean = () => false;

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
const primaryButton = 0;

// The amount of pixels that need to move before we consider the movement
// a drag rather than a click.
export const sloppyClickThreshold: number = 5;

type State = {
  draggingWith: ?DragTypes,
  pending: ?Position,
};

export default class DragHandle extends Component {

  /* eslint-disable react/sort-comp */
  props: Props
  state: State

  state: State = {
    draggingWith: null,
    pending: null,
  };

  preventClick: boolean;

  ifDragging = (fn: Function) => {
    if (this.state.draggingWith) {
      fn();
    }
  }

  // scheduled functions
  scheduleMove = rafScheduler((point: Position) => {
    this.ifDragging(() => this.props.callbacks.onMove(point));
  });

  scheduleMoveForward = rafScheduler(() => {
    this.ifDragging(this.props.callbacks.onMoveForward);
  })

  scheduleMoveBackward = rafScheduler(() => {
    this.ifDragging(this.props.callbacks.onMoveBackward);
  });

  /* eslint-enable react/sort-comp */

  componentWillUnmount() {
    if (!this.state.draggingWith) {
      return;
    }
    this.preventClick = false;
    this.unbindWindowEvents();
    this.props.callbacks.onCancel();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isEnabled) {
      return;
    }

    // dragging is *not* enabled

    // if a drag is pending - clear it
    if (this.state.pending) {
      this.stopPendingMouseDrag();
      return;
    }

    // need to cancel a current drag
    if (this.state.draggingWith) {
      this.stopDragging(() => this.props.callbacks.onCancel());
    }
  }

  onWindowResize = () => {
    if (this.state.pending) {
      this.stopPendingMouseDrag();
      return;
    }

    this.stopDragging(() => this.props.callbacks.onCancel());
  }

  onWindowMouseMove = (event: MouseEvent) => {
    const { draggingWith, pending } = this.state;
    if (draggingWith === 'KEYBOARD') {
      return;
    }

    // Mouse dragging

    const { button, clientX, clientY } = event;
    if (button !== primaryButton) {
      return;
    }

    // Ideally would just use event.pageX - but playing it safe
    const scroll: Position = getScrollPosition();
    const point: Position = {
      x: clientX + scroll.x,
      y: clientY + scroll.y,
    };

    if (!pending) {
      this.scheduleMove(point);
      return;
    }

    // not yet dragging
    const shouldStartDrag = Math.abs(pending.x - point.x) >= sloppyClickThreshold ||
                            Math.abs(pending.y - point.y) >= sloppyClickThreshold;

    if (shouldStartDrag) {
      this.startDragging('MOUSE', () => this.props.callbacks.onLift(point));
    }
  };

  onWindowMouseUp = () => {
    // Did not move far enough for it to actually be a drag
    if (this.state.pending) {
      // not blocking the default event - letting it pass through
      this.stopPendingMouseDrag();
      return;
    }

    if (!this.state.draggingWith) {
      console.error('should not be listening to mouse up events when nothing is dragging');
      return;
    }

    if (this.state.draggingWith !== 'MOUSE') {
      return;
    }

    // Allowing any event.button type to drop. Otherwise you
    // might not get a corresponding mouseup with a mousedown.
    // We could do a`cancel` if the button is not the primary.
    this.stopDragging(() => this.props.callbacks.onDrop());
  };

  onWindowMouseDown = () => {
    if (this.state.draggingWith === 'MOUSE') {
      console.error(`Should not be able to trigger a mousedown while a MOUSE drag
                    is occurring. Expecting a mouseup first.`);
    }

    this.stopDragging(() => this.props.callbacks.onCancel());
  }

  onMouseDown = (event: MouseEvent) => {
    if (this.state.draggingWith === 'KEYBOARD') {
      // allowing any type of mouse down to cancel
      this.stopDragging(() => this.props.callbacks.onCancel());
      return;
    }

    const { button, clientX, clientY } = event;

    if (button !== primaryButton) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();

    // Ideally would just use event.pageX - but playing it safe
    const scroll: Position = getScrollPosition();
    const point: Position = {
      x: clientX + scroll.x,
      y: clientY + scroll.y,
    };

    this.startPendingMouseDrag(point);
  };

  // window keyboard events are bound during a keyboard drag
  // or after the user presses the mouse down
  onWindowKeydown = (event: KeyboardEvent): void => {
    const isMouseDragPending: boolean = Boolean(this.state.pending);

    if (isMouseDragPending) {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.stopPendingMouseDrag();
      }
      return;
    }

    if (!this.state.draggingWith) {
      console.error('should not be listening to window mouse up if nothing is dragging');
      this.stopDragging(() => this.props.callbacks.onCancel());
    }

    // Dragging with either a keyboard or mouse

    // Blocking standard submission action
    if (event.key === 'Enter') {
      event.preventDefault();
    }

    // Preventing tabbing or submitting
    if (event.key === 'Tab') {
      event.preventDefault();
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.stopDragging(() => this.props.callbacks.onCancel());
    }

    if (this.state.draggingWith === 'MOUSE') {
      // Want to block scrolling the page with the space bar
      if (event.key === ' ') {
        event.preventDefault();
      }
      return;
    }

    // Only keyboard dragging

    if (event.key === ' ') {
      event.preventDefault();
      this.stopDragging(() => this.props.callbacks.onDrop());
    }

    // keyboard dragging only
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.scheduleMoveForward();
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.scheduleMoveBackward();
    }
  }

  // the on element keydown is only for lifting - otherwise using the window keydown
  onKeyDown = (event: KeyboardEvent): void => {
    if (!this.props.isEnabled || this.state.pending || this.state.draggingWith) {
      return;
    }

    if (event.key === ' ') {
      event.preventDefault();
      // stopping the event from bubbling up to the window event handler
      event.stopPropagation();
      this.startDragging('KEYBOARD', () => this.props.callbacks.onKeyLift());
    }
  }

  onClick = (event: MouseEvent): void => {
    if (!this.preventClick) {
      return;
    }
    this.preventClick = false;
    event.preventDefault();
  }

  startPendingMouseDrag = (point: Position) => {
    if (this.state.draggingWith) {
      console.error('cannot start a pending mouse drag when already dragging');
      return;
    }

    if (this.state.pending) {
      console.error('cannot start a pending mouse drag when there is already a pending position');
      return;
    }

    // need to bind the window events
    this.bindWindowEvents();

    const state: State = {
      draggingWith: null,
      pending: point,
    };

    this.setState(state);
  }

  startDragging = (type: DragTypes, done?: () => void = noop) => {
    if (this.state.draggingWith) {
      console.error('cannot start dragging when already dragging');
      return;
    }

    if (type === 'MOUSE' && !this.state.pending) {
      console.error('cannot start mouse drag when there is not a pending position');
      return;
    }

    // keyboard events already bound for mouse dragging
    if (type === 'KEYBOARD') {
      this.bindWindowEvents();
    }

    const state: State = {
      draggingWith: type,
      pending: null,
    };
    this.setState(state, done);
  }

  stopPendingMouseDrag = (done?: () => void = noop) => {
    invariant(this.state.pending, 'cannot stop pending drag when there is none');

    // we need to allow the click event to get through
    this.preventClick = false;

    this.unbindWindowEvents();
    this.setState({
      draggingWith: null,
      pending: null,
    }, done);
  }

  stopDragging = (done?: () => void = noop) => {
    if (!this.state.draggingWith) {
      console.error('cannot stop dragging when not dragging');
      return;
    }

    this.unbindWindowEvents();

    if (this.state.draggingWith === 'MOUSE') {
    // Need to block any click actions
      this.preventClick = true;
    }

    const state: State = {
      draggingWith: null,
      pending: null,
    };
    this.setState(state, done);
  }

  unbindWindowEvents = () => {
    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('mouseup', this.onWindowMouseUp);
    window.removeEventListener('mousedown', this.onWindowMouseDown);
    window.removeEventListener('keydown', this.onWindowKeydown);
    window.removeEventListener('resize', this.onWindowResize);
  }

  bindWindowEvents = () => {
    window.addEventListener('mousemove', this.onWindowMouseMove);
    window.addEventListener('mouseup', this.onWindowMouseUp);
    window.addEventListener('mousedown', this.onWindowMouseDown);
    window.addEventListener('keydown', this.onWindowKeydown);
    window.addEventListener('resize', this.onWindowResize);
  }

  getProvided = memoizeOne((isEnabled: boolean, isDragging: boolean): ?Provided => {
    if (!isEnabled) {
      return null;
    }

    const provided: Provided = {
      onMouseDown: this.onMouseDown,
      onKeyDown: this.onKeyDown,
      onClick: this.onClick,
      tabIndex: 0,
      'aria-grabbed': isDragging,
      draggable: false,
      onDragStart: getFalse,
      onDrop: getFalse,
    };

    return provided;
  })

  render() {
    const { children, isEnabled } = this.props;
    const { draggingWith } = this.state;
    const isDragging: boolean = Boolean(draggingWith);

    return children(this.getProvided(isEnabled, isDragging));
  }
}
