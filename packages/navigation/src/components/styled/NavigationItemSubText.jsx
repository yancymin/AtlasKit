import styled from 'styled-components';
import { isInCompactGroup, getProvided } from '../../theme/util';
import { truncate } from '../../utils/mixins';

const compactFontSize = '10px';
const defaultFontSize = '12px';
const compactLineHeight = '12px';
const defaultLineHeight = 'normal';

const NavigationItemSubText = styled.div`
  color: ${({ theme }) => (getProvided(theme).subText)};
  font-size: ${({ theme }) => (isInCompactGroup(theme) ? compactFontSize : defaultFontSize)};
  line-height: ${({ theme }) => (isInCompactGroup(theme) ? compactLineHeight : defaultLineHeight)};
  ${truncate()}
`;

NavigationItemSubText.displayName = 'NavigationItemSubText';
export default NavigationItemSubText;
