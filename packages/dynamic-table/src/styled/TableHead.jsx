import styled from 'styled-components';
import { akColorN300 } from '@atlaskit/util-shared-styles';
import { onClickStyle, truncateStyle, arrowsStyle, cellStyle } from './constants';

export const Head = styled.thead`
  border-bottom: 2px solid #DFE1E6;
`;

export const HeadCell = styled.th`
  ${props => onClickStyle(props)}
  ${props => truncateStyle(props)}
  ${props => arrowsStyle(props)}
  ${cellStyle}
  border: none;
  color: ${akColorN300};
  font-size: 12px;
  font-weight: 600;
  position: relative;
  text-align: left;
  vertical-align: top;
`;
