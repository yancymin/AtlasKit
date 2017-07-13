// @flow
import React, { PureComponent } from 'react';
import Drawer from '../Drawer';
import { createIconOffset } from '../../../shared-variables';
import type { DrawerProps } from '../../../types';

/*
NOTE: All drawers mirror each other in design, with the only difference
being the offset.
*/
export default class CreateDrawer extends PureComponent {
  props: DrawerProps

  render() {
    return (
      <Drawer
        iconOffset={createIconOffset}
        backIconOffset={createIconOffset}
        width={this.props.isFullWidth ? 'full' : 'narrow'}
        {...this.props}
      />
    );
  }
}
