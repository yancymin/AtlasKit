import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

export default styled.span`
  flex: 0 1 auto;
  overflow: hidden;
  padding-left: ${akGridSizeUnitless / 2}px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
