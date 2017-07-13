import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import SpacerInner from '../styled/SpacerInner';

export default class Spacer extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    shouldAnimate: PropTypes.bool,
    children: PropTypes.node,
  }
  static defaultProps = {
    width: 0,
    shouldAnimate: false,
  }
  render() {
    return (
      <SpacerInner
        shouldAnimate={this.props.shouldAnimate}
        style={{
          width: this.props.width,
        }}
      >
        {this.props.children}
      </SpacerInner>
    );
  }
}
