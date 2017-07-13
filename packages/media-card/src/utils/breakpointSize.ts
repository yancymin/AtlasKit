export type BreakpointSizeValue = 'small' | 'medium' | 'large' | 'xlarge';

export const breakpointSize = (width, sizes): BreakpointSizeValue => {
  const value = parseInt(width, 0); // Normalize value
  const keys = Object.keys(sizes);
  const defaultValue = keys[0];
  let breakpoint;

  keys.forEach(label => {
    if (value < sizes[label] && !breakpoint) {
      breakpoint = label;
    }
  });

  return breakpoint || defaultValue;
};
