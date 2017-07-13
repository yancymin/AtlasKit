// @flow
import React, { PureComponent } from 'react';
import { DEFAULT_BORDER_COLOR } from '../styled/constants';
import { Outer } from '../styled/Icon';
import getStatusSVG from '../helpers/getStatusSVG';
import type { ChildrenType, StatusType, SizeType } from '../types';

type Props = {
  /** Used to override the default border color of the status indicator.
  Accepts any color argument that the border-color CSS property accepts. */
  borderColor?: string,
  /** Content to use as a custom status indicator (usually not required if
  consuming Status separate to Avatar). */
  children?: ChildrenType,
  /** Content to use as a custom status indicator (usually not required if
  consuming Status separate to Avatar). */
  status?: StatusType,
  /** Defines the size of the status. */
  size?: SizeType,
};

export default class Status extends PureComponent {
  props: Props; // eslint-disable-line react/sort-comp

  static defaultProps = {
    borderColor: DEFAULT_BORDER_COLOR,
  }

  render() {
    const { borderColor, children, status, size } = this.props;

    return (
      <Outer size={size} bgColor={borderColor}>
        {children || (status && getStatusSVG(status))}
      </Outer>
    );
  }
}
