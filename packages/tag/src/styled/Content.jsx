import styled, { css } from 'styled-components';
import { akColorB400, akColorN700, akColorR500, akGridSizeUnitless, akHelperMixins } from '@atlaskit/util-shared-styles';
import { buttonWidthUnitless, fontSize, maxTextWidth, maxTextWidthUnitless } from './constants';

// Common styles for Text & Link

const getColor = ({ markedForRemoval }) => (markedForRemoval ? akColorR500 : akColorN700);
const getTruncate = akHelperMixins.text.truncate(({ isRemovable }) => (isRemovable
  ? `${maxTextWidthUnitless - buttonWidthUnitless}px`
  : maxTextWidth
));
const COMMON_STYLES = css`
  color: ${getColor};
  font-size: ${fontSize};
  font-weight: normal;
  line-height: 1;
  margin-left: ${akGridSizeUnitless / 2}px;
  margin-right: ${akGridSizeUnitless / 2}px;
  padding: 2px 0;
  ${getTruncate}
`;
export const Text = styled.span`
  ${COMMON_STYLES}
`;

// Styles exclusive to Link

const getFocusedStyles = ({ isFocused }) => (isFocused ? `color: ${akColorB400}` : null);
export const Link = styled.a`
  ${COMMON_STYLES}
  ${getFocusedStyles}
  text-decoration: none;

  &:hover {
    color: ${akColorB400};
  }
`;
