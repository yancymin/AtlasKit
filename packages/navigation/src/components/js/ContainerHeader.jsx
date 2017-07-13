import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ContainerHeaderWrapper from '../styled/ContainerHeaderWrapper';

export default class ContainerHeader extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isContentScrolled: PropTypes.bool,
  }

  static defaultProps = {
    isContentScrolled: false,
  }

  render() {
    return (
      <ContainerHeaderWrapper
        isContentScrolled={this.props.isContentScrolled}
      >
        {this.props.children}
      </ContainerHeaderWrapper>
    );
  }
}
