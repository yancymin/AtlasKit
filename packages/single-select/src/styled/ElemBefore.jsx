import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const ElemBefore = styled.div`
  display: flex;
  padding-right: ${akGridSizeUnitless}px;
`;

ElemBefore.displayName = 'TriggerElemBefore';

export default ElemBefore;
