/* tslint:disable:variable-name */
import styled, {css} from 'styled-components';
import {akGridSizeUnitless, akColorN0, akColorN300} from '@atlaskit/util-shared-styles';

export const Wrapper = styled.div`

  /* TODO: use mixin to vertically center items */
  display: flex;
  align-items: center;

  flex-grow: 1;

`;

export const IconWrapper = styled.div`
  display: flex;
  margin-right: ${akGridSizeUnitless}px;
`;

export interface TextProps {
  isInversed?: boolean;
}

const textStyles = css`
  color: ${({isInversed}: TextProps) => isInversed ? akColorN0 : akColorN300};
`;

export const Text = styled.span`
  ${textStyles}
`;
