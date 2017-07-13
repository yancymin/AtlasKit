// @flow
import React, { PureComponent } from 'react';

import NestedNavigationPage from '../../styled/NestedNavigationPage';
import type { ContainerNestedNavigationPageState, OnAnimationEnd, ReactElement, TraversalDirection } from './types';

export default class ContainerNavigationNestedPage extends PureComponent {
  // eslint-disable-next-line react/sort-comp
  props: {|
    /** The items to display in this level of the menu */
    children: ReactElement,
    /** Callback function which will be executed when the transition animation completes. */
    onAnimationEnd?: OnAnimationEnd,
    /** The direction in which we're traversing through the nested navigation ('up' or 'down'). */
    traversalDirection: TraversalDirection,
  |}

  state: ContainerNestedNavigationPageState = {
    isEntering: false,
    isLeaving: false,
  }

  parentNode: ?Node

  componentWillEnter(callback: () => void) {
    this.setState({ isEntering: true, isLeaving: false });
    this.runAfterAnimation(callback);
  }

  componentDidEnter() {
    this.setState({ isEntering: false });
  }

  componentWillLeave(callback: () => void) {
    this.setState({ isEntering: false, isLeaving: true });
    this.runAfterAnimation(callback);
  }

  componentDidLeave() {
    this.setState({ isLeaving: false });

    if (this.props.onAnimationEnd) {
      this.props.onAnimationEnd({
        traversalDirection: this.props.traversalDirection,
      });
    }
  }

  runAfterAnimation = (callback: () => void) => {
    const { parentNode } = this;

    function executeCallback() {
      callback();
      return parentNode && parentNode.removeEventListener('animationend', executeCallback);
    }

    return parentNode && parentNode.addEventListener('animationend', executeCallback);
  }

  render() {
    return (
      <NestedNavigationPage
        isEntering={this.state.isEntering}
        isLeaving={this.state.isLeaving}
        traversalDirection={this.props.traversalDirection}
        innerRef={(node: Node) => { this.parentNode = node ? node.parentElement : null; }}
      >
        {this.props.children}
      </NestedNavigationPage>
    );
  }
}
