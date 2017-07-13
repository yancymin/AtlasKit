import styled from 'styled-components';
import { whenCollapsed } from '../../theme/util';

const NavigationItemAction = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  flex-shrink: 0;

  ${whenCollapsed`
    opacity: 0;
  `}
`;

NavigationItemAction.displayName = 'NavigationItemAction';
export default NavigationItemAction;
