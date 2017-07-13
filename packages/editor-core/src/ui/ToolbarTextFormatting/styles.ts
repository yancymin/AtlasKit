import {
  akGridSizeUnitless
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

// tslint:disable-next-line:variable-name
export const ButtonGroup = styled.span`
  display: flex;

  & > div:not(:first-child) {
    margin-left: ${akGridSizeUnitless/2}px;
  }
`;
