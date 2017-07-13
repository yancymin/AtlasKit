import styled from 'styled-components';
import NavigationItemIcon from '../styled/NavigationItemIcon';
import { whenCollapsed } from '../../theme/util';

const NavigationDropItemIcon = styled(NavigationItemIcon)`
  padding-right: 0px;

  ${whenCollapsed`
    display: none;
  `}
`;

NavigationDropItemIcon.displayName = 'NavigationDropItemIcon';
export default NavigationDropItemIcon;

