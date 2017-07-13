// @flow
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Draggable, { makeSelector } from '../../../src/view/draggable/connected-draggable';
import getDimension from '../../utils/get-dimension-util';
import noImpact from '../../../src/state/no-impact';
import getContextOptions from '../../utils/get-context-options';
import type {
  CurrentDrag,
  Phase,
  DragState,
  DropResult,
  PendingDrop,
  Dimension,
  DragImpact,
  DraggableId,
  InitialDrag,
  Position,
} from '../../../src/types';
import type { MapProps, Provided } from '../../../src/view/draggable/draggable-types';

const make = (() => {
  let callCount = 0;

  return () => {
    callCount++;
    const id: DraggableId = `drag-id-${callCount}`;
    const selector = makeSelector();
    const dimension: Dimension = getDimension({
      top: 100 * callCount,
      left: 0,
      right: 100,
      bottom: (100 * callCount) + 20,
    });
    const initial: InitialDrag = {
      source: {
        index: 0,
        droppableId: 'drop-1',
      },
      center: dimension.center,
      selection: dimension.center,
      dimension,
    };
    const drag = (offset: Position, impact?: DragImpact = noImpact): DragState => {
      const center: Position = {
        x: initial.center.x + offset.x,
        y: initial.center.y + offset.y,
      };
      const current: CurrentDrag = {
        id,
        type: 'TYPE',
        offset,
        center,
        shouldAnimate: true,
      };

      const state: DragState = {
        current,
        impact,
        initial,
      };
      return state;
    };
    const drop = (
      newHomeOffset: Position,
      impact?: DragImpact = noImpact,
    ): PendingDrop => {
      const result: DropResult = {
        draggableId: id,
        source: initial.source,
        destination: {
          index: initial.source.index + 1,
          droppableId: initial.source.droppableId,
        },
      };

      const pending: PendingDrop = {
        newHomeOffset,
        result,
        last: drag(newHomeOffset, impact),
      };
      return pending;
    };

    return { id, selector, initial, dimension, drag, drop };
  };
})();

const defaultMapProps = {
  isDropAnimating: false,
  isDragging: false,
  canAnimate: true,
  // at the origin by default
  offset: {
    x: 0,
    y: 0,
  },
  initial: null,
};

type SelectorArgs = {|
  phase: Phase,
  drag: ?DragState,
  pending: ?PendingDrop,
  id: DraggableId,
|}

const execute = (selector: Function) =>
  ({ phase, drag, pending, id }: SelectorArgs): MapProps =>
    selector.resultFunc(
      phase,
      drag,
      pending,
      id,
    );

