import { keyframes } from 'styled-components';
import { easeInOutCubic } from './easing';

export const fadeInKeyframe = keyframes`
  0%{
    opacity: 0;
  }

  100%{
    opacity: 1;
  }
`;

export const fadeIn = `
  animation: ${fadeInKeyframe} .3s ${easeInOutCubic};
`;

export const spin = keyframes`
  to { transform: rotate(360deg); }
`;
