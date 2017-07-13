import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
import { getProvided } from '../../theme/util';

const ContainerTitleInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: ${gridSize * 0.5}px;

  /* We need to "leak" styles here, as we need to override link and button
  styles the user may have passed in with the linkComponent prop */
  a, button {
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => getProvided(theme).text};
      text-decoration: none;
    }
  }
`;

ContainerTitleInner.displayName = 'ContainerTitleInner';
export default ContainerTitleInner;
