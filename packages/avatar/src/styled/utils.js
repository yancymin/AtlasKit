// @flow
import { css } from 'styled-components';
import { akColorB200, akColorN70A, akColorN200A } from '@atlaskit/util-shared-styles';
import { AVATAR_RADIUS, AVATAR_SIZES, BORDER_WIDTH, TRANSITION_DURATION } from './constants';
import type { AppearanceType, SizeType } from '../types';

// "square" avatars are explicit
export function getBorderRadius(
  props: { appearance: AppearanceType, size: SizeType },
  config: { includeBorderWidth: boolean } = { includeBorderWidth: false }
) {
  const borderWidth: number = config.includeBorderWidth ? BORDER_WIDTH[props.size] : 0;
  return (props.appearance === 'circle'
    ? '50%'
    : `${AVATAR_RADIUS[props.size] + borderWidth}px`
  );
}

export const getSize = (props: { size: SizeType }) => AVATAR_SIZES[props.size]; // for testing
export function getAvatarDimensions(
  props: { size: SizeType },
  config: { includeBorderWidth: boolean } = { includeBorderWidth: false }
) {
  const borderWidth: number = config.includeBorderWidth ? (BORDER_WIDTH[props.size] * 2) : 0;
  const size: number = AVATAR_SIZES[props.size] + borderWidth;
  return `
    height: ${size}px;
    width: ${size}px;
  `;
}

// expose here for use with multiple element types
export function getInnerStyles(props: any) {
  const boxSizing: string = 'content-box';
  const borderWidth: string = `${BORDER_WIDTH[props.size]}px`;
  const isInteractive: boolean = props.href || props.onClick;

  let backgroundColor = props.borderColor;
  let cursor = 'default';
  let outline = 'none';
  let overlayShade = 'transparent';
  let overlayOpacity = 0;
  let pointerEvents = 'auto';
  let position = 'static';
  let transform = 'translateZ(0)';
  let transitionDuration = '0s';

  // Interaction: Hover
  if (isInteractive && (props.isActive || props.isHover)) {
    overlayShade = akColorN70A;
    overlayOpacity = 1;
  }

  // Interaction: Active
  if (isInteractive && props.isActive) {
    transform = 'scale(0.9)';
  }

  // Interaction: Focus
  if (isInteractive && props.isFocus && !props.isActive) {
    outline = 'none';
    backgroundColor = akColorB200;
    transitionDuration = TRANSITION_DURATION;
  }

  // Disabled
  if (props.isDisabled) {
    cursor = 'not-allowed';
    overlayShade = 'rgba(255, 255, 255, 0.7)';
    overlayOpacity = 1;
    pointerEvents = 'none';
  }

  // Interactive
  if (isInteractive) {
    cursor = 'pointer';
  }

  // Loading
  if (props.isSelected) {
    overlayShade = akColorN200A;
    overlayOpacity = 1;
  }

  // Stack
  if (props.stackIndex) {
    position = 'relative';
  }

  return css`
    ${getAvatarDimensions};
    align-items: stretch;
    background-color: ${backgroundColor};
    border: 0;
    border-radius: ${getBorderRadius(props, { includeBorderWidth: true })};
    padding: ${borderWidth};
    box-sizing: ${boxSizing};
    cursor: ${cursor}
    display: flex;
    flex-direction: column;
    justify-content: center;
    outline: ${outline};
    overflow: hidden;
    pointer-events: ${pointerEvents};
    position: ${position}
    transform: ${transform};
    transition: background-color ${transitionDuration} ease-out;

    a &, button & {
      cursor: pointer;
    }

    &::after {
      background-color: ${overlayShade};
      border-radius: ${getBorderRadius};
      bottom: ${borderWidth};
      content: " ";
      left: ${borderWidth};
      opacity: ${overlayOpacity}
      position: absolute;
      right: ${borderWidth};
      top: ${borderWidth};
      transition: opacity ${TRANSITION_DURATION};
    }

    &::-moz-focus-inner {
      border: 0;
      margin: 0;
      padding: 0;
    }
  `;
}
