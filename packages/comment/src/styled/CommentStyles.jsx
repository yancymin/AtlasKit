import styled from 'styled-components';
import { akColorN100A, akColorN800, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const Content = styled.div`
  color: ${({ isDisabled }) => (isDisabled ? akColorN100A : akColorN800)};
  margin-top: ${akGridSizeUnitless / 2}px;
`;

// While we are only exporting one style, we want to keep the same export shape.
// eslint-disable-next-line
export { Content };
