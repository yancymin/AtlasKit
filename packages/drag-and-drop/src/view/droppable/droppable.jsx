import React, { Component } from 'react';
import type { Props, Provided, StateSnapshot, DefaultProps } from './droppable-types';
import type { HTMLElement } from '../../types';
import { DroppableDimensionPublisher } from '../dimension-publisher/';

type State = {|
  ref: ?HTMLElement,
|}

export default class Droppable extends Component {
  /* eslint-disable react/sort-comp */
  props: Props
  state: State

  state: State = {
    ref: null,
  }

  static defaultProps: DefaultProps = {
    type: 'DEFAULT',
    isDropDisabled: false,
  }
  /* eslint-enable */

  // React calls ref callback twice for every render
  // https://github.com/facebook/react/pull/8333/files
  setRef = (ref: ?HTMLElement) => {
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
  }

  render() {
    const provided: Provided = {
      innerRef: this.setRef,
    };
    const snapshot: StateSnapshot = {
      isDraggingOver: this.props.isDraggingOver,
    };

    return (
      <DroppableDimensionPublisher
        itemId={this.props.droppableId}
        type={this.props.type}
        targetRef={this.state.ref}
      >
        {this.props.children(provided, snapshot)}
      </DroppableDimensionPublisher>
    );
  }
}
