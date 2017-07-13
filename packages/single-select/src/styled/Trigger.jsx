import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const Trigger = styled.div`
  align-items: center;
  display: flex;
  min-height: ${akGridSizeUnitless * 4.5}px;
  width: 100%;
`;

Trigger.displayName = 'SingleSelectTrigger';

export default Trigger;
