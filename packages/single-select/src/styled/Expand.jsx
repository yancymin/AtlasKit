import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const Expand = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 ${akGridSizeUnitless * 3}px;
  justify-content: center;
  margin: 0px ${akGridSizeUnitless}px;
`;

Expand.displayName = 'SingleSelectExpand';

export default Expand;
