// @flow
import React, { Component } from 'react';
import { Outer, Inner } from '../styled/MoreIndicator';
import { withPseudoState } from '../hoc';
import { getProps } from '../helpers';
import type { SizeType } from '../types';

/* eslint-disable react/no-unused-prop-types */
type Props = {
  /** Used to override the default border color of the presence indicator.
  Accepts any color argument that the border-color CSS property accepts. */
  borderColor?: string,
  /** The total number excess of avatars */
  count: number,
  /** When true, provides a gutter for the adjacent avatar */
  isStack?: boolean,
  /** Handle user interaction */
  onClick?: () => mixed,
  /** Defines the size of the indicator */
  size?: SizeType,
};
/* eslint-enable react/no-unused-prop-types */

const MAX_DISPLAY_COUNT = 99;

class MoreIndicator extends Component {
  props: Props; // eslint-disable-line react/sort-comp
  render() {
    const { count } = this.props;
    const props = getProps(this);

    // NOTE: wrapping div necessary for Grid to apply styles that don't interfere with Outer
    return (
      <Outer {...props} appearance="circle">
        <Inner {...props} appearance="circle">
          +{count > MAX_DISPLAY_COUNT ? MAX_DISPLAY_COUNT : count}
        </Inner>
      </Outer>
    );
  }
}

export default withPseudoState(MoreIndicator);
