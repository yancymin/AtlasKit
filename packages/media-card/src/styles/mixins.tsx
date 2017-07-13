/* tslint:disable:variable-name */
import { akBorderRadius } from '@atlaskit/util-shared-styles';
import {defaultTransitionDuration} from './config';

export const ellipsis = (maxWidth: string | number = '100%') => {
  const unit = typeof maxWidth === 'number' ? 'px' : '';

  return `
    max-width: ${maxWidth}${unit};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `;
};

export const size = (value: string | number = '100%') => {
  const unit = typeof value === 'number' ? 'px' : '';

  return `
    width: ${value}${unit};
    height: ${value}${unit};
  `;
};

export const centerX = `
  display: flex;
  justify-content: center;
`;

export const center = `
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const antialiased = `
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const centerSelfY = `
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const centerSelfX = `
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const centerSelf = `
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const borderRadius = `
  border-radius: ${akBorderRadius};
`;

export const borderRadiusLeft = `
  border-top-left-radius: ${akBorderRadius};
  border-bottom-left-radius: ${akBorderRadius};
`;

export const spaceAround = `
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const transition = (propertyName = 'all') => `
  transition: ${propertyName} ${defaultTransitionDuration};
`;

export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null;
};

export const rgba = (hex, opacity) => `rgba(${hexToRgb(hex)}, ${opacity})`;

export const capitalize = `
  &::first-letter {
    text-transform: uppercase;
  }
`;

export const absolute = (top = 0, left = 0) => `
  position: absolute;
  top: ${top}px;
  left: ${left}px;
`;

export default ellipsis;
