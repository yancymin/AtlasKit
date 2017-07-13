import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
import { isInCompactGroup, isCollapsed } from '../../theme/util';

const size = gridSize * 3;
const offsetLeft = gridSize * 3;
const openPadding = `0 ${gridSize * 2}px 0 ${offsetLeft - (gridSize * 2)}px`;
const compactPadding = `0 ${gridSize}px 0 0`;

const getPadding = ({ theme, hasNoPadding }) => {
  if (hasNoPadding) {
    return '0';
  }

  if (isCollapsed(theme)) {
    return '0';
  }

  return isInCompactGroup(theme) ? compactPadding : openPadding;
};

const getDisplay = ({ theme, isDropdownTrigger }) => {
  if (isDropdownTrigger && isCollapsed(theme)) {
    return 'none';
  }
  return 'flex';
};

const NavigationItemIcon = styled.div`
  display: ${getDisplay};
  padding: ${getPadding};
  flex-shrink: 0;
  transition: padding 200ms;

  /* We need to ensure that any image passed in as a child (<img/>, <svg/>
  etc.) receives the correct width, height and border radius. We don't
  currently assume that the image passed in is the correct dimensions, or has
  width / height 100% */
  > * {
    flex: 1 0 auto;
    height: ${size}px;
    width: ${size}px;
  }
`;

NavigationItemIcon.displayName = 'NavigationItemIcon';
export default NavigationItemIcon;
