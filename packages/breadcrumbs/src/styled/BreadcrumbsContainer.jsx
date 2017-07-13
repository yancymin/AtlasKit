import styled from 'styled-components';
import { akColorN300 } from '@atlaskit/util-shared-styles';

const BreadcrumbsContainer = styled.div`
  color: ${akColorN300};
  display: flex;
  flex-wrap: wrap;
`;

BreadcrumbsContainer.displayName = 'BreadcrumbsContainer';

export default BreadcrumbsContainer;
