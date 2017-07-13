import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

export default styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 740px;
  padding-left: ${akGridSizeUnitless * 2}px;
  padding-right: ${akGridSizeUnitless * 2}px;

  @media (min-width: 780px) {
    padding-left: ${akGridSizeUnitless * 3}px;
    padding-right: ${akGridSizeUnitless * 3}px;
  }
`;
