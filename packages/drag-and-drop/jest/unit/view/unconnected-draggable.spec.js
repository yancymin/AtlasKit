// @flow
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
// eslint-disable-next-line no-duplicate-imports
import type { ReactWrapper } from 'enzyme';
import Draggable, { zIndexOptions } from '../../../src/view/draggable/draggable';
import DragHandle, { sloppyClickThreshold } from '../../../src/view/drag-handle/drag-handle';
import Moveable from '../../../src/view/moveable/';
import Placeholder from '../../../src/view/draggable/placeholder';
import type {
  OwnProps,
  MapProps,
  DispatchProps,
  PlacementStyle,
  Provided,
  StateSnapshot,
} from '../../../src/view/draggable/draggable-types';
import type {
  Position,
  InitialDrag,
  DraggableId,
  TypeId,
} from '../../../src/types';
import getDimension from '../../utils/get-dimension-util';
import getContextOptions from '../../utils/get-context-options';
import { dispatchWindowMouseEvent, mouseEvent } from '../../utils/user-input-util';

class Item extends Component {
  props: {
    provided: Provided
  }

  render() {
    const provided: Provided = this.props.provided;

    return (
      <div
        className="item"
        ref={ref => provided.innerRef(ref)}
        style={provided.draggableStyle}
        {...provided.dragHandleProps}
      >
        Hello there!
      </div>
    );
  }
}

const defaultDraggableId: DraggableId = 'draggable1';
const defaultType: TypeId = 'ITEM';
const origin: Position = { x: 0, y: 0 };

const mockInitial: InitialDrag = {
  source: {
    droppableId: 'droppable1',
    index: 0,
  },
  center: { x: 50, y: 50 },
  selection: { x: 20, y: 20 },
  dimension: getDimension({
    id: defaultDraggableId,
    top: 0,
    right: 100,
    bottom: 100,
    left: 0,
  }),
};

const getDispatchPropsStub = (): DispatchProps => ({
  lift: sinon.stub(),
  move: sinon.stub(),
  moveForward: sinon.stub(),
  moveBackward: sinon.stub(),
  drop: sinon.stub(),
  cancel: sinon.stub(),
  dropAnimationFinished: sinon.stub(),
});

// $ExpectError - not setting children function
const defaultOwnProps: OwnProps = {
  draggableId: defaultDraggableId,
  isDragDisabled: false,
  type: defaultType,
};

// $ExpectError - not setting children function
const disabledOwnProps: OwnProps = {
  draggableId: defaultDraggableId,
  isDragDisabled: true,
  type: defaultType,
};

const notDraggingMapProps: MapProps = {
  isDropAnimating: false,
  isDragging: false,
  canAnimate: true,
  offset: origin,
  initial: null,
};

const draggingMapProps: MapProps = {
  isDropAnimating: false,
  isDragging: true,
  canAnimate: false,
  initial: mockInitial,
  offset: { x: 75, y: 75 },
};

const returningHomeMapProps: MapProps = {
  isDropAnimating: true,
  isDragging: false,
  canAnimate: true,
  initial: mockInitial,
  offset: { x: 75, y: 75 },
};

type MountConnected = {|
  ownProps?: OwnProps,
  mapProps?: MapProps,
  dispatchProps?: DispatchProps,
  WrappedComponent?: any,
|};

const mountDraggable = ({
  ownProps = defaultOwnProps,
  mapProps = notDraggingMapProps,
  dispatchProps = getDispatchPropsStub(),
  WrappedComponent = Item,
}: MountConnected = {}): ReactWrapper => mount(
    // $ExpectError - using spread for props
  <Draggable
    {...ownProps}
    {...mapProps}
    {...dispatchProps}
  >
    {(provided: Provided, snapshot: StateSnapshot) => (
      <WrappedComponent provided={provided} snapshot={snapshot} />
      )}
  </Draggable>
, getContextOptions());

const mouseDown = mouseEvent.bind(null, 'mousedown');
const windowMouseMove = dispatchWindowMouseEvent.bind(null, 'mousemove');

type StartDrag = {|
  selection?: Position,
  center?: Position,
|}

