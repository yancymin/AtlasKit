import styled, { css } from 'styled-components';
import { akColorN200 } from '@atlaskit/util-shared-styles';

const Input = styled.input`
  display: inline-block;
  flex: 1 0 10px;
  margin: 0;
  padding: 0;
  outline: 0;
  height: 17px; /* magic number to make multi-select the same height as field-text, to be fixed TODO: AK-1699 */
  border: 0;
  background: none;
  align-self: center;

  &::placeholder {
    font-size: 14px;
    color: ${akColorN200};
  }
`;

const SelectWrapper = styled.div`
  display: inline-block;

  ${({ shouldFitContainer }) => (shouldFitContainer ? css`display: block;` : css`display: inline-block;`)}
`;

export { Input, SelectWrapper };
