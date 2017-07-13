import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Wrapper from '../styled/Wrapper';

export default class FlagAnimationWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  state = {
    isEntering: false,
    isLeaving: false,
  }

  componentWillEnter(callback) {
    this.setState({ isEntering: true });
    this.runAfterAnimation(callback);
  }

  componentDidEnter() {
    this.setState({ isEntering: false });
  }

  componentWillLeave(callback) {
    this.setState({ isLeaving: true });
    this.runAfterAnimation(callback);
  }

  componentDidLeave() {
    this.setState({ isLeaving: false });
  }

  parentNode = null

  /**
   * componentWillEnter and componentWillLeave provide a callback function which we need to call
   * when our enter/leave animations are complete. This function listens for an animationend event
   * then runs the callback.
   */
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
      <Wrapper
        innerRef={(node) => { this.parentNode = node ? node.parentElement : null; }}
        isEntering={this.state.isEntering}
        isLeaving={this.state.isLeaving}
      >
        {this.props.children}
      </Wrapper>
    );
  }
}
