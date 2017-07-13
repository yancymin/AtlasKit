import {
  akColorB100,
  akColorG400,
  akColorN0,
  akColorN40,
  akColorN200,
  akColorN500,
  akColorN700,
  akColorN800,
  akColorR400,
  akColorY200,
} from '@atlaskit/util-shared-styles';

export const APPEARANCE_ENUM = {
  values: ['error', 'info', 'normal', 'success', 'warning'],
  appearances: {
    error: {
      actionTheme: 'dark',
      backgroundColor: akColorR400,
      titleColor: akColorN0,
      bodyColor: akColorN0,
      focusRingColor: akColorN40,
    },
    info: {
      actionTheme: 'dark',
      backgroundColor: akColorN500,
      titleColor: akColorN0,
      bodyColor: akColorN0,
      focusRingColor: akColorN40,
    },
    normal: {
      actionTheme: 'dark',
      backgroundColor: akColorN0,
      titleColor: akColorN500,
      bodyColor: akColorN500,
      focusRingColor: akColorB100,
    },
    success: {
      actionTheme: 'dark',
      backgroundColor: akColorG400,
      titleColor: akColorN0,
      bodyColor: akColorN0,
      focusRingColor: akColorN40,
    },
    warning: {
      backgroundColor: akColorY200,
      titleColor: akColorN800,
      bodyColor: akColorN700,
      focusRingColor: akColorN200,
    },
  },
  defaultValue: 'normal',
};

export const getAppearance = appearance => APPEARANCE_ENUM.appearances[appearance];
