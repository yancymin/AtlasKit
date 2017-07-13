// @flow
import styled, { keyframes } from 'styled-components';
import { nestedNavigationAnimationTime } from '../../shared-variables';

const animationTime = nestedNavigationAnimationTime / 1000;

export const getAnimation = ({ isEntering, isLeaving, traversalDirection }) => (
  (isEntering || isLeaving) ? (
    `animation: ${animationTime}s ${keyframes`
      from { transform: translateX(${traversalDirection === 'down' ? 100 : -100}%); }
      to { transform: translateX(0); }
    `};`
  ) : (
    null
  )
);

const NestedNavigationPage = styled.div`
  ${getAnimation}
  flex-shrink: 0;
  width: 100%;
`;

NestedNavigationPage.displayName = 'NestedNavigationPage';

export default NestedNavigationPage;
