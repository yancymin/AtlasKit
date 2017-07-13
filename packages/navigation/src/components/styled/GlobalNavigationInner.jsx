import styled from 'styled-components';
import { layout, globalOpenWidth } from '../../shared-variables';
import { getProvided } from '../../theme/util';

const GlobalNavigationInner = styled.div`
  align-items: center;
  color: ${({ theme }) => getProvided(theme).text};
  background-color: ${({ theme }) => getProvided(theme).background.primary};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: ${layout.padding.top}px ${layout.padding.side}px ${layout.padding.top}px;
  /* always keeping a fixed width so that the ContainerNavigation bleeds over the top of this */
  width: ${globalOpenWidth}px;
`;

GlobalNavigationInner.displayName = 'GlobalNavigationInner';
export default GlobalNavigationInner;
