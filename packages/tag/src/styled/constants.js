import { akBorderRadius, akFontSizeDefault, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

export const borderRadius = akBorderRadius;
export const fontSize = akFontSizeDefault;

export const tagHeightUnitless = 2.5 * akGridSizeUnitless;
export const tagHeight = `${tagHeightUnitless}px`;
export const buttonWidthUnitless = tagHeightUnitless; // button should be square
export const buttonWidth = tagHeight; // button should be square
export const maxWidthUnitless = 25 * akGridSizeUnitless;
export const maxWidth = `${maxWidthUnitless}px`;
export const maxTextWidthUnitless = maxWidthUnitless - tagHeightUnitless;
export const maxTextWidth = `${maxTextWidthUnitless}px`;
