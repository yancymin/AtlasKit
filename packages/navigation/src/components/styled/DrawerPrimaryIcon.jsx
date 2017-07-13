import styled from 'styled-components';
import { drawerBackIconSize } from '../../utils/drawer-style-variables';

const DrawerPrimaryIcon = styled.div`
  align-items: center;
  display: flex;
  height: ${drawerBackIconSize}px;
  justify-content: center;
  width: ${drawerBackIconSize}px;
`;

DrawerPrimaryIcon.displayName = 'DrawerPrimaryIcon';
export default DrawerPrimaryIcon;
