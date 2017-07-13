import styled from 'styled-components';
import { layout } from '../../shared-variables';
import { isCollapsed, getProvided } from '../../theme/util';

const ContainerNavigationInner = styled.div`
  background-color: ${({ theme }) => {
    const background = getProvided(theme).background;
    if (background.secondary) {
      return background.secondary;
    }

    return background.primary;
  }};
  box-sizing: border-box;
  color: ${({ theme }) => getProvided(theme).text};
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: ${({ theme }) => (isCollapsed(theme) ? layout.padding.top : 0)}px;
  padding-left: ${({ theme }) => (isCollapsed(theme) ? layout.padding.side : 0)}px;
  padding-right: ${({ theme }) => (isCollapsed(theme) ? layout.padding.side : 0)}px;
  padding-bottom: 0;

  /* fill the entire space of the flex container */
  width: 100%;

  /* needed to fix sticky header on retina displays */
  /* inherit value is for the collapsed state, to fix stacking context in Firefox and Edge */
  transform-style: ${({ theme }) => (isCollapsed(theme) ? 'inherit' : 'preserve-3d')};
`;

ContainerNavigationInner.displayName = 'ContainerNavigationInner';

export default ContainerNavigationInner;
