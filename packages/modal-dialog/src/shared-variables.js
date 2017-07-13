import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

export const modalShadowInnerSize = 2; // 2px
export const modalBorderRadius = akGridSizeUnitless / 2; // 4px
export const WIDTH_ENUM = {
  values: ['small', 'medium', 'large', 'x-large'],
  widths: {
    small: akGridSizeUnitless * 50, // 400px
    medium: akGridSizeUnitless * 75, // 600px
    large: akGridSizeUnitless * 100, // 800px
    'x-large': akGridSizeUnitless * 121, // 968px
  },
  defaultValue: 'medium',
};
export const modalAnimationDuration = 0.25;
