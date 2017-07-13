import styled, { css } from 'styled-components';
import { akColorN600, akColorN300 } from '@atlaskit/util-shared-styles';
import itemSpacing from './constants';

export const Root = styled.div`
  display: inline-block;
`;

export const ButtonContents = styled.div`
  align-items: center;
  display: flex;
  text-decoration: none;
  ${({ isHovered }) => (isHovered && css`
    color: ${akColorN600};
    text-decoration: underline
  `)};
`;

export const Text = styled.span`
  color: ${({ title }) => (title ? akColorN600 : akColorN300)}
  ${({ title }) => (title ? css`font-weight: 500;` : '')}
  padding: 0 ${itemSpacing}px;
`;
