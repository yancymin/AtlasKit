// @flow
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { DragDropContext, Draggable, Droppable } from '../../../src/';
import { sloppyClickThreshold } from '../../../src/view/drag-handle/drag-handle';
import { dispatchWindowMouseEvent, dispatchWindowKeyDownEvent, mouseEvent } from '../../utils/user-input-util';
import type {
  Hooks,
  DraggableLocation,
  DraggableId,
  DroppableId,
  DropResult,
  Position,
} from '../../../src/types';
import type { Provided as DraggableProvided } from '../../../src/view/draggable/draggable-types';
import type { Provided as DroppableProvided } from '../../../src/view/droppable/droppable-types';

const windowMouseMove = dispatchWindowMouseEvent.bind(null, 'mousemove');
const windowMouseUp = dispatchWindowMouseEvent.bind(null, 'mouseup');
const mouseDown = mouseEvent.bind(null, 'mousedown');
const cancelWithKeyboard = dispatchWindowKeyDownEvent.bind(null, 'Escape');

describe('hooks integration', () => {
  let clock;
  let hooks: Hooks;
  let wrapper;

  const draggableId: DraggableId = 'drag-1';
  const droppableId: DroppableId = 'drop-1';

  // both our list and item have the same dimension for now
  const fakeBox = {
    top: 0,
    right: 100,
    bottom: 100,
    left: 0,
    height: 100,
    width: 100,
  };

  const getMountedApp = () => {
      // Both list and item will have the same dimensions
    sinon.stub(Element.prototype, 'getBoundingClientRect').returns(fakeBox);

      // Stubbing out totally - not including margins in this
    sinon.stub(window, 'getComputedStyle').returns({
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0',
    });

    return mount(
      <DragDropContext
        onDragStart={hooks.onDragStart}
        onDragEnd={hooks.onDragEnd}
      >
        <Droppable droppableId={droppableId}>
          {(droppableProvided: DroppableProvided) => (
            <div ref={droppableProvided.innerRef} >
              <h2>Droppable</h2>
              <Draggable draggableId={draggableId}>
                {(draggableProvided: DraggableProvided) => (
                  <div
                    className="drag-handle"
                    ref={draggableProvided.innerRef}
                    style={draggableProvided.draggableStyle}
                    {...draggableProvided.dragHandleProps}
                  >
                    <h4>Draggable</h4>
                  </div>
                )}
              </Draggable>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  beforeEach(() => {
    requestAnimationFrame.reset();
    clock = sinon.useFakeTimers();
    hooks = {
      onDragStart: sinon.stub(),
      onDragEnd: sinon.stub(),
    };
    wrapper = getMountedApp();
  });

  afterEach(() => {
    clock.restore();
    requestAnimationFrame.reset();

    // clean up any loose events
    wrapper.unmount();

      // clean up any stubs
    if (Element.prototype.getBoundingClientRect.restore) {
      Element.prototype.getBoundingClientRect.restore();
    }
    if (window.getComputedStyle.restore) {
      window.getComputedStyle.restore();
    }
  });

  const drag = (() => {
    const initial: Position = {
      x: fakeBox.left + 1,
      y: fakeBox.bottom + 1,
    };
    const dragStart: Position = {
      x: initial.x,
      y: initial.y + sloppyClickThreshold,
    };
    const dragMove: Position = {
      x: dragStart.x,
      y: dragStart.y + 1,
    };

    const start = () => {
      mouseDown(
        wrapper.find('.drag-handle'),
        initial.x,
        initial.y,
      );

      // Drag does not start until mouse has moved past a certain threshold
      windowMouseMove(dragStart.x, dragStart.y);

      // Need to wait for the nested async lift action to complete
      // this takes two async actions. However, this caller should not
      // know that - so ticking '10ms' to indicate that this is a nested async
      clock.tick(10);
    };

    const move = () => {
      windowMouseMove(dragMove.x, dragMove.y + sloppyClickThreshold + 1);
      // movements are scheduled with requestAnimationFrame
      requestAnimationFrame.step();
    };

    const stop = () => {
      windowMouseUp();

        // flush the return to home animation
      requestAnimationFrame.flush();

        // animation finishing waits a tick before calling the callback
      clock.tick();
    };

    const cancel = () => {
      cancelWithKeyboard();
    };

    const perform = () => {
      start();
      move();
      stop();
    };

    return { start, move, stop, cancel, perform };
  })();

  const expected = (() => {
    const start: DraggableLocation = {
      droppableId,
      index: 0,
    };

      // Unless we do some more hardcore stubbing
      // both completed and cancelled look the same.
      // Ideally we would move one item below another
    const completed: DropResult = {
      draggableId,
      source: start,
      destination: null,
    };

    const cancelled: DropResult = {
      draggableId,
      source: start,
      destination: null,
    };

    return { completed, cancelled };
  })();

  const wasDragStarted = (amountOfDrags?: number = 1) => {
    // $ExpectError - type of hook function
    expect(hooks.onDragStart.callCount).to.equal(amountOfDrags);
    // $ExpectError - type of hook function
    expect(hooks.onDragStart.args[amountOfDrags - 1])
            .to.deep.equal([draggableId, expected.completed.source]);
  };

  const wasDragCompleted = (amountOfDrags?: number = 1) => {
    expect(hooks.onDragEnd.callCount).to.equal(amountOfDrags);
    expect(hooks.onDragEnd.args[amountOfDrags - 1][0])
            .to.deep.equal(expected.completed);
  };

  const wasDragCancelled = (amountOfDrags?: number = 1) => {
    expect(hooks.onDragEnd.callCount).to.equal(amountOfDrags);
    expect(hooks.onDragEnd.args[amountOfDrags - 1][0])
          .to.deep.equal(expected.cancelled);
  };

  describe('drag start', () => {
    it('should call the onDragStart hook when a drag starts', () => {
      drag.start();

      wasDragStarted();
    });

    it('should not call onDragStart while the drag is occurring', () => {
      drag.start();
      wasDragStarted();

      drag.move();

      // should not have called on drag start again
      // $ExpectError - type of hook function
      expect(hooks.onDragStart.calledOnce).to.equal(true);
    });
  });

  describe('drag end', () => {
    it('should call the onDragEnd hook when a drag ends', () => {
      drag.perform();

      wasDragCompleted();
    });

    it('should call the onDragEnd hook when a drag ends when instantly stopped', () => {
      drag.start();
      drag.stop();

      wasDragCompleted();
    });
  });

  describe('drag cancel', () => {
    it('should call onDragEnd when a drag is canceled', () => {
      drag.start();
      drag.move();
      drag.cancel();

      wasDragCancelled();
    });

    it('should call onDragEnd when a drag is canceled instantly', () => {
      drag.start();
      drag.cancel();

      wasDragCancelled();
    });
  });

  describe('subsequent drags', () => {
    it('should publish subsequent drags', () => {
      drag.perform();
      wasDragStarted(1);
      wasDragCompleted(1);

      drag.perform();
      wasDragStarted(2);
      wasDragCompleted(2);
    });

    it('should publish subsequent drags after a cancel', () => {
      drag.start();
      drag.cancel();
      wasDragStarted(1);
      wasDragCancelled(1);

      drag.perform();
      wasDragStarted(2);
      wasDragCompleted(2);
    });
  });
});
