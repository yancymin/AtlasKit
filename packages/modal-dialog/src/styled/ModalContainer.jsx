import styled from 'styled-components';
import { akColorN0, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

export default styled.div`
  background-color: ${akColorN0};
  border-radius: ${akGridSizeUnitless / 2}px;
  display: flex;
  flex-direction: column;
  max-height: inherit;
`;
