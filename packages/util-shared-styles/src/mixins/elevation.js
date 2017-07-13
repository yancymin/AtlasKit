import { css } from 'styled-components';
import { akColorN50A, akColorN60A, akZIndexCard, akZIndexDialog, akZIndexModal, akZIndexFlag } from '../index';

// Cards on a board
const e100 = css`
  box-shadow: 0 1px 1px ${akColorN50A}, 0 0 1px 0 ${akColorN60A};
  z-index: ${akZIndexCard};
`;

// Inline dialogs
const e200 = css`
  box-shadow: 0 4px 8px -2px ${akColorN60A}, 0 0 1px ${akColorN60A};
  z-index: ${akZIndexDialog};
`;

// Modals
const e500 = css`
  box-shadow: 0 8px 16px -4px ${akColorN60A}, 0 0 1px ${akColorN60A};
  z-index: ${akZIndexModal};
`;

// Flag messages (notifications)
const e600 = css`
  box-shadow: 0 20px 32px -8px ${akColorN50A}, 0 0 1px ${akColorN60A};
  z-index: ${akZIndexFlag};
`;

export default {
  e100,
  e200,
  e500,
  e600,
};
