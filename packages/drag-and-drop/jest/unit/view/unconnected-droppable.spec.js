// @flow
import React, { Component } from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
// eslint-disable-next-line no-duplicate-imports
import type { ReactWrapper } from 'enzyme';
import Droppable from '../../../src/view/droppable/droppable';
import getContextOptions from '../../utils/get-context-options';
import type { DroppableId } from '../../../src/types';
import type { MapProps, OwnProps, Provided, StateSnapshot } from '../../../src/view/droppable/droppable-types';

const getStubber = (stub?: Function = sinon.stub()) =>
  class Stubber extends Component {
    props: {|
      provided: Provided,
      snapshot: StateSnapshot,
    |}
    render() {
      stub({
        provided: this.props.provided,
        snapshot: this.props.snapshot,
      });
      return (
        <div>Hey there</div>
      );
    }
};
const defaultDroppableId: DroppableId = 'droppable-1';
const notDraggingOverMapProps: MapProps = {
  isDraggingOver: false,
};
const isDraggingOverMapProps: MapProps = {
  isDraggingOver: true,
};

// $ExpectError - not providing children
const defaultOwnProps: OwnProps = {
  droppableId: defaultDroppableId,
  isDropDisabled: false,
};

type MountArgs = {|
  WrappedComponent: any,
  ownProps?: OwnProps,
  mapProps?: MapProps,
|}

const mountDroppable = ({
  WrappedComponent,
  ownProps = defaultOwnProps,
  mapProps = notDraggingOverMapProps,
}: MountArgs = {}): ReactWrapper => mount(
  <Droppable
    {...ownProps}
    {...mapProps}
  >
    {(provided: Provided, snapshot: StateSnapshot) => (
      <WrappedComponent provided={provided} snapshot={snapshot} />
      )}
  </Droppable>
, getContextOptions());

describe('Droppable - unconnected', () => {
  it('should provide the props to its children', () => {
    const props: MapProps[] = [
      notDraggingOverMapProps, isDraggingOverMapProps,
    ];

    props.forEach((mapProps: MapProps) => {
      const stub = sinon.stub();

      mountDroppable({
        mapProps,
        WrappedComponent: getStubber(stub),
      });

      const provided: Provided = stub.args[0][0].provided;
      const snapshot: StateSnapshot = stub.args[0][0].snapshot;
      expect(provided.innerRef).to.be.a('function');
      expect(snapshot.isDraggingOver).to.equal(mapProps.isDraggingOver);
    });
  });
});
