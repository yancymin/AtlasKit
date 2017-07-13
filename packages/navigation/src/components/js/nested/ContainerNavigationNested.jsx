// @flow
import React, { PureComponent } from 'react';

import ContainerNavigationNestedPage from './ContainerNavigationNestedPage';
import NestedNavigationWrapper from '../../styled/NestedNavigationWrapper';
import type {
  OnAnimationEnd,
  Stack,
  TraversalDirection,
} from './types';

export default class ContainerNavigationNested extends PureComponent {
  // eslint-disable-next-line react/sort-comp
  props: {|
    /** Callback function which will be executed when the transition animation completes. */
    onAnimationEnd?: OnAnimationEnd,
    /**
     * An array of arrays representing the current state of the nested navigation.
     * The last item is rendered and the other items represent its ancestors in the menu tree.
     */
    stack: Stack,
  |}

  state: {|
    stack: Stack,
    traversalDirection: TraversalDirection,
  |} = {
    stack: this.props.stack,
    traversalDirection: 'down',
  }

  componentWillReceiveProps({ stack }: { stack: Stack }): any {
    const traversalDirection = (() => {
      if (stack.length !== this.props.stack.length) {
        return stack.length < this.props.stack.length ? 'up' : 'down';
      }
      return this.state.traversalDirection;
    })();

    this.setState({ traversalDirection }, () => {
      this.setState({ stack });
    });
  }

  renderChildren = () => (
    <ContainerNavigationNestedPage
      key={this.state.stack.length}
      onAnimationEnd={this.props.onAnimationEnd}
      traversalDirection={this.state.traversalDirection}
    >
      {this.state.stack[this.state.stack.length - 1]}
    </ContainerNavigationNestedPage>
  )

  render() {
    return (
      <NestedNavigationWrapper
        component="div"
        traversalDirection={this.state.traversalDirection}
      >
        {this.renderChildren()}
      </NestedNavigationWrapper>
    );
  }
}
