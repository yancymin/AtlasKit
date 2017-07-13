import styled from 'styled-components';
import { akColorN40, akColorN500, akColorB200 } from '@atlaskit/util-shared-styles';
import { getBorderRadius, getInnerStyles } from './utils';
import { BORDER_WIDTH, EXCESS_INDICATOR_FONT_SIZE } from './constants';

export const Outer = styled.button`
  ${getInnerStyles}
  background: 0;
`;

export const Inner = styled.span`
  background-color: ${akColorN40};
  border-radius: ${getBorderRadius}
  align-items: center;
  box-shadow: 0 0 0 ${props => ((props.isFocus && !props.isActive) ? `${BORDER_WIDTH[props.size]}px` : 0)} ${akColorB200};
  color: ${akColorN500};
  cursor: pointer;
  display: flex;
  flex: 1;
  font-size: ${props => EXCESS_INDICATOR_FONT_SIZE[props.size]}px;
  justify-content: center;
  transition: box-shadow 200ms;
`;
