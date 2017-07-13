import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { SizeType } from './constants';

export default class Row extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    lg: SizeType,
    md: SizeType,
    sm: SizeType,
    xs: SizeType,
  }
  static childContextTypes = {
    xs: SizeType,
    sm: SizeType,
    md: SizeType,
    lg: SizeType,
  }
  static defaultProps = {
    xs: 'one-whole',
  }
  getChildContext() {
    const { xs, sm, md, lg } = this.props;

    return { xs, sm, md, lg };
  }
  render() {
    return <GridRow>{this.props.children}</GridRow>;
  }
}
const GridRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -${akGridSizeUnitless * 2}px;
  margin-right: -${akGridSizeUnitless * 2}px;
`;
