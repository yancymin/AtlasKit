import styled from 'styled-components';
import { gridSize } from '../../shared-variables';

const NavigationItemInner = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 ${gridSize * 1.5}px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

NavigationItemInner.displayName = 'NavigationItemInner';
export default NavigationItemInner;
