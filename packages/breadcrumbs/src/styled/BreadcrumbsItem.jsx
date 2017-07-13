import styled from 'styled-components';
import { akGridSizeUnitless, akFontSizeDefault } from '@atlaskit/util-shared-styles';

const height = (akGridSizeUnitless * 3) / parseInt(akFontSizeDefault, 10);

const BreadcrumbsItemElement = styled.div`
  display: flex;
  flex-direction: row;
  height: ${height}em;
  line-height: ${height}em;
  margin: 0 ${akGridSizeUnitless / 2}px;
`;

BreadcrumbsItemElement.displayName = 'BreadcrumbsItemElement';

export default BreadcrumbsItemElement;
