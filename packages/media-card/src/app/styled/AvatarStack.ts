/* tslint:disable:variable-name */
import styled, { css } from 'styled-components';
import { akGridSizeUnitless, akFontFamily, akColorN20, akColorN500 } from '@atlaskit/util-shared-styles';

// copied from @atlaskit/avatar
export const AVATAR_SIZES = {
  xsmall: akGridSizeUnitless * 2,
  small: akGridSizeUnitless * 3,
  medium: akGridSizeUnitless * 4,
  large: akGridSizeUnitless * 6,
  xlarge: akGridSizeUnitless * 12,
};

const borderWidth = 3;

export const StackWrapper = styled.div`
  display: inline-flex;
  flex-direction: row-reverse;
`;

export interface ItemWrapperProps {
  borderColor: string;
}

export const ItemWrapper = styled.div`
  background-color: ${({ borderColor }: ItemWrapperProps) => borderColor};
  border-radius: 100%;
  display: flex;
  padding: ${borderWidth}px;
  position: relative;

  /* overlap the avatars */
  & + & {
    margin-right: -${(akGridSizeUnitless / 2) + borderWidth}px;
  }

`;

export interface MoreAvatarProps {
  avatarSize: 'small' | 'medium';
}

export const MoreAvatar = styled.div`
  align-items: center;
  background-color: ${akColorN20};
  border-radius: 100%;
  color: ${akColorN500};
  display: flex;
  font-family: ${akFontFamily};
  font-size: 11px;
  justify-content: center;
  margin-right: -7px;

  ${({ avatarSize }: MoreAvatarProps) => css`
    height: ${AVATAR_SIZES[avatarSize]}px;
    width: ${AVATAR_SIZES[avatarSize]}px;
  `}

`;
