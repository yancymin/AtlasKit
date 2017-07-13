import {
    akColorB100,
    akColorB400,
    akColorB500,
    akColorN20,
    akColorN30A,
    akColorN70,
    akColorN40,
    akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';

export const borderWidth = 1; // 1
export const borderWidthFocus = 2; // 2

// Full size
export const fullHeight = akGridSizeUnitless * 1.5; // 12
export const fullWidth = akGridSizeUnitless * 1.5; // 12

// Minus border width
export const height = fullHeight - (2 * borderWidth); // 10
export const width = fullWidth - (2 * borderWidth); // 10

// Horizontal padding around icon
export const maxIconWidth = fullWidth + (borderWidthFocus * 2); // 16
export const iconHorizontalPadding = ((3 * width) - maxIconWidth) / 2; // 7

// Size of inner selection circle
export const innerWidth = akGridSizeUnitless / 2; // 4
export const innerHeight = akGridSizeUnitless / 2; // 4

// Colors
export const backgroundColor = akColorN20;
export const borderColor = akColorN30A;
export const selectedColor = 'white';

export const backgroundColorFocus = akColorN20;
export const borderColorFocus = akColorB100;

export const backgroundColorHover = akColorN40;
export const borderColorHover = akColorN70;

export const backgroundColorSelected = akColorB400;
export const borderColorSelected = akColorB400;

export const backgroundColorSelectedHover = akColorB500;
export const borderColorSelectedHover = akColorB500;
