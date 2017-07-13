import styled from 'styled-components';

import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

// we apply overflow and maxheight to the GroupWrapper if we are displaying a footer so that the
// footer is 'sticky' to the bottom (always visible)
const GroupsContainer = styled.div`
  overflow: ${({ hasFooter }) => (hasFooter ? 'auto' : 'visible')};
  max-height: ${({ hasFooter }) => (hasFooter ? `${akGridSizeUnitless * 4 * 9.5}px` : 'none')} ;
`;

export default GroupsContainer;
