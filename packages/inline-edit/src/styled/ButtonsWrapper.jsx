import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const ButtonsWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-top: ${akGridSizeUnitless / 2}px;
  position: absolute;
  right: 0;
  top: 100%;
`;

ButtonsWrapper.displayName = 'ButtonsWrapper';

export default ButtonsWrapper;
