import styled from 'styled-components';
import { globalPrimaryActions } from '../../shared-variables';

const GlobalPrimaryActionsInner = styled.div`
  box-sizing: border-box;
  margin-bottom: ${globalPrimaryActions.margin.bottom}px;
`;

GlobalPrimaryActionsInner.displayName = 'GlobalPrimaryActionsInner';

export default GlobalPrimaryActionsInner;
