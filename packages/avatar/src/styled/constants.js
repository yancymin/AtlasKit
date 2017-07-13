// @flow
import { akColorPrimary3, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

export const DEFAULT_BORDER_COLOR = akColorPrimary3;
export const TRANSITION_DURATION = '200ms';

export const AVATAR_SIZES: {
  xsmall: number,
  small: number,
  medium: number,
  large: number,
  xlarge: number,
  xxlarge: number,
} = {
  xsmall: akGridSizeUnitless * 2,
  small: akGridSizeUnitless * 3,
  medium: akGridSizeUnitless * 4,
  large: akGridSizeUnitless * 5,
  xlarge: akGridSizeUnitless * 12,
  xxlarge: akGridSizeUnitless * 16,
};

// border radius only applies to "square" avatars
export const AVATAR_RADIUS: {
  xsmall: number,
  small: number,
  medium: number,
  large: number,
  xlarge: number,
  xxlarge: number,
} = {
  xsmall: 2,
  small: 2,
  medium: 3,
  large: 3,
  xlarge: 6,
  xxlarge: 12,
};

export const BORDER_WIDTH: {
  xsmall: number,
  small: number,
  medium: number,
  large: number,
  xlarge: number,
  xxlarge: number,
} = {
  xsmall: 2,
  small: 2,
  medium: 2,
  large: 3,
  xlarge: 3,
  xxlarge: 3,
};

// NOTE: sizes xsmall & xxlarge DO NOT support
// - groups
// - presence
// - status

export const EXCESS_INDICATOR_FONT_SIZE: {
  small: number,
  medium: number,
  large: number,
  xlarge: number,
} = {
  small: 10,
  medium: 11,
  large: 12,
  xlarge: 16,
};

export const ICON_SIZES: {
  small: number,
  medium: number,
  large: number,
  xlarge: number,
} = {
  small: 10,
  medium: 12,
  large: 15,
  xlarge: 18,
};

export const ICON_OFFSET: {
  small: number,
  medium: number,
  large: number,
  xlarge: number,
} = {
  small: 0,
  medium: 0,
  large: 1,
  xlarge: 7,
};
