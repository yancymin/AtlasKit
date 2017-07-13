// @flow
import React, { PureComponent } from 'react';
import Drawer from '../Drawer';
import { searchIconOffset } from '../../../shared-variables';
import type { DrawerProps } from '../../../types';

/*
NOTE: All drawers mirror each other in design, with the only difference
being the offset.
*/
export default class CustomDrawer extends PureComponent {
  static defaultProps = {
    width: 'wide',
  }

  props: DrawerProps

  render() {
    return (
      <Drawer
        iconOffset={searchIconOffset}
        backIconOffset={searchIconOffset}
        {...this.props}
      />
    );
  }
}
