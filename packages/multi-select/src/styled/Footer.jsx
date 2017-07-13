import styled, { css } from 'styled-components';
import { akGridSizeUnitless, akColorN40A } from '@atlaskit/util-shared-styles';

const FooterDiv = styled.div`
  padding: ${akGridSizeUnitless}px 0 ${akGridSizeUnitless / 2}px 0;
  border-top: ${({ shouldHideSeparator }) => (shouldHideSeparator ? css`0;` : css`2px solid ${akColorN40A};`)}
`;

export default FooterDiv;
