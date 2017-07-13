// @flow
import React, { Component } from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
// eslint-disable-next-line no-duplicate-imports
import type { ReactWrapper } from 'enzyme';
import sinon from 'sinon';
import DragHandle, { sloppyClickThreshold } from '../../../src/view/drag-handle/drag-handle';
// eslint-disable-next-line no-duplicate-imports
import type { Callbacks, Provided } from '../../../src/view/drag-handle/drag-handle-types';
import { dispatchWindowMouseEvent, dispatchWindowKeyDownEvent, mouseEvent, withKeyboard } from '../../utils/user-input-util';
import type { Position } from '../../../src/types';

const primaryButton: number = 0;
const auxiliaryButton: number = 1;

const getStubCallbacks = (): Callbacks => ({
  onLift: sinon.stub(),
  onKeyLift: sinon.stub(),
  onMove: sinon.stub(),
  onMoveForward: sinon.stub(),
  onMoveBackward: sinon.stub(),
  onDrop: sinon.stub(),
  onCancel: sinon.stub(),
});

type CallBacksCalledFn = {|
  onLift?: number,
  onKeyLift?: number,
  onMove?: number,
  onMoveForward?: number,
  onMoveBackward?: number,
  onDrop?: number,
  onCancel?: number,
|}

const callbacksCalled = (callbacks: Callbacks) => ({
  onLift = 0,
  onKeyLift = 0,
  onMove = 0,
  onMoveForward = 0,
  onMoveBackward = 0,
  onDrop = 0,
  onCancel = 0,
}: CallBacksCalledFn = {}) => callbacks.onLift.callCount === onLift &&
  callbacks.onKeyLift.callCount === onKeyLift &&
  callbacks.onMove.callCount === onMove &&
  callbacks.onMoveForward.callCount === onMoveForward &&
  callbacks.onMoveBackward.callCount === onMoveBackward &&
  callbacks.onDrop.callCount === onDrop &&
  callbacks.onCancel.callCount === onCancel;

const whereAnyCallbacksCalled = (callbacks: Callbacks) =>
  !callbacksCalled(callbacks)();

class Child extends Component {
  props: {
    dragHandleProps?: Provided,
  }
  render() {
    return (
      <div {...this.props.dragHandleProps}>
        Drag me!
      </div>
    );
  }
}

const originalScroll: Position = {
  x: window.pageXOffset,
  y: window.pageYOffset,
};

const setScroll = (point: Position): void => {
  window.pageXOffset = point.x;
  window.pageYOffset = point.y;
};

const windowMouseUp = dispatchWindowMouseEvent.bind(null, 'mouseup');
const windowMouseMove = dispatchWindowMouseEvent.bind(null, 'mousemove');
const mouseDown = mouseEvent.bind(null, 'mousedown');
const click = mouseEvent.bind(null, 'click');
const pressSpacebar = withKeyboard(' ');
const windowSpacebar = dispatchWindowKeyDownEvent.bind(null, ' ');
const windowEscape = dispatchWindowKeyDownEvent.bind(null, 'Escape');
const windowArrowUp = dispatchWindowKeyDownEvent.bind(null, 'ArrowUp');
const windowArrowDown = dispatchWindowKeyDownEvent.bind(null, 'ArrowDown');
const windowTab = dispatchWindowKeyDownEvent.bind(null, 'Tab');
const windowEnter = dispatchWindowKeyDownEvent.bind(null, 'Enter');

// lame
const { beforeAll, afterAll } = global;

