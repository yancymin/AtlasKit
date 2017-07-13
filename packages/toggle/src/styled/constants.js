import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const dimensions = {
  regular: {
    height: akGridSizeUnitless * 2,
    width: akGridSizeUnitless * 4,
  },
  large: {
    height: (akGridSizeUnitless * 2) + (akGridSizeUnitless / 2),
    width: akGridSizeUnitless * 5,
  },
};

export const borderWidth = '2px';
export const paddingUnitless = akGridSizeUnitless / 4;
export const transition = '0.2s';

export const getHeight = ({ size }) => dimensions[size].height;
export const getWidth = ({ size }) => dimensions[size].width;
