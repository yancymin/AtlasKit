// @flow

// 'chromatism' adds 1.9kb to the bundle.
// After the nwb merge it should be able to be tree shaken out for those who are not using it
import chromatism from 'chromatism';
import type { Text, Background, Provided, ItemTheme } from './types';
import * as presets from './presets';

const { global: globalTheme } = presets;

// eslint-disable-next-line import/prefer-default-export
export const createGlobalTheme = (text: Text, background: Background): Provided => {
  const item: ItemTheme = {
    default: {
      background: 'transparent',
    },
    hover: {
      background: chromatism.brightness(-10, background).hex,
    },
    active: {
      background: chromatism.brightness(10, background).hex,
    },
    selected: {
      background: chromatism.brightness(-20, background).hex,
    },
    focus: {
      outline: text,
    },
  };

  // Here we take the default global theme and selectively override some of the customisable values
  // with values based on the function input. We are currently not encouraging the overriding of
  // these default properties.
  const customisedGlobal: Provided = {
    background: {
      primary: background,
      secondary: background,
      tertiary: globalTheme.background.tertiary,
    },
    text,
    subText: chromatism.brightness(20, text).hex,
    keyline: globalTheme.keyline,
    item,
    dropdown: globalTheme.dropdown,
  };

  return customisedGlobal;
};
