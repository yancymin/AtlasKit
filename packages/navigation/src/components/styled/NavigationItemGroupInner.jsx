import styled from 'styled-components';
import { gridSize } from '../../shared-variables';

const NavigationItemGroupInner = styled.div`
  margin-top: ${({ hasHeaderContent }) => (hasHeaderContent ? 0 : (gridSize * 3))}px;
  &:first-child {
    ${({ hasHeaderContent }) => (hasHeaderContent ? '' : `
        margin-top: 0;
    `)}
  }
`;

NavigationItemGroupInner.displayName = 'NavigationItemGroupInner';
export default NavigationItemGroupInner;
