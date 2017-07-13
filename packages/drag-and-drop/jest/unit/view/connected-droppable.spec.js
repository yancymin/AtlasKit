// @flow
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Droppable, { makeSelector } from '../../../src/view/droppable/connected-droppable';
import noImpact from '../../../src/state/no-impact';
import getDimension from '../../utils/get-dimension-util';
import getContextOptions from '../../utils/get-context-options';
import type {
  Phase,
  DragState,
  PendingDrop,
  Position,
  DraggableId,
  DroppableId,
  InitialDrag,
  DragImpact,
  DropResult,
  CurrentDrag,
  Dimension,
} from '../../../src/types';
import type { MapProps, Provided } from '../../../src/view/droppable/droppable-types';

type SelectorArgs = {|
  id: DroppableId,
  phase: Phase,
  drag: ?DragState,
  pending: ?PendingDrop,
  isDropDisabled?: boolean
|}

const execute = (selector: Function) =>
  ({ phase, drag, pending, id, isDropDisabled = false }: SelectorArgs) =>
    selector.resultFunc(
      phase, drag, pending, id, isDropDisabled,
    );

const defaultMapProps: MapProps = {
  isDraggingOver: false,
};

const droppableId: DroppableId = 'drop-1';
const draggableId: DraggableId = 'drag-1';

type DragArgs = {|
  isDraggingOver: boolean
|}

const perform = (() => {
  const dragDimension: Dimension = getDimension({
    top: 100,
    left: 0,
    right: 100,
    bottom: 200,
  });
  const initial: InitialDrag = {
    source: {
      index: 0,
      droppableId,
    },
    center: dragDimension.center,
    selection: dragDimension.center,
    dimension: dragDimension,
  };
  const offset: Position = {
    x: 10,
    y: 20,
  };
  const center: Position = {
    x: initial.center.x + offset.x,
    y: initial.center.y + offset.y,
  };
  const current: CurrentDrag = {
    id: draggableId,
    type: 'TYPE',
    offset,
    center,
    shouldAnimate: true,
  };

  const dragOverImpact: DragImpact = {
    movement: {
      draggables: [draggableId],
      amount: dragDimension.withMargin.height,
      isMovingForward: true,
    },
    destination: {
      index: initial.source.index + 1,
      droppableId,
    },
  };

  const drag = ({ isDraggingOver }: DragArgs): DragState => {
    const state: DragState = {
      current,
      impact: isDraggingOver ? dragOverImpact : noImpact,
      initial,
    };
    return state;
  };

  const drop = ({ isDraggingOver }: DragArgs): PendingDrop => {
    // some made up position
    const newHomeOffset: Position = {
      x: 100,
      y: 20,
    };

    const result: DropResult = {
      draggableId,
      source: initial.source,
      destination: {
        index: initial.source.index + 1,
        droppableId: initial.source.droppableId,
      },
    };

    const pending: PendingDrop = {
      newHomeOffset,
      result,
      last: drag({ isDraggingOver }),
    };

    return pending;
  };

  return { drag, drop };
})();

