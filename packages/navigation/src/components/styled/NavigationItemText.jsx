import styled from 'styled-components';
import { isCollapsed } from '../../theme/util';

const getDisplay = ({ theme, isDropdown }) => {
  if (isDropdown && isCollapsed(theme)) {
    return 'none';
  }
  return 'inline-block';
};

const NavigationItemText = styled.div`
  overflow-x: hidden;
  display: ${getDisplay};
  flex-grow: 1;
`;

NavigationItemText.displayName = 'NavigationItemText';
export default NavigationItemText;
