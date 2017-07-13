import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import DrawerBackIconInner from '../styled/DrawerBackIconInner';
import DrawerBackIconOuter from '../styled/DrawerBackIconOuter';

export default class DrawerBackIcon extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isVisible: PropTypes.bool,
  };

  static defaultProps = {
    isVisible: false,
  }

  render() {
    const {
      children,
      isVisible,
    } = this.props;
    return (
      <DrawerBackIconOuter>
        <DrawerBackIconInner isVisible={isVisible}>{children}</DrawerBackIconInner>
      </DrawerBackIconOuter>
    );
  }
}