describe('Droppable - connected', () => {
  describe('selector', () => {
    beforeEach(() => {
      sinon.stub(console, 'error');
    });

    afterEach(() => {
      console.error.restore();
    });

    describe('dropping is disabled', () => {
      const phases: Phase[] = ['IDLE', 'COLLECTING_DIMENSIONS', 'DRAGGING', 'DROP_ANIMATING', 'DROP_COMPLETE'];

      it('should always return the default props', () => {
        phases.forEach((phase: Phase) => {
          const props: MapProps = execute(makeSelector())({
            phase,
            drag: null,
            pending: null,
            id: droppableId,
            isDropDisabled: true,
          });

          expect(props).to.deep.equal(defaultMapProps);
        });
      });

      it('should not break memoization on multiple calls', () => {
        phases.forEach((phase: Phase) => {
          const selector = makeSelector();

          const first: MapProps = execute(selector)({
            phase,
            drag: null,
            pending: null,
            id: droppableId,
          });
          const second: MapProps = execute(selector)({
            phase,
            drag: null,
            pending: null,
            id: droppableId,
          });

        // checking object equality
          expect(first).to.equal(second);
        });
      });
    });

    describe('while dragging', () => {
      it('should log an error an return the default props if no drag is available', () => {
        const props: MapProps = execute(makeSelector())({
          phase: 'DRAGGING',
          drag: null,
          pending: null,
          id: droppableId,
        });

        expect(props).to.deep.equal(defaultMapProps);
        expect(console.error.called).to.equal(true);
      });

      describe('dragging over', () => {
        it('should return that it is dragging over', () => {
          const expected: MapProps = {
            isDraggingOver: true,
          };

          const props: MapProps = execute(makeSelector())({
            phase: 'DRAGGING',
            drag: perform.drag({ isDraggingOver: true }),
            pending: null,
            id: droppableId,
          });

          expect(props).to.deep.equal(expected);
        });

        it('should not break memoization on multiple drags', () => {
          const selector = makeSelector();
          const expected: MapProps = {
            isDraggingOver: true,
          };

          const props1: MapProps = execute(selector)({
            phase: 'DRAGGING',
            drag: perform.drag({ isDraggingOver: true }),
            pending: null,
            id: droppableId,
          });
          const props2: MapProps = execute(selector)({
            phase: 'DRAGGING',
            drag: perform.drag({ isDraggingOver: true }),
            pending: null,
            id: droppableId,
          });

        // checking object equality
          expect(props1).to.equal(props2);
          expect(props1).to.deep.equal(expected);
          expect(props2).to.deep.equal(expected);
        });
      });

      describe('not dragging over', () => {
        it('should return that it is not dragging over', () => {
          const expected: MapProps = {
            isDraggingOver: false,
          };

          const props: MapProps = execute(makeSelector())({
            phase: 'DRAGGING',
            drag: perform.drag({ isDraggingOver: false }),
            pending: null,
            id: droppableId,
          });

          expect(props).to.deep.equal(expected);
        });

        it('should not break memoization on multiple drags', () => {
          const selector = makeSelector();
          const expected: MapProps = {
            isDraggingOver: false,
          };

          const props1: MapProps = execute(selector)({
            phase: 'DRAGGING',
            drag: perform.drag({ isDraggingOver: false }),
            pending: null,
            id: droppableId,
          });
          const props2: MapProps = execute(selector)({
            phase: 'DRAGGING',
            drag: perform.drag({ isDraggingOver: false }),
            pending: null,
            id: droppableId,
          });

        // checking object equality
          expect(props1).to.equal(props2);
          expect(props1).to.deep.equal(expected);
          expect(props2).to.deep.equal(expected);
        });
      });
    });

    describe('while drop animating', () => {
      it('should log an error an return the default props if no pending drop is available', () => {
        const props: MapProps = execute(makeSelector())({
          phase: 'DROP_ANIMATING',
          drag: null,
          pending: null,
          id: droppableId,
        });

        expect(props).to.deep.equal(defaultMapProps);
        expect(console.error.called).to.equal(true);
      });

      describe('dragging over', () => {
        it('should return that it is dragging over', () => {
          const expected: MapProps = {
            isDraggingOver: true,
          };

          const props: MapProps = execute(makeSelector())({
            phase: 'DROP_ANIMATING',
            drag: null,
            pending: perform.drop({ isDraggingOver: true }),
            id: droppableId,
          });

          expect(props).to.deep.equal(expected);
        });

        it('should not break memoization from a previous DRAGGING phase', () => {
          const selector = makeSelector();
          const expected: MapProps = {
            isDraggingOver: true,
          };

          const dragging: MapProps = execute(selector)({
            phase: 'DRAGGING',
            drag: perform.drag({ isDraggingOver: true }),
            pending: null,
            id: droppableId,
          });
          const dropAnimating: MapProps = execute(selector)({
            phase: 'DROP_ANIMATING',
            drag: null,
            pending: perform.drop({ isDraggingOver: true }),
            id: droppableId,
          });

          expect(dragging).to.deep.equal(expected);
          expect(dropAnimating).to.deep.equal(expected);
        // checking object equality
          expect(dragging).to.equal(dropAnimating);
        });
      });

      describe('not dragging over', () => {
        it('should return that it is not dragging over', () => {
          const expected: MapProps = {
            isDraggingOver: false,
          };

          const props: MapProps = execute(makeSelector())({
            phase: 'DROP_ANIMATING',
            drag: null,
            pending: perform.drop({ isDraggingOver: false }),
            id: droppableId,
          });

          expect(props).to.deep.equal(expected);
        });

        it('should not break memoization from a previous DRAGGING phase', () => {
          const selector = makeSelector();
          const expected: MapProps = {
            isDraggingOver: false,
          };

          const dragging: MapProps = execute(selector)({
            phase: 'DRAGGING',
            drag: perform.drag({ isDraggingOver: false }),
            pending: null,
            id: droppableId,
          });
          const dropAnimating: MapProps = execute(selector)({
            phase: 'DROP_ANIMATING',
            drag: null,
            pending: perform.drop({ isDraggingOver: false }),
            id: droppableId,
          });

          expect(dragging).to.deep.equal(expected);
          expect(dropAnimating).to.deep.equal(expected);
        // checking object equality
          expect(dragging).to.equal(dropAnimating);
        });
      });
    });

    describe('other phases', () => {
      const other: Phase[] = ['IDLE', 'COLLECTING_DIMENSIONS', 'DROP_COMPLETE'];

      it('should return the default props', () => {
        const selector = makeSelector();

        other.forEach((phase: Phase): void => {
          const props: MapProps = execute(selector)({
            phase,
            drag: null,
            pending: null,
            id: droppableId,
          });

          expect(props).to.deep.equal(defaultMapProps);
        });
      });

      it('should not break memoization on multiple calls', () => {
        const selector = makeSelector();

        other.forEach((phase: Phase): void => {
          const first: MapProps = execute(selector)({
            phase,
            drag: null,
            pending: null,
            id: droppableId,
          });
          const second: MapProps = execute(selector)({
            phase,
            drag: null,
            pending: null,
            id: droppableId,
          });

          expect(first).to.deep.equal(defaultMapProps);
          expect(second).to.deep.equal(defaultMapProps);
        // checking object equality
          expect(first).to.equal(second);
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
          <div ref={ref => provided.innerRef(ref)}>
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
          <Droppable droppableId="drop-1">
            {(provided: Provided) => (
              <Person
                name={this.props.currentUser}
                provided={provided}
              />
            )}
          </Droppable>
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
