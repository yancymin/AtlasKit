import {CardAppearance} from '..';

// Default dimensions

export const defaultSmallCardDimensions = {
  width: 200,
  height: 42
};

export const defaultImageCardDimensions = {
  width: 156,
  height: 116
};

export const defaultHorizontalCardDimensions = {
  width: 435,
  height: 116
};

export const defaultSquareCardDimensions = {
  width: 300,
  height: 300
};

// Small dimensions

export const minSmallCardDimensions = {
  height: 32
};

export const minImageCardDimensions = {
  width: 144,
  height: 96
};

// Max dimensions

export const maxImageCardDimensions = {
  width: 480,
  height: 360
};

export const getCardMinHeight = (appearance?: CardAppearance) => {
  if (appearance === 'small') {
    return minSmallCardDimensions.height;
  }

  if (appearance === 'image') {
    return minImageCardDimensions.height;
  }

  if (appearance === 'horizontal') {
    return defaultHorizontalCardDimensions.height;
  }

  if (appearance === 'square') {
    return defaultSquareCardDimensions.height;
  }

  return minSmallCardDimensions.height;
};
