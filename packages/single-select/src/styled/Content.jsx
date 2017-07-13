import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const Content = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  margin: ${akGridSizeUnitless}px 6px;
  white-space: nowrap;
`;

Content.displayName = 'SingleSelectContent';

export default Content;
