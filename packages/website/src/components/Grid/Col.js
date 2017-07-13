import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { createResponsiveColumns, SizeType } from './constants';

export default class Col extends PureComponent {
  static contextTypes = {
    xs: SizeType,
    sm: SizeType,
    md: SizeType,
    lg: SizeType,
  }

  render() {
    const { context, props } = this;
    const xs = props.xs || context.xs;
    const sm = props.sm || context.sm;
    const md = props.md || context.md;
    const lg = props.lg || context.lg;

    return (
      <GridCol xs={xs} sm={sm} md={md} lg={lg}>
        {props.children}
      </GridCol>
    );
  }
}
const GridCol = styled.div`
  box-sizing: border-box;
  padding-left: ${akGridSizeUnitless * 2}px;
  padding-right: ${akGridSizeUnitless * 2}px;

  ${props => createResponsiveColumns(props)}
`;
