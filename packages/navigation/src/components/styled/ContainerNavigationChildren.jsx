import styled from 'styled-components';
import { layout } from '../../shared-variables';
import { isCollapsed } from '../../theme/util';

const ContainerNavigationChildren = styled.div`
  padding: 0 ${({ theme }) => (isCollapsed(theme) ? 0 : layout.padding.side)}px;

  /* Fill the entire height */
  flex-grow: 1;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
`;

ContainerNavigationChildren.displayName = 'ContainerNavigationChildren';

export default ContainerNavigationChildren;
