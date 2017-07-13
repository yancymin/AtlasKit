// @flow
import styled, { css, keyframes } from 'styled-components';
import { akColorN0, akColorN500 } from '@atlaskit/util-shared-styles';
import type { SpinnerPhases } from '../types';

type StyleParams = {
  invertColor: boolean,
  phase: SpinnerPhases,
  size: number,
};

export const getStrokeColor = (invertColor: boolean): string => (
  invertColor ? akColorN0 : akColorN500
);

export const svgStyles = css`
  ${({ invertColor, phase, size }: StyleParams) => {
    const strokeWidth = Math.round(size / 10);
    const strokeRadius = (size / 2) - (strokeWidth / 2);
    const circumference = Math.PI * strokeRadius * 2;

    const idleRotation = `0.86s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite ${keyframes`
      to { transform: rotate(360deg); }
    `}`;

    const spinUpStroke = `0.8s ease-in-out ${keyframes`
      from { stroke-dashoffset: ${circumference}px; }
      to { stroke-dashoffset: ${circumference * 0.8}px; }
    `}`;

    const spinUpOpacity = `0.2s ease-in-out ${keyframes`
      from { opacity: 0; }
      to { opacity: 1; }
    `}`;

    const activeAnimations = [idleRotation];
    if (phase === 'ENTER') {
      activeAnimations.push(spinUpStroke, spinUpOpacity);
    }

    return `
      animation: ${activeAnimations.join(', ')};
      fill: none;
      stroke: ${getStrokeColor(invertColor)};
      stroke-dasharray: ${circumference}px;
      stroke-dashoffset: ${circumference * 0.8}px;
      stroke-linecap: round;
      stroke-width: ${strokeWidth}px;
      transform-origin: center;
    `;
  }}
`;

const Svg = styled.svg`${svgStyles}`;
Svg.displayName = 'SpinnerSvg';
export default Svg;
