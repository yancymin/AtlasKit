import styled, { css } from 'styled-components';

import { akGridSizeUnitless, akColorN200 } from '@atlaskit/util-shared-styles';

const Content = styled.div`
  flex: 1 1 auto;
  margin: 3px ${akGridSizeUnitless}px; /* magic number to make multi-select the same height as field-text, to be fixed TODO: AK-1699 */
  white-space: nowrap;
`;

const Expand = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 ${akGridSizeUnitless * 3}px;
  justify-content: center;
  margin: 0px ${akGridSizeUnitless}px;
`;

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

const TriggerDiv = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  min-height: 37px; /* magic number to make multi-select the same height as field-text, to be fixed TODO: AK-1699 */

  ${({ isDisabled }) => (isDisabled ? css`cursor: not-allowed;` : '')}
`;

export { Content, Expand, TriggerDiv, Input };
