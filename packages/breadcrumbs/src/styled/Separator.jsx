import styled from 'styled-components';

import { akColorN100, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const Separator = styled.div`
  color: ${akColorN100};
  padding-left: ${akGridSizeUnitless}px;
  text-align: center;
  width: ${akGridSizeUnitless}px;
`;

Separator.displayName = 'Separator';

export default Separator;