const stubClientRect = (center?: Position = origin): void =>
  sinon.stub(Element.prototype, 'getBoundingClientRect').returns({
    left: 0,
    top: 0,
    right: center.x * 2,
    bottom: center.y * 2,
  });

const executeOnLift = (wrapper: ReactWrapper) => ({
    selection = origin,
    center = origin,
  }: StartDrag = {}) => {
  stubClientRect(center);

  wrapper.find(DragHandle).props().callbacks.onLift(selection);
};

const executeOnKeyLift = (wrapper: ReactWrapper) => ({
    center = origin,
  }: StartDrag = {}) => {
  stubClientRect(center);

  wrapper.find(DragHandle).props().callbacks.onKeyLift();
};

const getFromLift = (dispatchProps) => {
  const [draggableIdArg, typeArg, centerArg, selectionArg] = dispatchProps.lift.args[0];

  return {
    draggableId: draggableIdArg,
    type: typeArg,
    center: centerArg,
    selection: selectionArg,
  };
};

const getStubber = stub =>
  class Stubber extends Component {
    props: {|
      provided: Provided,
      snapshot: StateSnapshot,
    |}
    render() {
      const provided: Provided = this.props.provided;
      const snapshot: StateSnapshot = this.props.snapshot;
      stub({ provided, snapshot });
      return (
        <div ref={provided.innerRef} />
      );
    }
};

