import styled from 'styled-components';
import {
  widths,
  widthTransition,
  transformTransition,
} from '../../utils/drawer-style-variables';
import { getProvided } from '../../theme/util';
import { zIndex } from '../../shared-variables';

const DrawerInner = styled.div`
  background-color: ${({ theme }) => getProvided(theme).background.tertiary};
  color: ${({ theme }) => getProvided(theme).text};
  display: flex;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  transform: ${({ width, isOpen }) => (isOpen ? 'translateX(0)' : `translateX(${widths[width].offScreenTranslateX})`)};
  transition: ${transformTransition}, ${widthTransition};
  width: ${({ width }) => widths[width].width};
  z-index: ${zIndex.drawer};
`;

DrawerInner.displayName = 'DrawerInner';
export default DrawerInner;
