import styled, { keyframes } from 'styled-components';
import {
  akAnimationMixins,
  akBorderRadius,
  akColorPrimary3,
  akColorN900,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';

const { createBold, interpolate } = akAnimationMixins;

const gutter = akGridSizeUnitless / 2;
const fontSize = 3 * gutter;
const lineHeight = (4 * gutter) / fontSize;
const maxWidth = 105 * gutter; // ~420px
const animationDistance = 2 * gutter;

const slideDown = {
  property: 'transform',
  value: interpolate`translateY(${y => y}px) translateX(-50%)`,
  deltas: [{ from: -animationDistance, to: 0 }],
};
const fadeOut = {
  property: 'opacity',
  deltas: [{ from: 0, to: 1 }],
};

const Tooltip = styled.div`
  animation: ${keyframes`${createBold([slideDown, fadeOut])}`} 0.6s 0.1s backwards;
  background-color: ${akColorN900};
  border-radius: ${akBorderRadius};
  box-sizing: border-box;
  color: ${akColorPrimary3};
  font-size: ${fontSize}px;
  left: 50%;
  line-height: ${lineHeight};
  margin-top: ${gutter}px;
  max-width: ${maxWidth}px;
  overflow: hidden;
  padding: ${gutter / 2}px ${gutter * 2}px;
  pointer-events: none;
  position: absolute;
  text-overflow: ellipsis;
  transform: translateX(-50%);
  white-space: nowrap;
`;

export default Tooltip;
