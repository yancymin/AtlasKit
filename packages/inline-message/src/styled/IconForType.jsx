import styled from 'styled-components';
import itemSpacing from './constants';

const IconWrapper = styled.span`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  padding: 0 ${itemSpacing};
  color: ${props => props.iconColor}
`;

export default IconWrapper;