describe('drag handle', () => {
  let callbacks: Callbacks;
  let wrapper: ReactWrapper;

  beforeAll(() => {
    requestAnimationFrame.reset();
  });

  beforeEach(() => {
    callbacks = getStubCallbacks();
    wrapper = mount(
      <DragHandle
        callbacks={callbacks}
        isEnabled
      >
        {(dragHandleProps: Provided) => (
          <Child dragHandleProps={dragHandleProps} />
        )}
      </DragHandle>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  afterAll(() => {
    requestAnimationFrame.reset();
  });

  describe('mouse dragging', () => {
    describe('initiation', () => {
      it('should start a drag if there was sufficient mouse movement in any direction', () => {
        const valid: Position[] = [
          { x: 0, y: sloppyClickThreshold },
          { x: 0, y: -sloppyClickThreshold },
          { x: sloppyClickThreshold, y: 0 },
          { x: -sloppyClickThreshold, y: 0 },
        ];

        valid.forEach((point: Position): void => {
          const customCallbacks = getStubCallbacks();
          const customWrapper = mount(
            <DragHandle
              callbacks={customCallbacks}
              isEnabled
            >
              {(dragHandleProps: Provided) => (
                <Child dragHandleProps={dragHandleProps} />
              )}
            </DragHandle>
          );

          mouseDown(customWrapper, 0, 0);
          windowMouseMove(point.x, point.y);

          expect(customCallbacks.onLift.calledWith(point)).to.equal(true);

          customWrapper.unmount();
        });
      });

      it('should consider any scrolling of the document when publishing the initial position', () => {
        const scroll: Position = {
          x: 100,
          y: 200,
        };
        const initial: Position = {
          x: 50,
          y: 50,
        };
        const movedTo: Position = {
          x: initial.x,
          y: initial.y + sloppyClickThreshold,
        };
        setScroll(scroll);

        mouseDown(wrapper, initial.x, initial.y);
        windowMouseMove(movedTo.x, movedTo.y);

        expect(callbacks.onLift.calledWith({
          x: movedTo.x + scroll.x,
          y: movedTo.y + scroll.y,
        })).to.equal(true);

        // cleanup
        setScroll(originalScroll);
      });

      it('should not start a drag if there was no mouse movement while mouse was pressed', () => {
        mouseDown(wrapper);
        windowMouseUp();

        expect(whereAnyCallbacksCalled(callbacks)).to.equal(false);
      });

      it('should not start a drag if there was too little mouse movement while mouse was pressed', () => {
        mouseDown(wrapper, 0, 0);
        windowMouseMove(0, sloppyClickThreshold - 1);
        windowMouseUp(0, sloppyClickThreshold - 1);

        expect(whereAnyCallbacksCalled(callbacks)).to.equal(false);
      });

      it('should not start a drag if not using the primary mouse button', () => {
        mouseDown(wrapper, 0, 0, auxiliaryButton);
        windowMouseMove(0, sloppyClickThreshold);

        expect(callbacksCalled(callbacks)({
          onLift: 0,
        })).to.equal(true);
      });

      describe('cancelled before moved enough', () => {
        describe('cancelled with escape', () => {
          beforeEach(() => {
            mouseDown(wrapper, 0, 0, auxiliaryButton);
            // not moved enough yet
            windowMouseMove(0, sloppyClickThreshold - 1);
            windowEscape();

            // should normally start a drag
            windowMouseMove(0, sloppyClickThreshold);

            // should normally end a drag
            windowMouseUp();
          });

          it('should not call execute any callbacks', () => {
            expect(callbacksCalled(callbacks)({
              onLift: 0,
              onCancel: 0,
              onDrop: 0,
            })).to.equal(true);
          });

          it('should not prevent subsequent click actions if a pending drag is cancelled', () => {
            const stub = sinon.stub();

            click(wrapper, 0, 0, primaryButton, { preventDefault: stub });

            expect(stub.called).to.equal(false);
          });
        });

        describe('cancelled with a window resize', () => {
          beforeEach(() => {
            mouseDown(wrapper, 0, 0);
            // not moved enough yet
            windowMouseMove(0, sloppyClickThreshold - 1);

            // trigger resize
            window.dispatchEvent(new Event('resize'));

            // should normally start a drag
            windowMouseMove(0, sloppyClickThreshold);

            // should normally end a drag
            windowMouseUp();
          });

          it('should not call execute any callbacks', () => {
            expect(callbacksCalled(callbacks)({
              onLift: 0,
              onCancel: 0,
              onDrop: 0,
            })).to.equal(true);
          });

          it('should not prevent subsequent click actions if a pending drag is cancelled', () => {
            const stub = sinon.stub();

            click(wrapper, 0, 0, primaryButton, { preventDefault: stub });

            expect(stub.called).to.equal(false);
          });
        });
      });
    });

    describe('progress', () => {
      it('should fire the onMove callback when there is drag movement', () => {
        const expected: Position = {
          x: 0,
          y: sloppyClickThreshold + 1,
        };

        mouseDown(wrapper);
        // will start the drag
        windowMouseMove(0, sloppyClickThreshold);
        // will fire the first move
        windowMouseMove(expected.x, expected.y);
        requestAnimationFrame.step();

        expect(callbacks.onMove.calledWith(expected)).to.equal(true);
      });

      it('should prevent keyboard submission', () => {
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);

        const event: KeyboardEvent = windowEnter();

        expect(event.defaultPrevented).to.equal(true);
      });

      it('should prevent tabbing', () => {
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);

        const event: KeyboardEvent = windowTab();

        expect(event.defaultPrevented).to.equal(true);
      });

      it('should not drop on spacebar', () => {
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);

        windowSpacebar(wrapper);

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onDrop: 0,
        })).to.equal(true);
      });

      it('should prevent scrolling on spacebar', () => {
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);

        const event: KeyboardEvent = windowSpacebar();

        expect(event.defaultPrevented).to.equal(true);
      });

      it('should not attempt to move forward or backward with arrow keys', () => {
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);

        windowArrowDown();
        windowArrowUp();

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMoveForward: 0,
          onMoveBackward: 0,
        })).to.equal(true);
      });

      it('should collapse multiple mouse movements into a single animation frame', () => {
        // lift
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);

        // movements - all in a single frame
        windowMouseMove(0, sloppyClickThreshold + 1);
        windowMouseMove(0, sloppyClickThreshold + 2);
        windowMouseMove(0, sloppyClickThreshold + 3);
        windowMouseMove(0, sloppyClickThreshold + 4);

        // release the frame
        requestAnimationFrame.step();

        // should only be calling onMove with the last value
        expect(callbacks.onMove.calledWith({ x: 0, y: sloppyClickThreshold + 4 })).to.equal(true);
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 1,
        })).to.equal(true);
      });

      it('should not fire a move if no longer dragging when the scheduled animation frame is fired', () => {
        // lift
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);

        // One movement
        windowMouseMove(0, sloppyClickThreshold + 1);

        // No frame released

        // end drag
        windowMouseUp();

        // release the frame that would otherwise have created a move
        requestAnimationFrame.step();

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          // no movements should be recorded
          onMove: 0,
          onDrop: 1,
        })).to.equal(true);
      });
    });

    describe('finish', () => {
      it('should fire an onDrop when the drag finishes', () => {
        // lift
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        // drop
        windowMouseUp();

        expect(callbacks.onDrop.called).to.equal(true);
      });

      it('should stop listening to window mouse events after a drop', () => {
        // lift
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        // move
        windowMouseMove(0, sloppyClickThreshold);
        requestAnimationFrame.step();

        // drop
        windowMouseUp();

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 1,
          onDrop: 1,
        })).to.equal(true);

        // this should have no impact
        windowMouseMove(0, sloppyClickThreshold);
        windowMouseMove(0, sloppyClickThreshold + 1);
        windowMouseUp();
        windowMouseUp();
        windowMouseMove(0, sloppyClickThreshold + 2);
        requestAnimationFrame.flush();

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 1,
          onDrop: 1,
        })).to.equal(true);
      });

      it('should fire an onDrop even when not dropping with the primary mouse button', () => {
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        windowMouseUp(0, 0, auxiliaryButton);

        expect(callbacks.onDrop.called).to.equal(true);
      });
    });

    describe('cancel', () => {
      it('should cancel an existing drag by pressing Escape', () => {
        // start dragging
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onCancel: 0,
        })).to.equal(true);

        windowEscape();
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onCancel: 1,
        })).to.equal(true);
      });

      it('should stop listening to mouse events after a cancel', () => {
        // lift
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        // move
        windowMouseMove(0, sloppyClickThreshold + 1);
        requestAnimationFrame.step();
        // cancel
        windowEscape();

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 1,
          onCancel: 1,
        })).to.equal(true);

        // these should not do anything
        windowMouseMove(0, sloppyClickThreshold + 1);
        windowEscape();
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 1,
          onCancel: 1,
        })).to.equal(true);
      });

      it('should cancel when the window is resized', () => {
        // lift
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        // resize event
        window.dispatchEvent(new Event('resize'));

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 0,
          onCancel: 1,
        })).to.equal(true);
      });

      it('should not do anything if there is nothing dragging', () => {
        windowEscape();
        expect(whereAnyCallbacksCalled(callbacks)).to.equal(false);
      });
    });

    describe('post drag click prevention', () => {
      it('should prevent clicks after a successful drag', () => {
        const stub = sinon.stub();

        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        windowMouseUp(0, sloppyClickThreshold);
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onDrop: 1,
        })).to.equal(true);

        click(wrapper, 0, 0, primaryButton, { preventDefault: stub });
        expect(stub.called).to.equal(true);
      });

      it('should prevent clicks after a drag was cancelled', () => {
        const stub = sinon.stub();

        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        windowEscape();
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onCancel: 1,
        })).to.equal(true);

        click(wrapper, 0, 0, primaryButton, { preventDefault: stub });
        expect(stub.called).to.equal(true);
      });

      it('should not prevent a click if the sloppy click threshold was not exceeded', () => {
        const stub = sinon.stub();

        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold - 1);
        windowMouseUp(0, sloppyClickThreshold - 1);
        expect(callbacksCalled(callbacks)({
          onLift: 0,
          onCancel: 0,
          onDrop: 0,
        })).to.equal(true);

        click(wrapper, 0, 0, primaryButton, { preventDefault: stub });
        expect(stub.called).to.equal(false);
      });

      describe('subsequent interactions', () => {
        it('should allow subsequent clicks through after blocking one after a drag', () => {
          mouseDown(wrapper);
          windowMouseMove(0, sloppyClickThreshold);
          windowMouseUp(0, sloppyClickThreshold);
          expect(callbacksCalled(callbacks)({
            onLift: 1,
            onDrop: 1,
          })).to.equal(true);

          const stub1 = sinon.stub();
          click(wrapper, 0, 0, primaryButton, { preventDefault: stub1 });
          expect(stub1.called).to.equal(true);

          const stub2 = sinon.stub();
          click(wrapper, 0, 0, primaryButton, { preventDefault: stub2 });
          expect(stub2.called).to.equal(false);
        });
      });
    });

    describe('disabled mid drag', () => {
      it('should cancel an existing drag', () => {
        // lift
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        // move
        windowMouseMove(0, sloppyClickThreshold + 1);
        requestAnimationFrame.step();

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 1,
          onCancel: 0,
        })).to.equal(true);

        wrapper.setProps({ isEnabled: false });
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 1,
          onCancel: 1,
        })).to.equal(true);
      });

      it('should stop listening to mouse events', () => {
        // lift
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold + 1);
        // move
        windowMouseMove(0, sloppyClickThreshold + 1);
        requestAnimationFrame.step();

        wrapper.setProps({ isEnabled: false });
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 1,
          onCancel: 1,
        })).to.equal(true);

        // should have no impact
        windowMouseMove(0, sloppyClickThreshold + 1);
        requestAnimationFrame.step();
        windowMouseMove(0, sloppyClickThreshold + 2);
        requestAnimationFrame.step();
        windowMouseUp();
        windowMouseMove(0, sloppyClickThreshold + 2);
        requestAnimationFrame.step();

        // being super safe
        requestAnimationFrame.flush();

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 1,
          onCancel: 1,
        })).to.equal(true);
      });
    });

    describe('unmounted mid drag', () => {
      beforeEach(() => {
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        wrapper.unmount();
      });

      it('should call the onCancel prop', () => {
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onCancel: 1,
        })).to.equal(true);
      });

      it('should unbind any window events', () => {
        windowMouseMove(0, sloppyClickThreshold + 1);

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onCancel: 1,
        })).to.equal(true);
      });
    });

    describe('subsequent drags', () => {
      it('should be possible to do another drag after one finishes', () => {
        Array.from({ length: 10 }, (v, k) => k).forEach((val: number) => {
          // lift
          mouseDown(wrapper);
          windowMouseMove(0, sloppyClickThreshold);
          // move
          windowMouseMove(0, sloppyClickThreshold);
          requestAnimationFrame.step();
          // drop
          windowMouseUp(0, sloppyClickThreshold);

          expect(callbacksCalled(callbacks)({
            onLift: val + 1,
            onMove: val + 1,
            onDrop: val + 1,
          })).to.equal(true);
        });
      });

      it('should allow drags after a cancel', () => {
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        windowEscape();

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onCancel: 1,
        })).to.equal(true);

        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        windowMouseUp(wrapper, 0, sloppyClickThreshold);

        expect(callbacksCalled(callbacks)({
          onCancel: 1,
          onLift: 2,
          onDrop: 1,
        })).to.equal(true);
      });
    });
  });

  describe('keyboard dragging', () => {
    describe('initiation', () => {
      it('should lift when a user presses the space bar', () => {
        pressSpacebar(wrapper);

        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
        })).to.equal(true);
      });

      it('should stop the event before it can be listened to', () => {
        const preventDefault = sinon.stub();
        const stopPropagation = sinon.stub();

        pressSpacebar(wrapper, { preventDefault, stopPropagation });

        expect(preventDefault.called).to.equal(true);
        expect(stopPropagation.called).to.equal(true);
      });
    });

    describe('progress', () => {
      it('should move backward when the user presses ArrowUp', () => {
        pressSpacebar(wrapper);
        // move backward
        windowArrowUp();
        requestAnimationFrame.step();

        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
          onMoveBackward: 1,
        })).to.equal(true);
      });

      it('should move forward when the user presses ArrowDown', () => {
        pressSpacebar(wrapper);
        // move forward
        windowArrowDown();
        requestAnimationFrame.step();

        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
          onMoveForward: 1,
        })).to.equal(true);
      });

      it('should prevent tabbing away from the element while dragging', () => {
        pressSpacebar(wrapper);

        const event: KeyboardEvent = windowTab();

        expect(event.defaultPrevented).to.equal(true);
      });

      it('should prevent submitting the dragging item', () => {
        pressSpacebar(wrapper);
        const event: KeyboardEvent = windowEnter();

        expect(event.defaultPrevented).to.equal(true);
      });

      it('should not take into account any mouse movements', () => {
        pressSpacebar(wrapper);

        windowMouseMove();

        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
          onMove: 0,
          onMoveForward: 0,
          onMoveBackward: 0,
        })).to.equal(true);
      });

      describe('event collapsing', () => {
        it('should collapse multiple forward movements into a single animation frame', () => {
          pressSpacebar(wrapper);

          windowArrowDown();
          windowArrowDown();
          windowArrowDown();
          requestAnimationFrame.step();

          expect(callbacksCalled(callbacks)({
            onKeyLift: 1,
            onMove: 0,
            onMoveForward: 1,
            onMoveBackward: 0,
          })).to.equal(true);

          // being super safe and ensuring nothing firers later
          requestAnimationFrame.flush();

          expect(callbacksCalled(callbacks)({
            onKeyLift: 1,
            onMove: 0,
            onMoveForward: 1,
            onMoveBackward: 0,
          })).to.equal(true);
        });

        it('should collapse multiple backward movements into a single animation frame', () => {
          pressSpacebar(wrapper);

          windowArrowUp();
          windowArrowUp();
          windowArrowUp();
          requestAnimationFrame.step();

          expect(callbacksCalled(callbacks)({
            onKeyLift: 1,
            onMove: 0,
            onMoveForward: 0,
            onMoveBackward: 1,
          })).to.equal(true);

          // being super safe and ensuring nothing firers later
          requestAnimationFrame.flush();

          expect(callbacksCalled(callbacks)({
            onKeyLift: 1,
            onMove: 0,
            onMoveForward: 0,
            onMoveBackward: 1,
          })).to.equal(true);
        });

        it('should not fire a scheduled forward movement if no longer dragging', () => {
          pressSpacebar(wrapper);
          windowArrowDown();
          // finishing drag before animation frame
          windowSpacebar();

          // flushing any animation frames
          requestAnimationFrame.flush();

          expect(callbacksCalled(callbacks)({
            onMoveForward: 0,
            onKeyLift: 1,
            onDrop: 1,
          })).to.equal(true);
        });

        it('should not fire a scheduled backward movement if no longer dragging', () => {
          pressSpacebar(wrapper);
          windowArrowUp();
          // finishing drag before animation frame
          windowSpacebar();

          // flushing any animation frames
          requestAnimationFrame.flush();

          expect(callbacksCalled(callbacks)({
            onMoveBackward: 0,
            onKeyLift: 1,
            onDrop: 1,
          })).to.equal(true);
        });
      });
    });

    describe('finish', () => {
      it('should drop when the user presses spacebar', () => {
        pressSpacebar(wrapper);
        windowSpacebar();

        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
          onDrop: 1,
        })).to.equal(true);
      });
    });

    describe('cancel', () => {
      it('should cancel the drag when the user presses escape', () => {
        pressSpacebar(wrapper);
        windowEscape();

        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
          onCancel: 1,
        })).to.equal(true);
      });

      it('should cancel when the user pushes any mouse button', () => {
        const mouseButtons: number[] = [primaryButton, auxiliaryButton];

        mouseButtons.forEach((button: number, index: number): void => {
          pressSpacebar(wrapper);
          mouseDown(wrapper, 0, 0, button);
          // should now do nothing
          windowArrowUp(wrapper);

          expect(callbacksCalled(callbacks)({
            onKeyLift: index + 1,
            onCancel: index + 1,
          })).to.equal(true);
        });
      });

      it('should cancel when the window is resized', () => {
        // lift
        pressSpacebar(wrapper);
        // resize event
        window.dispatchEvent(new Event('resize'));

        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
          onCancel: 1,
        })).to.equal(true);
      });

      it('should not do anything if there is nothing dragging', () => {
        windowEscape();
        expect(whereAnyCallbacksCalled(callbacks)).to.equal(false);
      });
    });

    describe('post drag click', () => {
      it('should not prevent any clicks after a drag', () => {
        const stub = sinon.stub();
        pressSpacebar(wrapper);
        windowArrowDown(wrapper);
        windowSpacebar();

        click(wrapper, 0, 0, primaryButton, { preventDefault: stub });

        expect(stub.called).to.equal(false);
      });
    });

    describe('disabled mid drag', () => {
      it('should cancel the current drag', () => {
        pressSpacebar(wrapper);

        wrapper.setProps({
          isEnabled: false,
        });

        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
          onCancel: 1,
        })).to.equal(true);
      });
    });

    describe('unmounted mid drag', () => {
      beforeEach(() => {
        pressSpacebar(wrapper);
        wrapper.unmount();
      });

      it('should call the onCancel prop', () => {
        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
          onCancel: 1,
        })).to.equal(true);
      });
    });

    describe('subsequent drags', () => {
      it('should be possible to do another drag after one finishes', () => {
        Array.from({ length: 10 }, (v, k) => k).forEach((val: number) => {
          // lift
          pressSpacebar(wrapper);
          // move forward
          windowArrowDown(wrapper);
          requestAnimationFrame.step();
          // drop
          windowSpacebar();

          expect(callbacksCalled(callbacks)({
            onKeyLift: val + 1,
            onMoveForward: val + 1,
            onDrop: val + 1,
          })).to.equal(true);
        });
      });

      it('should allow drags after a cancel', () => {
        // cancelled drag
        pressSpacebar(wrapper);
        windowEscape();

        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
          onCancel: 1,
        })).to.equal(true);

        // lift and drop
        pressSpacebar(wrapper);
        windowSpacebar(wrapper);

        expect(callbacksCalled(callbacks)({
          onCancel: 1,
          onKeyLift: 2,
          onDrop: 1,
        })).to.equal(true);
      });
    });
  });

  describe('drag disabled', () => {
    it('should not pass any handleProps to the child', () => {
      const stub = sinon.stub().returns(<div>hey</div>);
      mount(
        <DragHandle
          callbacks={callbacks}
          isEnabled={false}
        >
          {(dragHandleProps: ?Provided) => (
            stub(dragHandleProps)
        )}
        </DragHandle>
    );

      expect(stub.calledWith(null)).to.equal(true);
    });
  });
});
