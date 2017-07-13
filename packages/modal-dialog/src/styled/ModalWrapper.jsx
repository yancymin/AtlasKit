import styled from 'styled-components';
import { akZIndexBlanket } from '@atlaskit/util-shared-styles';

// If the wrapper isn't open, we want `pointer-events: none` so that click events pass through
// the element. Previously we just didn't render ModalWrapper at all is isOpen === false, but now
// we need to always render the ModalWrapper because we need to always render ModalWrapper's child
// Blanket. The Blanket needs to always be rendered (even if isOpen === false) to ensure that the
// blanket opacity transition happens, rather than just appearing when isOpen === true.
export const getPointerEvents = ({ isOpen }) => (isOpen ? 'initial' : 'none');

// Fixed container to avoid position clashing with other elements
export default styled.div`
  height: 100%;
  left: 0;
  pointer-events: ${getPointerEvents};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${akZIndexBlanket};
`;
