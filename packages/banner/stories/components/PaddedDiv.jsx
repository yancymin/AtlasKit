import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { akGridSize } from '@atlaskit/util-shared-styles';

const buttonPadding = parseInt(akGridSize, 10) * 2;

// eslint-disable-next-line react/prefer-stateless-function
export default class PaddedDiv extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div style={{ padding: buttonPadding }}>
        {this.props.children}
      </div>
    );
  }
}
