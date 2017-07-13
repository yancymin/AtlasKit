import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const NothingWasFoundElement = styled.div`
  padding: 6px ${akGridSizeUnitless * 3}px;
`;

NothingWasFoundElement.displayName = 'NothingWasFoundElement';

export default NothingWasFoundElement;
