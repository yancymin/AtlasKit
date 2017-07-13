import styled from 'styled-components';
import { layout } from '../../shared-variables';

const DrawerSide = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  padding: ${layout.padding.top}px 0;
  position: relative;
  width: ${layout.width.closed}px;
`;

DrawerSide.displayName = 'DrawerSide';
export default DrawerSide;
