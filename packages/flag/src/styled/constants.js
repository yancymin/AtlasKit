import { css } from 'styled-components';
import { akColorB100, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

export const flagWidthUnitless = akGridSizeUnitless * 50;
export const flagWidth = `${flagWidthUnitless}px`;

export const focusRingMixin = css`
  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 2px ${akColorB100};
  }
`;
