import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
import { getProvided, whenCollapsed } from '../../theme/util';

const NavigationItemGroupHeader = styled.div`
  display: flex;
  margin-bottom: ${gridSize}px;
  margin-left: ${gridSize * 1.5}px;
  margin-top: ${gridSize * 2}px;

  ${whenCollapsed`
    margin-left: ${gridSize * 0.5}px;
    margin-right: ${gridSize * 0.5}px;
    border-top: 1px solid ${({ theme }) => getProvided(theme).keyline};
  `}
`;

NavigationItemGroupHeader.displayName = 'NavigationItemGroupHeader';
export default NavigationItemGroupHeader;
