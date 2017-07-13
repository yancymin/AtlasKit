// @flow
import styled, { keyframes } from 'styled-components';
import type { SpinnerPhases } from '../types';

type AnimationParams = {
  delay: number,
  phase: SpinnerPhases,
};

export const getContainerAnimation = ({ delay, phase }: AnimationParams) => {
  if (phase === 'DELAY') {
    /* This hides the spinner and allows us to use animationend events to move to the next phase in
     * the same way we do with the other lifecycle stages */
    return `animation: ${delay}s ${keyframes`
        from { opacity: 0; }
        to { opacity: 0; }
      `};`;
  }

  if (phase === 'ENTER' || phase === 'IDLE') {
    return `animation: 1s ease-in-out forwards ${keyframes`
        from { transform: rotate(50deg); }
        to { transform: rotate(230deg); }
      `};`;
  }

  if (phase === 'LEAVE') {
    return `animation: 0.53s ease-in-out forwards ${keyframes`
        from { transform: rotate(230deg); }
        to { transform: rotate(510deg); }
      `},
      0.2s ease-in-out 0.33s ${keyframes`
        from { opacity: 1; }
        to { opacity: 0; }
      `};`;
  }

  return '';
};

const getSize = ({ size }: { size: number }) => `${size}px`;

const Container = styled.div`
  ${getContainerAnimation}
  display: inline-flex;
  height: ${getSize};
  width: ${getSize};

  /* Rapidly creating and removing spinners will result in multiple spinners being visible while
   * they complete their exit animations. This rules hides the spinner if another one has been
   * added. */
  div + & {
    display: none;
  }
`;
Container.displayName = 'SpinnerContainer';
export default Container;
