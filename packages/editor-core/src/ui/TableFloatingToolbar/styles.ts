import styled from 'styled-components';
import { akColorN80 } from '@atlaskit/util-shared-styles';

// tslint:disable-next-line:variable-name
export const Toolbar = styled.div`
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  padding: 3px 6px;
  display: flex;
  align-content: center;
  & * {
    display: flex;
  }
`;
// tslint:disable-next-line:variable-name
export const AdvanceMenuItemWrap = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 110px;
`;
// tslint:disable-next-line:variable-name
export const AdvanceMenuItemAfter = styled.span`
  color: ${akColorN80};
  font-size: 80%;
`;
