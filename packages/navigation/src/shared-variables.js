// @flow

import {
  akColorB200,
  akColorPrimary3,
  akGridSizeUnitless,
  akZIndexBlanket,
  akZIndexNavigation,
} from '@atlaskit/util-shared-styles';

/**
* NOTE: changing the width of the Navigation is considered a breaking change
*/

export const gridSize: number = akGridSizeUnitless;

export const layout = {
  padding: {
    top: gridSize * 3,
    bottom: gridSize * 3,
    side: gridSize,
  },
  width: {
    closed: 64,
  },
};

export const globalItemSizes = {
  small: gridSize * 4,
  medium: gridSize * 5,
  large: gridSize * 6,
};

export const drawerOffset = gridSize * 2;
export const globalOpenWidth = layout.width.closed;
export const containerClosedWidth = globalOpenWidth;
export const containerOpenWidth = 240;
export const standardOpenWidth = globalOpenWidth + containerOpenWidth;
export const resizeClosedBreakpoint = globalOpenWidth + (containerOpenWidth / 2);
export const collapseBreakpoint = globalOpenWidth + containerClosedWidth;
export const searchIconOffset = 80;
export const createIconOffset = 120;
export const animationTimeUnitless = 200;
export const animationTime = `${animationTimeUnitless}ms`;
export const resizeAnimationTime = animationTime;
export const nestedNavigationAnimationTime: number = 500;
export const zIndex = {
  base: akZIndexNavigation,
  // needs to sit on top of navigation and the drawer
  drawer: akZIndexBlanket + 1,
};

// these are colors that are currently not controllable via theming
export const unthemedColors = {
  resizer: akColorB200,
  presenceIconBg: akColorPrimary3,
};

export const globalPrimaryActions = (() => {
  const itemSizes = {
    medium: gridSize * 5,
  };

  const margin = {
    bottom: gridSize * 3.5,
  };

  const innerHeight = itemSizes.medium * 3;

  const height = {
    inner: innerHeight,
    outer: margin.bottom + innerHeight,
  };

  return {
    height,
    margin,
    itemSizes,
  };
})();

export const globalSecondaryActions = (() => {
  const itemSizes = {
    medium: 1 + (gridSize * 5),
  };

  const margin = {
    bottom: gridSize * 3,
  };

  const height = (actionCount) => {
    const innerHeight = itemSizes.medium * actionCount;
    return {
      inner: innerHeight,
      outer: margin.bottom + innerHeight,
    };
  };

  return {
    height,
    margin,
    itemSizes,
  };
})();

export const item = {
  borderRadius: 3,
  width: {
    compact: gridSize * 4.5,
    standard: gridSize * 5,
  },
};

export const search = {
  layout: {
    padding: {
      top: gridSize * 0.5,
      bottom: 0,
      side: gridSize * 3,
    },
    margin: {
      top: 0,
      bottom: gridSize * 3,
      side: 0,
    },
    /**
     * Restore the height setting that was lost due to the ClearButton no longer being there to
     * stretch the box. (this height aligns it nicely with the back button in drawers)
     */
    height: gridSize * 4,
  },
};
