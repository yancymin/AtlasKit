import styled, { keyframes } from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { flagWidth, flagWidthUnitless } from './constants';

// This is the translateX position that we target when animating a card out
// towards the left of screen.
const exitXPosition = `${0 - (flagWidthUnitless / 2)}px`;
const flagAnimationDuration = '0.4s';

const animationEnter = keyframes`
    from {
      opacity: 0;
      transform: translate(${exitXPosition}, 0);
    }
    to {
      opacity: 1;
      transform: translate(0, 0);
    }
`;

const animationLeave = keyframes`
  from {
    opacity: 1;
    transform: translate(0, 0);
  }
  to {
    opacity: 0;
    transform: translate(${exitXPosition}, 0);
  }
`;

const getAnimation = ({ isEntering, isLeaving }) => {
  if (isEntering) {
    return `${animationEnter} ${flagAnimationDuration}`;
  }

  if (isLeaving) {
    return `${animationLeave} ${flagAnimationDuration}`;
  }

  return 'initial';
};

const Wrapper = styled.div`
  bottom: 0;
  position: absolute;
  transition: transform ${flagAnimationDuration} ease-in-out;
  width: ${flagWidth};

  &:first-child {
    animation: ${getAnimation};
  }

  &:nth-child(n+2) {
    transform: translateX(0) translateY(100%) translateY(${2 * akGridSizeUnitless}px);
  }

  /* Layer the 'primary' flag above the 'secondary' flag */
  &:nth-child(1) { z-index: 5; }
  &:nth-child(2) { z-index: 4; }

  /* The 2nd flag should be placed at 0,0 position when the 1st flag is animating out. */
  ${({ isLeaving }) => (isLeaving ? (`
    && + * {
      transform: translate(0, 0);
    }
  `) : null)}

  /* Only show primary flag + 2 secondary flags */
  &:nth-child(n+4) {
    display: none;
  }
`;
Wrapper.displayName = 'Wrapper';
export default Wrapper;