describe('Draggable - unconnected', () => {
  beforeAll(() => { // eslint-disable-line no-undef
    requestAnimationFrame.reset();
    requestAnimationFrame.reset();
  });

  afterEach(() => {
    if (Element.prototype.getBoundingClientRect.restore) {
      Element.prototype.getBoundingClientRect.restore();
    }
    requestAnimationFrame.reset();
  });

  it('should not create any wrapping elements', () => {
    const wrapper: ReactWrapper = mountDraggable();

    const node = wrapper.getDOMNode();

    expect(node.className).to.equal('item');
  });

  describe('drag handle', () => {
    const startDragWithHandle = (wrapper: ReactWrapper) => ({
      selection = origin,
      center = origin,
    }: StartDrag = {}) => {
      // fake some position to get the center we want
      stubClientRect(center);

      mouseDown(wrapper, selection.x, selection.y - sloppyClickThreshold);
      windowMouseMove(selection.x, selection.y);
    };

    it('should allow you to attach a drag handle', () => {
      const dispatchProps: DispatchProps = getDispatchPropsStub();
      const wrapper = mountDraggable({
        ownProps: defaultOwnProps,
        mapProps: notDraggingMapProps,
        dispatchProps,
        WrappedComponent: Item,
      });

      startDragWithHandle(wrapper.find(Item))();

      expect(dispatchProps.lift.called).to.equal(true);
    });

    describe('non standard drag handle', () => {
      class WithNestedHandle extends Component {
        props: {|
          provided: Provided,
        |}
        render() {
          const provided: Provided = this.props.provided;
          return (
            <div
              ref={ref => provided.innerRef(ref)}
              style={provided.draggableStyle}
            >
              <div className="cannot-drag">
                Cannot drag by me
              </div>
              <div className="can-drag" {...provided.dragHandleProps}>
                Can drag by me
              </div>
            </div>
          );
        }
      }

      it('should allow the ability to have the drag handle to be a child of the draggable', () => {
        const dispatchProps: DispatchProps = getDispatchPropsStub();
        const wrapper = mountDraggable({
          ownProps: defaultOwnProps,
          mapProps: notDraggingMapProps,
          dispatchProps,
          WrappedComponent: WithNestedHandle,
        });

        startDragWithHandle(wrapper.find(WithNestedHandle).find('.can-drag'))();

        expect(dispatchProps.lift.called).to.equal(true);
      });

      it('should not drag by the draggable element', () => {
        const dispatchProps: DispatchProps = getDispatchPropsStub();
        const wrapper = mountDraggable({
          ownProps: defaultOwnProps,
          mapProps: notDraggingMapProps,
          dispatchProps,
          WrappedComponent: WithNestedHandle,
        });

        startDragWithHandle(wrapper.find(WithNestedHandle))();

        expect(dispatchProps.lift.called).to.equal(false);
      });

      it('should not drag by other elements', () => {
        const dispatchProps: DispatchProps = getDispatchPropsStub();
        const wrapper = mountDraggable({
          ownProps: defaultOwnProps,
          mapProps: notDraggingMapProps,
          dispatchProps,
          WrappedComponent: WithNestedHandle,
        });

        startDragWithHandle(wrapper.find(WithNestedHandle).find('.cannot-drag'))();

        expect(dispatchProps.lift.called).to.equal(false);
      });
    });

    describe('handling events', () => {
      describe('onLift', () => {
        let dispatchProps;
        let wrapper;

        beforeEach(() => {
          dispatchProps = getDispatchPropsStub();
          wrapper = mountDraggable({
            dispatchProps,
          });
        });

        afterEach(() => {
          wrapper.unmount();
        });

        it('should throw if lifted when dragging is not enabled', () => {
          const customWrapper = mountDraggable({
            ownProps: disabledOwnProps,
            mapProps: notDraggingMapProps,
          });

          expect(() => executeOnLift(customWrapper)()).to.throw();
        });

        it('should throw if lifted when not attached to the dom', () => {
          const customWrapper = mountDraggable();
          customWrapper.unmount();

          expect(() => executeOnLift(customWrapper)()).to.throw();
        });

        it('should lift with the draggable id', () => {
          executeOnLift(wrapper)();

          expect(getFromLift(dispatchProps).draggableId).to.equal(defaultDraggableId);
        });

        it('should lift with the draggable type', () => {
          executeOnLift(wrapper)();

          expect(getFromLift(dispatchProps).type).to.equal(defaultType);
        });

        it('should lift with the selected position', () => {
          const selection: Position = {
            x: 100,
            y: 200,
          };

          executeOnLift(wrapper)({ selection });

          expect(getFromLift(dispatchProps).selection).to.deep.equal(selection);
        });

        it('should lift with the center position', () => {
          const center: Position = {
            x: 50,
            y: 80,
          };

          executeOnLift(wrapper)({ center });

          expect(getFromLift(dispatchProps).center).to.deep.equal(center);
        });
      });

      describe('onMove', () => {
        it('should throw if dragging is not enabled', () => {
          const wrapper = mountDraggable({
            ownProps: disabledOwnProps,
            mapProps: draggingMapProps,
          });

          const move = () =>
            wrapper.find(DragHandle).props().callbacks.onMove({ x: 100, y: 200 });

          expect(move).to.throw();
        });

        it('should throw if not attached to the DOM', () => {
          const wrapper = mountDraggable({
            mapProps: notDraggingMapProps,
          });
          const move = () => {
            // Calling the prop directly as this is not able to be done otherwise
            wrapper.find(DragHandle).props().callbacks.onMove({ x: 100, y: 200 });
          };

          wrapper.unmount();

          expect(move).to.throw();
        });

        it('should not do anything if the dimensions have not all been published yet', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: notDraggingMapProps,
            dispatchProps,
          });

          // should not do anything yet as mapProps has not yet updated
          wrapper.find(DragHandle).props().callbacks.onMove({ x: 100, y: 200 });

          expect(dispatchProps.move.called).to.equal(false);
        });

        it('should consider any mouse movement in offset and center', () => {
          const original: Position = mockInitial.selection;
          const mouse: Position = {
            x: 10,
            y: 50,
          };
          const mouseDiff = {
            x: mouse.x - original.x,
            y: mouse.y - original.y,
          };
          const expectedCenter = {
            x: mockInitial.center.x + mouseDiff.x,
            y: mockInitial.center.y + mouseDiff.y,
          };
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().callbacks.onMove(mouse);
          const [, offset, center] = dispatchProps.move.args[0];

          expect(offset).to.deep.equal(mouseDiff);
          expect(center).to.deep.equal(expectedCenter);
        });
      });

      describe('onDrop', () => {
        it('should throw if dragging is disabled', () => {
          const wrapper = mountDraggable({
            ownProps: disabledOwnProps,
            mapProps: draggingMapProps,
          });

          const drop = () => wrapper.find(DragHandle).props().callbacks.onDrop();

          expect(drop).to.throw();
        });

        it('should throw if not attached to the DOM', () => {
          const wrapper = mountDraggable({
            mapProps: notDraggingMapProps,
          });
          const drop = () => {
            wrapper.find(DragHandle).props().callbacks.onDrop();
          };

          wrapper.unmount();

          expect(drop).to.throw();
        });

        it('should trigger drop', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().callbacks.onDrop();

          expect(dispatchProps.drop.calledWith(defaultDraggableId)).to.equal(true);
        });
      });

      describe('onKeyLift', () => {
        let standardWrapper;
        let dispatchProps;

        beforeEach(() => {
          dispatchProps = getDispatchPropsStub();
          standardWrapper = mountDraggable({
            mapProps: notDraggingMapProps,
            dispatchProps,
          });
        });

        it('should throw if dragging is disabled', () => {
          const wrapper = mountDraggable({
            ownProps: disabledOwnProps,
            mapProps: notDraggingMapProps,
          });

          const onKeyLift = () => executeOnKeyLift(wrapper)();

          expect(onKeyLift).to.throw();
        });

        it('should throw if not attached to the DOM', () => {
          const onKeyLift = () => executeOnKeyLift(standardWrapper)();

          standardWrapper.unmount();

          expect(onKeyLift).to.throw();
        });

        it('should lift with the draggableId', () => {
          executeOnKeyLift(standardWrapper)();

          expect(getFromLift(dispatchProps).draggableId).to.equal(defaultDraggableId);
        });

        it('should lift with the current center position', () => {
          const center: Position = {
            x: 50,
            y: 80,
          };
          executeOnKeyLift(standardWrapper)({ center });

          expect(getFromLift(dispatchProps).center).to.deep.equal(center);
        });

        it('should lift with the center point as the selected position', () => {
          const center: Position = {
            x: 100,
            y: 200,
          };
          executeOnKeyLift(standardWrapper)({ center });

          expect(getFromLift(dispatchProps).selection).to.deep.equal(center);
        });
      });

      describe('onMoveBackward', () => {
        it('should throw if dragging is disabled', () => {
          const wrapper = mountDraggable({
            ownProps: disabledOwnProps,
            mapProps: notDraggingMapProps,
          });

          const tryMove = () =>
            wrapper.find(DragHandle).props().callbacks.onMoveBackward(defaultDraggableId);

          expect(tryMove).to.throw();
        });

        it('should throw if not attached to the DOM', () => {
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
          });
          const tryMove = () =>
            wrapper.find(DragHandle).props().callbacks.onMoveBackward(defaultDraggableId);

          wrapper.unmount();

          expect(tryMove).to.throw();
        });

        it('should call the move backward action', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().callbacks.onMoveBackward(defaultDraggableId);

          expect(dispatchProps.moveBackward.calledWith(defaultDraggableId)).to.equal(true);
        });
      });

      describe('onMoveForward', () => {
        it('should throw if dragging is disabled', () => {
          const wrapper = mountDraggable({
            ownProps: disabledOwnProps,
            mapProps: draggingMapProps,
          });

          const tryMove = () =>
            wrapper.find(DragHandle).props().callbacks.onMoveForward(defaultDraggableId);

          expect(tryMove).to.throw();
        });

        it('should throw if not attached to the DOM', () => {
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
          });

          wrapper.unmount();

          const tryMove = () =>
            wrapper.find(DragHandle).props().callbacks.onMoveForward(defaultDraggableId);

          expect(tryMove).to.throw();
        });

        it('should call the move forward action', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().callbacks.onMoveForward(defaultDraggableId);

          expect(dispatchProps.moveForward.calledWith(defaultDraggableId)).to.equal(true);
        });
      });

      describe('onCancel', () => {
        it('should call the cancel dispatch prop', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().callbacks.onCancel(defaultDraggableId);

          expect(dispatchProps.cancel.calledWith(defaultDraggableId)).to.equal(true);
        });

        it('should allow the action even if dragging is disabled', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            ownProps: disabledOwnProps,
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().callbacks.onCancel(defaultDraggableId);

          expect(dispatchProps.cancel.calledWith(defaultDraggableId)).to.equal(true);
        });

        it('should allow the action even when not attached to the dom', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().callbacks.onCancel(defaultDraggableId);

          expect(dispatchProps.cancel.calledWith(defaultDraggableId)).to.equal(true);
        });
      });
    });
  });

  describe('movement', () => {
    it('should move by the provided offset on mount', () => {
      const stub = sinon.stub();
      const Stubber = getStubber(stub);
      const expected = `translate(${draggingMapProps.offset.x}px, ${draggingMapProps.offset.y}px)`;

      mountDraggable({
        mapProps: draggingMapProps,
        WrappedComponent: Stubber,
      });
      // finish moving to the initial position
      requestAnimationFrame.flush();

      // first call is for the setRef
      const provided: Provided = stub.lastCall.args[0].provided;

      if (!provided.draggableStyle || !provided.draggableStyle.transform) {
        expect.fail();
        return;
      }

      expect(provided.draggableStyle.transform).to.equal(expected);
    });

    it('should move by the provided offset on update', () => {
      const stub = sinon.stub();
      const Stubber = getStubber(stub);
      const offsets: Array<Position> = [
          { x: 12, y: 3 },
          { x: 20, y: 100 },
          { x: -100, y: 20 },
      ];

      // initial render
      const wrapper = mountDraggable({
        mapProps: draggingMapProps,
        WrappedComponent: Stubber,
      });
      // flush initial movement
      requestAnimationFrame.flush();

      offsets.forEach((offset: Position) => {
        const expected = `translate(${offset.x}px, ${offset.y}px)`;
        // $ExpectError - flow does not like spread
        const mapProps: MapProps = {
          ...draggingMapProps,
          offset,
        };

        // movement will be instant
        wrapper.setProps({
          ...mapProps,
        });
        // flush any movement required
        requestAnimationFrame.step();

        const provided: Provided = stub.lastCall.args[0].provided;
        if (!provided.draggableStyle || !provided.draggableStyle.transform) {
          expect.fail();
          return;
        }
        expect(provided.draggableStyle.transform).to.equal(expected);
      });
    });

    it('should give a placeholder the same dimension of the element being moved', () => {
      const stub = sinon.stub();
      const Stubber = getStubber(stub);

      mountDraggable({
        mapProps: draggingMapProps,
        WrappedComponent: Stubber,
      });
      // finish moving to the initial position
      requestAnimationFrame.flush();

      const provided: Provided = stub.lastCall.args[0].provided;
      // $ExpectError - because we do not have the correct React type for placeholder
      expect(provided.placeholder.props.height).to.equal(mockInitial.dimension.withMargin.height);
      // $ExpectError - because we do not have the correct React type for placeholder
      expect(provided.placeholder.props.width).to.equal(mockInitial.dimension.withMargin.width);
    });

    describe('is not dragging', () => {
      let wrapper: ReactWrapper;
      let provided: Provided;
      let snapshot: StateSnapshot;

      beforeEach(() => {
        const stub = sinon.stub();
        wrapper = mountDraggable({
          mapProps: notDraggingMapProps,
          WrappedComponent: getStubber(stub),
        });
        provided = stub.lastCall.args[0].provided;
        snapshot = stub.lastCall.args[0].snapshot;
      });

      it('should not render a placeholder', () => {
        expect(provided.placeholder).to.equal(null);
      });

      it('should return no draggable style', () => {
        expect(provided.draggableStyle).to.equal(null);
      });

      it('should move quickly out of the way if needed', () => {
        expect(wrapper.find(Moveable).props().speed).to.equal('FAST');
      });

      it('should instantly move out of the way if animation is disabled', () => {
        // $ExpectError - using spread
        const mapProps: MapProps = {
          ...notDraggingMapProps,
          canAnimate: false,
        };

        const customWrapper = mountDraggable({
          ownProps: disabledOwnProps,
          mapProps,
        });

        expect(customWrapper.find(Moveable).props().speed).to.equal('INSTANT');
      });

      it('should let consumers know that the item is not dragging', () => {
        expect(snapshot.isDragging).to.equal(false);
      });
    });

    describe('is dragging', () => {
      it('should render a placeholder', () => {
        const stub = sinon.stub();

        mountDraggable({
          mapProps: draggingMapProps,
          WrappedComponent: getStubber(stub),
        });

        const provided: Provided = stub.lastCall.args[0].provided;
        // $ExpectError - because we do not have the correct React type for placeholder
        expect(provided.placeholder.type).to.equal(Placeholder);
      });

      it('should be above of draggables that are not dragging', () => {
        const draggingStub = sinon.stub();
        mountDraggable({
          mapProps: draggingMapProps,
          WrappedComponent: getStubber(draggingStub),
        });
        const draggingProvided: Provided = draggingStub.lastCall.args[0].provided;
        const notDraggingStub = sinon.stub();
        mountDraggable({
          mapProps: notDraggingMapProps,
          WrappedComponent: getStubber(notDraggingStub),
        });

        const notDraggingProvided: Provided = notDraggingStub.lastCall.args[0].provided;
        if (!draggingProvided.draggableStyle || !draggingProvided.draggableStyle.zIndex) {
          expect.fail();
          return;
        }
        expect(draggingProvided.draggableStyle.zIndex).to.equal(zIndexOptions.dragging);
        expect(notDraggingProvided.draggableStyle).to.equal(null);
      });

      it('should be above Draggables returning to home', () => {
        const draggingStub = sinon.stub();
        mountDraggable({
          mapProps: draggingMapProps,
          WrappedComponent: getStubber(draggingStub),
        });
        const draggingProvided: Provided = draggingStub.lastCall.args[0].provided;
        const returningHomeStub = sinon.stub();
        mountDraggable({
          mapProps: returningHomeMapProps,
          WrappedComponent: getStubber(returningHomeStub),
        });
        const returningHomeProvided: Provided = returningHomeStub.lastCall.args[0].provided;

        // $ExpectError - not type checking draggableStyle
        expect(draggingProvided.draggableStyle.zIndex)
          // $ExpectError - not type checking draggableStyle
          .to.be.above(returningHomeProvided.draggableStyle.zIndex);
      });

      it('should be positioned absolutely in the same spot as before', () => {
        const stub = sinon.stub();
        mountDraggable({
          mapProps: draggingMapProps,
          WrappedComponent: getStubber(stub),
        });
        // appeasing flow
        if (!draggingMapProps.initial) {
          throw new Error('invalid data');
        }
        const dimension = draggingMapProps.initial.dimension;
        const expected: PlacementStyle = {
          position: 'absolute',
          zIndex: zIndexOptions.dragging,
          boxSizing: 'border-box',
          width: dimension.withMargin.width,
          height: dimension.withMargin.height,
        };

        const provided: Provided = stub.lastCall.args[0].provided;
        expect(provided.draggableStyle).to.deep.equal(expected);
      });

      it('should move quickly if it should animate', () => {
          // $ExpectError - spread operator on exact type
        const mapProps: MapProps = {
          ...draggingMapProps,
          canAnimate: true,
        };

        const wrapper = mountDraggable({
          mapProps,
        });

        expect(wrapper.find(Moveable).props().speed).to.equal('FAST');
      });

      it('should move instantly if it should not animate', () => {
        const wrapper = mountDraggable({
          mapProps: draggingMapProps,
        });

        expect(wrapper.find(Moveable).props().speed).to.equal('INSTANT');
      });

      it('should let consumers know that the item is dragging', () => {
        const stub = sinon.stub();

        mountDraggable({
          mapProps: draggingMapProps,
          WrappedComponent: getStubber(stub),
        });

        const snapshot: StateSnapshot = stub.lastCall.args[0].snapshot;
        expect(snapshot.isDragging).to.equal(true);
      });
    });

    describe('returning to home after drop', () => {
      it('should render a placeholder', () => {
        const stub = sinon.stub();

        mountDraggable({
          mapProps: returningHomeMapProps,
          WrappedComponent: getStubber(stub),
        });

        const provided: Provided = stub.lastCall.args[0].provided;

        // $ExpectError - because we do not have the correct React type for placeholder
        expect(provided.placeholder.type).to.equal(Placeholder);
      });

      it('should move back to home with standard speed', () => {
        const stub = sinon.stub();

        const wrapper = mountDraggable({
          mapProps: returningHomeMapProps,
          WrappedComponent: getStubber(stub),
        });

        expect(wrapper.find(Moveable).props().speed).to.equal('STANDARD');
      });

      it('should be on top of draggables that are not being dragged', () => {
        const notDraggingStub = sinon.stub();
        mountDraggable({
          mapProps: notDraggingMapProps,
          WrappedComponent: getStubber(notDraggingStub),
        });
        const notDraggingProvided: Provided = notDraggingStub.lastCall.args[0].provided;
        const returningHomeStub = sinon.stub();
        mountDraggable({
          mapProps: returningHomeMapProps,
          WrappedComponent: getStubber(returningHomeStub),
        });
        const returningHomeProvided: Provided = returningHomeStub.lastCall.args[0].provided;

        // $ExpectError - not checking draggableStyle
        expect(returningHomeProvided.draggableStyle.zIndex).to.equal(zIndexOptions.dropAnimating);
        expect(notDraggingProvided.draggableStyle).to.equal(null);
      });

      it('should be positioned absolutely in the same spot as before', () => {
        const stub = sinon.stub();
        // $ExpectError - initial is nullable
        const dimension = returningHomeMapProps.initial.dimension;
        const expected: PlacementStyle = {
          position: 'absolute',
          boxSizing: 'border-box',
          zIndex: zIndexOptions.dropAnimating,
          width: dimension.withMargin.width,
          height: dimension.withMargin.height,
        };

        mountDraggable({
          mapProps: returningHomeMapProps,
          WrappedComponent: getStubber(stub),
        });

        const provided: Provided = stub.lastCall.args[0].provided;
        expect(provided.draggableStyle).to.deep.equal(expected);
      });

      it('should let consumers know that the item is no longer dragging', () => {
        const stub = sinon.stub();

        mountDraggable({
          mapProps: returningHomeMapProps,
          WrappedComponent: getStubber(stub),
        });

        const snapshot: StateSnapshot = stub.lastCall.args[0].snapshot;
        expect(snapshot.isDragging).to.equal(false);
      });
    });

    describe('dropped and return to home animation is finished', () => {
      // $ExpectError - spead operator and exact type
      const mapProps: MapProps = {
        ...returningHomeMapProps,
        isDropAnimating: false,
      };
      const stub = sinon.stub();
      mountDraggable({
        mapProps,
        WrappedComponent: getStubber(stub),
      });
      const provided: Provided = stub.lastCall.args[0].provided;
      const snapshot: StateSnapshot = stub.lastCall.args[0].snapshot;

      it('should not return a placeholder', () => {
        expect(provided.placeholder).to.equal(null);
      });

      it('should not be moved from its original position', () => {
        expect(provided.draggableStyle).to.equal(null);
      });

      it('should let consumers know that the item is not dragging', () => {
        expect(snapshot.isDragging).to.equal(false);
      });
    });

    describe('dropped but no return to home animation is needed', () => {
      const stub = sinon.stub();
      // $ExpectError - spread operator and exact type
      const mapProps: MapProps = {
        ...returningHomeMapProps,
        canAnimate: false,
        isDropAnimating: false,
      };
      mountDraggable({
        mapProps,
        WrappedComponent: getStubber(stub),
      });
      const provided: Provided = stub.lastCall.args[0].provided;
      const snapshot: StateSnapshot = stub.lastCall.args[0].snapshot;

      it('should not render a placeholder', () => {
        expect(provided.placeholder).to.equal(null);
      });

      it('should not be moved from its original position', () => {
        expect(provided.draggableStyle).to.equal(null);
      });

      it('should let consumers know that the item is not dragging', () => {
        expect(snapshot.isDragging).to.equal(false);
      });
    });
  });
});