describe('Draggable - connected', () => {
  describe('selector', () => {
    beforeEach(() => {
      sinon.stub(console, 'error');
    });

    afterEach(() => {
      console.error.restore();
    });

    describe('dragging', () => {
      it('should log an error and return default props if there is invalid drag state', () => {
        const { id, selector } = make();

        const result = execute(selector)({
          phase: 'DRAGGING',
          drag: null,
          pending: null,
          id,
        });

        expect(result).to.deep.equal(defaultMapProps);

        expect(console.error.calledOnce).to.equal(true);
      });

      describe('item is dragging', () => {
        it('should return the current position of the item', () => {
          const { id, initial, selector, drag } = make();
          const offset: Position = {
            x: 100,
            y: 200,
          };
          const expected: MapProps = {
            isDropAnimating: false,
            isDragging: true,
            canAnimate: true,
            offset,
            initial,
          };

          const result: MapProps = execute(selector)({
            phase: 'DRAGGING',
            drag: drag(offset),
            pending: null,
            id,
          });

          expect(result).to.deep.equal(expected);
        });

        it('should break memoization on every call', () => {
          const { selector, id, drag } = make();
          const state: DragState = drag({ x: 100, y: 200 });

          const first: MapProps = execute(selector)({
            phase: 'DRAGGING',
            drag: state,
            pending: null,
            id,
          });
          const second: MapProps = execute(selector)({
            phase: 'DRAGGING',
            drag: state,
            pending: null,
            id,
          });

      // checking we did not get the same reference back
          expect(first).to.not.equal(second);
          expect(first).to.deep.equal(second);
        });
      });

      describe('item is not dragging', () => {
        const dragging = make();
        const notDragging = make();
        it('should return the default props', () => {
          const result: MapProps = execute(notDragging.selector)({
            phase: 'DRAGGING',
            drag: dragging.drag({ x: 100, y: 200 }),
            pending: null,
            id: notDragging.id,
          });

          expect(result).to.deep.equal(defaultMapProps);
        });

        it('should not break memoization on multiple calls', () => {
          const first: MapProps = execute(notDragging.selector)({
            phase: 'DRAGGING',
            drag: dragging.drag({ x: 100, y: 200 }),
            pending: null,
            id: notDragging.id,
          });
          const second: MapProps = execute(notDragging.selector)({
            phase: 'DRAGGING',
            drag: dragging.drag({ x: 100, y: 200 }),
            pending: null,
            id: notDragging.id,
          });

        // checking that we got the same object back
          expect(first).to.equal(second);
        });
      });
    });

    describe('drop animating', () => {
      it('should log an error and return default props if there is no pending drop', () => {
        const { id, selector } = make();

        const props: MapProps = execute(selector)({
          phase: 'DROP_ANIMATING',
          drag: null,
          pending: null,
          id,
        });

        expect(props).to.deep.equal(defaultMapProps);
        expect(console.error.calledOnce).to.equal(true);
      });

      describe('item was dragging', () => {
        it('should move to the new home offset', () => {
          const { id, initial, selector, drop } = make();
          const newHomeOffset: Position = {
            x: 100,
            y: 10,
          };
          const expected: MapProps = {
          // Still having isDragging: true to keep the isDraggingProp the same
            isDragging: true,
            isDropAnimating: true,
            canAnimate: true,
            offset: newHomeOffset,
            initial,
          };
          const pending: PendingDrop = drop(newHomeOffset);

          const props: MapProps = execute(selector)({
            phase: 'DROP_ANIMATING',
            drag: null,
            pending,
            id,
          });

          expect(props).to.deep.equal(expected);
        });
      });

      describe('item was not dragging and not moved', () => {
        it('should remain in its original position', () => {
          const dragging = make();
          const notDragging = make();

          const props: MapProps = execute(notDragging.selector)({
            phase: 'DROP_ANIMATING',
            drag: null,
            pending: dragging.drop({ x: 100, y: 200 }),
            id: notDragging.id,
          });

          expect(props).to.deep.equal(defaultMapProps);
        });

        it('should not break memoization from while the drag was occurring', () => {
          const dragging = make();
          const notDragging = make();

          const duringDrag: MapProps = execute(notDragging.selector)({
            phase: 'DRAGGING',
            drag: dragging.drag({ x: 100, y: 200 }),
            pending: null,
            id: notDragging.id,
          });
          const postDrag: MapProps = execute(notDragging.selector)({
            phase: 'DROP_ANIMATING',
            drag: null,
            pending: dragging.drop({ x: 200, y: 200 }),
            id: notDragging.id,
          });

          expect(duringDrag).to.deep.equal(defaultMapProps);
          expect(postDrag).to.deep.equal(defaultMapProps);
        // checking object equality
          expect(duringDrag).to.equal(postDrag);
        });
      });

      describe('item was not dragging but was moved out of the way', () => {
        const dragging = make();
        const notDragging = make();
        it('should move to the final offset', () => {
          const impact: DragImpact = {
            movement: {
              draggables: [notDragging.id],
              amount: dragging.dimension.withMargin.height,
              isMovingForward: true,
            },
            destination: {
              index: dragging.initial.source.index + 1,
              droppableId: dragging.initial.source.droppableId,
            },
          };
          const expected: MapProps = {
            isDropAnimating: false,
            isDragging: false,
            canAnimate: true,
          // Because the item is moving forward, this will
          // be moving backwards to get out of the way.
            offset: {
              x: 0,
              y: -dragging.dimension.withMargin.height,
            },
            initial: null,
          };

          const props: MapProps = execute(notDragging.selector)({
            phase: 'DROP_ANIMATING',
            drag: null,
            pending: dragging.drop({ x: 100, y: 100 }, impact),
            id: notDragging.id,
          });

          expect(props).to.deep.equal(expected);
        });

        it('should not break memoization if it was already heading to the same location before the drag was completed', () => {
          const offset: Position = {
            x: 100,
            y: 200,
          };
        // notDragging is moving out of the way
          const impact: DragImpact = {
            movement: {
              draggables: [notDragging.id],
              amount: dragging.dimension.withMargin.height,
              isMovingForward: true,
            },
            destination: {
              index: dragging.initial.source.index + 1,
              droppableId: dragging.initial.source.droppableId,
            },
          };

          const duringDrag: MapProps = execute(notDragging.selector)({
            phase: 'DRAGGING',
            drag: dragging.drag(offset, impact),
            pending: null,
            id: notDragging.id,
          });
          const afterDrag: MapProps = execute(notDragging.selector)({
            phase: 'DROP_ANIMATING',
            drag: null,
            pending: dragging.drop({ x: 1, y: 10 }, impact),
            id: notDragging.id,
          });

        // checking that the result objects have the same reference
          expect(duringDrag).to.equal(afterDrag);
        });
      });
    });

    describe('drop complete', () => {
      const dragging = make();
      const notDragging = make();

      describe('item was dragging', () => {
        it('should move to the origin with no animation', () => {
          const expected: MapProps = {
            offset: { x: 0, y: 0 },
            isDropAnimating: false,
            isDragging: false,
            canAnimate: false,
            initial: null,
          };

          const props: MapProps = execute(dragging.selector)({
            phase: 'DROP_COMPLETE',
            drag: null,
            pending: null,
            id: dragging.id,
          });

          expect(props).to.deep.equal(expected);
        });
      });

      describe('item was not dragging', () => {
        it('should move to the origin with no animation', () => {
          const expected: MapProps = {
            offset: { x: 0, y: 0 },
            isDropAnimating: false,
            isDragging: false,
            canAnimate: false,
            initial: null,
          };

          const props: MapProps = execute(notDragging.selector)({
            phase: 'DROP_COMPLETE',
            drag: null,
            pending: null,
            id: notDragging.id,
          });

          expect(props).to.deep.equal(expected);
        });
      });
    });

    describe('other phases', () => {
      it('should return the default props', () => {
        const phases: Phase[] = ['IDLE', 'COLLECTING_DIMENSIONS'];
        const { id, selector } = make();

        phases.forEach((phase: Phase): void => {
          const props: MapProps = execute(selector)({
            phase,
            drag: null,
            pending: null,
            id,
          });

          expect(props).to.deep.equal(defaultMapProps);
        });
      });
    });
  });

  describe('child render behavior', () => {
    class Person extends Component {
      props: {
        name: string,
        provided: Provided
      }

      render() {
        const { provided, name } = this.props;
        return (
          <div
            ref={ref => provided.innerRef(ref)}
            style={provided.draggableStyle}
            {...provided.dragHandleProps}
          >
            hello {name}
          </div>
        );
      }
    }

    class App extends Component {
      props: {
        currentUser: string,
      }

      render() {
        return (
          <Draggable draggableId="drag-1">
            {(provided: Provided) => (
              <Person
                name={this.props.currentUser}
                provided={provided}
              />
            )}
          </Draggable>
        );
      }
    }

    beforeEach(() => {
      sinon.spy(Person.prototype, 'render');
    });

    afterEach(() => {
      Person.prototype.render.restore();
    });

    it('should render the child function when the parent renders', () => {
      const wrapper = mount(<App currentUser="Jake" />, getContextOptions());

      // initial render causes two renders due to setting child ref
      expect(Person.prototype.render.callCount).to.equal(2);
      expect(wrapper.find(Person).props().name).to.equal('Jake');
    });

    it('should render the child function when the parent re-renders', () => {
      const wrapper = mount(<App currentUser="Jake" />, getContextOptions());

      wrapper.update();

      // initial render causes two renders due to setting child ref
      expect(Person.prototype.render.callCount).to.equal(3);
      expect(wrapper.find(Person).props().name).to.equal('Jake');
    });

    it('should render the child function when the parents props changes that cause a re-render', () => {
      const wrapper = mount(<App currentUser="Jake" />, getContextOptions());

      wrapper.setProps({
        currentUser: 'Finn',
      });

      // initial render causes two renders due to setting child ref
      expect(Person.prototype.render.callCount).to.equal(3);
      expect(wrapper.find(Person).props().name).to.equal('Finn');
    });
  });
});
