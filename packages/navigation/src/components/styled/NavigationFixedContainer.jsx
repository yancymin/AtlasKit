import styled from 'styled-components';
import { zIndex } from '../../shared-variables';

const NavigationFixedContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  position: fixed;
  left: 0;
  /* force this to have the width of the Spacer above */
  width: inherit;
  z-index: ${zIndex.base};
`;

NavigationFixedContainer.displayName = 'NavigationFixedContainer';
export default NavigationFixedContainer;
