// @flow
import type { SpringHelperConfig } from 'react-motion/lib/Types';

const base = {
  stiffness: 800, // fast
  // stiffness: 200, // medium
  // stiffness: 100, // slow
  damping: 60,
  // precision: 0.5,
  precision: 0.9,
};

export const standard: SpringHelperConfig = {
  ...base,
};

export const fast: SpringHelperConfig = {
  ...base,
  stiffness: base.stiffness * 2,
};
