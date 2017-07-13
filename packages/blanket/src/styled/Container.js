import styled from 'styled-components';
import {
  akColorN900,
  akZIndexBlanket,
} from '@atlaskit/util-shared-styles';

export const getOpacity = ({ isTinted }) => (isTinted ? 0.5 : 0);
export const getPointerEvents = ({ canClickThrough }) => (canClickThrough
  ? 'none'
  : 'initial'
);

export default styled.div`
  background: ${akColorN900};
  bottom: 0;
  left: 0;
  opacity: ${getOpacity};
  pointer-events: ${getPointerEvents};
  position: fixed;
  right: 0;
  top: 0;
  transition: opacity 220ms;
  z-index: ${akZIndexBlanket};
`;
