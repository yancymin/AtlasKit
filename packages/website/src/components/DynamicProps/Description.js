import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const halfGrid = 4;

export default class ReadmeDescription extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return typeof this.props.children === 'string' ?
      <p>{this.props.children}</p> :
      <div style={{ marginTop: 3 * halfGrid }}>{this.props.children}</div>;
  }
}
