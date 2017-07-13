import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
import { whenCollapsed } from '../../theme/util';

const NavigationItemGroupAction = styled.div`
  margin-right: ${gridSize}px;

  ${whenCollapsed`
    visibility: hidden;
  `}
`;

NavigationItemGroupAction.displayName = 'NavigationItemGroupAction';
export default NavigationItemGroupAction;
