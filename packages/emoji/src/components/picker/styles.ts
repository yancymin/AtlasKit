import { style } from 'typestyle';
import {
  akBorderRadius,
  akColorB100,
  akColorB300,
  akColorN100A,
  akColorN200,
  akColorN30,
  akColorN30A,
  akColorN50,
  akColorN900,
} from '@atlaskit/util-shared-styles';

import {
  akEmojiSelectedBackgroundColor,
  emojiFooterBoxShadow,
  emojiPickerBorderColor,
  emojiPickerBoxShadow,
} from '../../shared-styles';

import {
  emojiPickerHeight,
  emojiPickerWidth,
} from '../../constants';

export const active = 'active';
export const disable = 'disable';

// Level 1 - picker

export const emojiPicker = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: 'white',
  border: `${emojiPickerBorderColor} 1px solid`,
  borderRadius: akBorderRadius,
  boxShadow: emojiPickerBoxShadow,
  height: `${emojiPickerHeight}px`,
  width: `${emojiPickerWidth}px`,
  marginBottom: '8px',
});

// Level 2

/// Category Selector

export const addButton = 'add-button';

export const categorySelector = style({
  flex: '0 0 auto',
  backgroundColor: akColorN30,

  $nest: {
    ul: {
      listStyle: 'none',
      margin: '0 3px',
      padding: '3px 0',
    },

    li: {
      display: 'inline-block',
      margin: 0,
      padding: 0,
      verticalAlign: 'middle',
    },

    [`.${addButton}`]: {
      color: akColorN200,
      margin: '0 0 0 5px',
      verticalAlign: 'middle',
    },
  },
});

export const category = style({
  backgroundColor: 'transparent',
  border: 0,
  color: akColorN100A,
  cursor: 'pointer',
  margin: '0 3px 0 4px',
  padding: 0,
  transition: 'color 0.2s ease',

  $nest: {
    /* Firefox */
    ['&::-moz-focus-inner']: {
      border: '0 none',
      padding: 0,
    },

    [`&.${active}`]: {
      color: akColorB300,

      $nest: {
        ['&:hover']: {
          color: akColorB300,
        },
      },
    },

    ['&:hover']: {
      color: akColorB100,
    },

    [`&.${disable}`]: {
      color: akColorN50,
      cursor: 'default',

      $nest: {
        ['&:hover']: {
          color: akColorN50,
        },
      },
    },

    ['&:focus']: {
      outline: '0',
    },
  },
});

/// EmojiPickerList

export const emojiPickerList = style({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
});

// react-virtualized enables focus style by default - turn it off
export const virtualList = style({
  $nest: {
    '&:focus': {
      outline: 'none',
    }
  }
});

//// Search

export const searchIcon = 'search-icon';
export const input = 'input';

export const pickerSearch = style({
  boxSizing: 'border-box',
  padding: '10px 25px 10px 8px',
  flex: '0 0 auto',

  $nest: {
    [`.${searchIcon}`]: {
      opacity: .5,
      marginTop: '-2px',
      height: '17px',
    },

    [`.${input}`]: {
      background: 'transparent',
      border: 0,
      boxSizing: 'border-box',
      color: 'inherit',
      cursor: 'inherit',
      fontSize: '14px',
      outline: 'none',
      padding: '1px 0 2px 10px',
      width: '100%',

      $nest: {
        ['&:invalid']: {
          boxShadow: 'none',
        },
        ['&::-ms-clear']: {
          display: 'none',
        },
      },
    },
  },
});

//// Loading/Spinner

export const emojiPickerSpinner = style({
  display: 'flex',
  width: '100%',
  height: '150px',
  justifyContent: 'center',
  alignItems: 'center',

  $nest: {
    '>div': {
      flex: '0 0 auto',
    }
  }
});

//// Category/Result

export const emojiPickerSection = style({
  flex: '1 0 auto',
});

export const emojiPickerRow = style({
  boxSizing: 'border-box',
  padding: '0 8px',
  flex: '1 1 auto',
});

export const emojiCategoryTitle = style({
  boxSizing: 'border-box',
  color: akColorN900,
  fontSize: '14px',
  padding: '5px 8px',
  textTransform: 'lowercase',

  $nest: {
    '&:first-letter': {
      textTransform: 'uppercase'
    }
  }
});

export const emojiItem = style({
  padding: '4px',
  width: '32px',
  height: '32px',
  display: 'inline-block',
  textAlign: 'center',

  $nest: {
    '&>span': {
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '5px',
      width: '24px',
      height: '24px',

      $nest: {
        // Fit non-square emoji to square
        '&>img': {
          position: 'relative',
          left: '50%',
          top: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
          maxHeight: '24px',
          maxWidth: '24px',
          display: 'block',
        },
        // Scale sprite to fit regardless of default emoji size
        '&>.emoji-sprite': {
          height: '24px',
          width: '24px',
        }
      }
    }
  },
});

export const addEmoji = style({
  border: '2px dashed #ccc',
  borderRadius: akBorderRadius,
  backgroundColor: 'transparent',
  width: '32px',
  height: '32px',
  padding: 0,
  margin: '4px',
  verticalAlign: 'middle',

  $nest: {
    '&:hover': {
      backgroundColor: akEmojiSelectedBackgroundColor,
    },

    '&:focus': {
      outline: '0',
    },

    span: {
      backgroundColor: 'inherit',
    }
  }
});

/// Footer
export const emojiPickerFooter = style({
  flex: '0 0 auto',
});

export const emojiPickerFooterWithTopShadow = style({
  borderTop: `2px solid ${akColorN30A}`,
  boxShadow: emojiFooterBoxShadow,
});
