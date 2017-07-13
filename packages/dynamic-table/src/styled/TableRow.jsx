import styled from 'styled-components';
import { akColorN10 } from '@atlaskit/util-shared-styles';
import { onClickStyle, truncateStyle, cellStyle } from './constants';

export const TableBodyRow = styled.tr`
  ${props => onClickStyle(props)}
  &:hover {
    background: ${akColorN10};
  }
`;

export const TableBodyCell = styled.td`
  ${props => onClickStyle(props)}
  ${props => truncateStyle(props)}
  ${cellStyle}
`;
