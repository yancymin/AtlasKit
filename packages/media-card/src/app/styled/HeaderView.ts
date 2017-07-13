/* tslint:disable:variable-name */
import styled from 'styled-components';
import {akGridSizeUnitless, akColorN0, akColorN900} from '@atlaskit/util-shared-styles';
import {ellipsis} from '../../styles';

const largeMarginSize = akGridSizeUnitless * 2;

export interface WrapperProps {
  contentMaxWidth: number;
  hasSiblings: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: ${({contentMaxWidth}: WrapperProps) => contentMaxWidth}px;
  height: 18px;
  margin: ${largeMarginSize}px ${largeMarginSize}px ${({hasSiblings}: WrapperProps) => hasSiblings && '12px' || `${largeMarginSize}px`} ${largeMarginSize}px;
`;

export const User = styled.div`
  display: flex;
  margin-right: ${largeMarginSize}px;
`;

export interface TitleProps {
  isInversed?: boolean;
}

export const Title = styled.div`
  flex: 1;
  color: ${({isInversed}: TitleProps) => isInversed ? akColorN0 : akColorN900};
  font-size: 14px;
  font-weight: 500;
  ${ellipsis()}
`;
