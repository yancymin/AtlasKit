import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const getAlignment = ({ followsIcon }) => (followsIcon ? 'baseline' : 'center');

const getMargin = ({ spacing }) => (spacing === 'none' ? '0' : `0 ${akGridSizeUnitless / 2}px`);

const ButtonContent = styled.span`
  align-items: ${getAlignment};
  align-self: ${getAlignment};
  flex-shrink: 0;
  margin: ${getMargin};
  max-width: 100%;
  overflow: hidden;
  pointer-events: none;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

ButtonContent.displayName = 'ButtonContent';

export default ButtonContent;
