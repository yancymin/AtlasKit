/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AkContainerNavigationNested as NestedNav } from '@atlaskit/navigation';

export default class Groups extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = { selectedIndex: this.props.selectedIndex }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex === this.props.selectedIndex) {
      this.stay();
    } else if (nextProps.selectedIndex > this.props.selectedIndex) {
      this.goToNext();
    } else {
      this.goToPrev();
    }
  }

  isNextEnabled = () => this.state.selectedIndex < (this.props.children.length - 1)
  isPrevEnabled = () => this.state.selectedIndex > 0

  stay = () => {
    this.setState({ animationDirection: undefined });
  }
  goToNext = () => {
    if (!this.isNextEnabled()) return;

    const selectedIndex = Math.min(this.state.selectedIndex + 1, this.props.children.length - 1);

    this.setState({ animationDirection: 'left', selectedIndex });
  }
  goToPrev = () => {
    if (!this.isPrevEnabled()) return;

    const selectedIndex = Math.max(this.state.selectedIndex - 1, 0);

    this.setState({ animationDirection: 'right', selectedIndex });
  }

  render() {
    const { children, selectedIndex } = this.props;
    const { animationDirection } = this.state;

    return (
      <NestedNav animationDirection={animationDirection}>
        {children[selectedIndex]}
      </NestedNav>
    );
  }
}
