import styled from 'styled-components';
import { akColorN900, akColorN50, akColorN0 } from '@atlaskit/util-shared-styles';

// tslint:disable-next-line:variable-name
export const Button = styled.button`
  height: 26px;
  width: 26px;
  background: ${akColorN900};
  padding: 0;
  border-radius: 4px;
  border: 1px solid ${akColorN0};
  cursor: pointer;
`;

// tslint:disable-next-line:variable-name
export const ButtonWrapper = styled.span`
  display: inline-block;
  border: 2px solid transparent;
  margin: 1px;
  font-size: 0px;
  border-radius: 6px;
  &:hover {
    border-color: ${akColorN50};
  }
`;
