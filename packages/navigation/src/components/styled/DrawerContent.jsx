import styled from 'styled-components';
import { layout, drawerOffset } from '../../shared-variables';

export const ContentArea = styled.div`
/* Required for children elements be able to have bottom of a screen */
bottom: 0;
position: absolute;
transition: top 220ms;
top: ${props => (props.isFullWidth ? 0 : props.iconOffset)}px;
width: calc(100% - ${drawerOffset}px);
`;

const DrawerContent = styled.div`
  box-sizing: border-box;
  padding: 0 ${layout.padding.side}px;
  width: 100%;
`;

DrawerContent.displayName = 'DrawerContent';
export default DrawerContent;
