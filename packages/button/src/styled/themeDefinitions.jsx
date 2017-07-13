import {
  akColorB50,
  akColorB75,
  akColorB100,
  akColorB200,
  akColorB300,
  akColorB400,
  akColorB500,
  akColorN0,
  akColorN20,
  akColorN20A,
  akColorN30A,
  akColorN70,
  akColorN100,
  akColorN400,
  akColorN700,
} from '@atlaskit/util-shared-styles';

/**
 * Convert a hex colour code to RGBA.
 * @param {String} hex Hex colour code.
 * @param {Number} alpha Optional alpha value (defaults to 1).
 *
 * @todo Move this to util-shared-styles.
 */
/* eslint-disable no-bitwise */
const hex2rgba = (hex, alpha = 1) => {
  let color;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    color = hex.substring(1).split('');
    if (color.length === 3) {
      color = [color[0], color[0], color[1], color[1], color[2], color[2]];
    }
    color = `0x${color.join('')}`;
    return `rgba(${[(color >> 16) & 255, (color >> 8) & 255, color & 255].join(',')}, ${alpha})`;
  }
  throw new Error('Bad Hex');
};
/* eslint-enable no-bitwise */

export default {
  // Fallbacks
  fallbacks: {
    background: akColorN20A,
    color: akColorN400,
    textDecoration: 'none',
  },

  // Themes
  themes: {
    // Default theme
    default: {
      // Default appearance
      default: {
        background: {
          default: akColorN20A,
          hover: akColorN30A,
          active: hex2rgba(akColorB75, 0.6),
          selected: akColorN700,
        },
        color: {
          default: akColorN400,
          active: akColorB400,
          disabled: akColorN70,
          selected: akColorN20,
        },
      },

      // Subtle appearance
      subtle: {
        background: {
          default: 'none',
          hover: akColorN30A,
          active: hex2rgba(akColorB75, 0.6),
          disabled: akColorN20A,
          selected: akColorN700,
        },
        color: {
          default: akColorN400,
          active: akColorB400,
          disabled: akColorN70,
          selected: akColorN20,
        },
      },

      // Primary appearance
      primary: {
        background: {
          default: akColorB400,
          hover: akColorB300,
          active: akColorB500,
          selected: akColorN700,
        },
        color: {
          default: akColorN0,
          disabled: hex2rgba(akColorN0, 0.5),
          selected: akColorN20,
        },
      },

      // Link appearance
      link: {
        background: {
          default: 'none',
          selected: akColorN700,
        },
        color: {
          default: akColorB400,
          hover: akColorB300,
          active: akColorB500,
          disabled: akColorN70,
          selected: akColorN20,
        },
        textDecoration: {
          hover: 'underline',
        },
      },

      // Subtle Link appearance
      'subtle-link': {
        background: {
          default: 'none',
          selected: akColorN700,
        },
        color: {
          default: akColorN100,
          hover: akColorB300,
          active: akColorB500,
          disabled: akColorN70,
          selected: akColorN20,
        },
        textDecoration: {
          hover: 'underline',
        },
      },
    },

    // Dark theme
    dark: {
      // Default appearance
      default: {
        background: {
          default: hex2rgba(akColorN0, 0.08),
          hover: hex2rgba(akColorN0, 0.12),
          active: hex2rgba(akColorB100, 0.32),
          disabled: hex2rgba(akColorN0, 0.04),
          selected: akColorN20,
        },
        color: {
          default: akColorN0,
          disabled: akColorN100,
          selected: akColorN700,
        },
      },

      // Subtle appearance
      subtle: {
        background: {
          default: 'none',
          hover: hex2rgba(akColorN0, 0.12),
          active: hex2rgba(akColorB100, 0.32),
          disabled: hex2rgba(akColorN0, 0.04),
          selected: akColorN20,
        },
        color: {
          default: akColorN0,
          disabled: akColorN100,
        },
      },

      // Primary appearance
      primary: {
        background: {
          default: akColorB200,
          hover: akColorB300,
          active: akColorB400,
          disabled: akColorB400,
          selected: akColorN20,
        },
        color: {
          default: akColorN0,
          disabled: hex2rgba(akColorN0, 0.5),
          selected: akColorN700,
        },
      },

      // Link appearance
      link: {
        background: {
          default: 'none',
          selected: akColorN20,
        },
        color: {
          default: akColorB75,
          hover: akColorB50,
          active: akColorB100,
          disabled: akColorN100,
          selected: akColorN700,
        },
        textDecoration: {
          hover: 'underline',
          active: 'underline',
        },
      },

      // Subtle Link appearance
      'subtle-link': {
        background: {
          default: 'none',
          selected: akColorN20,
        },
        color: {
          default: akColorN0,
          hover: akColorB50,
          active: akColorB100,
          disabled: akColorN100,
          selected: akColorN700,
        },
        textDecoration: {
          hover: 'underline',
          active: 'underline',
        },
      },
    },
  },
};
