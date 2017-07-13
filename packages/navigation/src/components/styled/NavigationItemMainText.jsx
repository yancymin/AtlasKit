import styled from 'styled-components';
import { truncate } from '../../utils/mixins';

const NavigationItemMainText = styled.div`
  ${truncate()}
`;

NavigationItemMainText.displayName = 'NavigationItemMainText';
export default NavigationItemMainText;
