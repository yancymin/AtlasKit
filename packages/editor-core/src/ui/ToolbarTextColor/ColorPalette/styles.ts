import styled from 'styled-components';
import { akGridSize } from '@atlaskit/util-shared-styles';

// tslint:disable-next-line:variable-name
export const ColorPaletteWrapper = styled.div`
  padding: 0 ${akGridSize};
  /* Firefox bug fix: https://product-fabric.atlassian.net/browse/ED-1789 */
  display: flex;
  flex-wrap: wrap;
`;
