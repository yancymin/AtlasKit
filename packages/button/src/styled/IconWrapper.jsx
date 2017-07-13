import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const getMargin = ({ isOnlyChild, spacing }) => {
  if (spacing === 'none') {
    return '0';
  }
  if (isOnlyChild) {
    return `0 -${akGridSizeUnitless / 4}px`;
  }
  return `0 ${akGridSizeUnitless / 2}px`;
};

const IconWrapper = styled.span`
  align-self: center;
  display: flex;
  line-height: 0;
  font-size: 0;
  margin: ${getMargin};
`;

IconWrapper.displayName = 'IconWrapper';

export default IconWrapper;
