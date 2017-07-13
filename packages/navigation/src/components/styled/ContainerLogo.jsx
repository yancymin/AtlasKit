import styled from 'styled-components';
import { gridSize } from '../../shared-variables';

const ContainerLogo = styled.div`
  height: ${gridSize * 3}px;
  margin: ${gridSize * 3.5}px 0 ${gridSize * 3.5}px ${gridSize * 3};
`;

ContainerLogo.displayName = 'ContainerLogo';
export default ContainerLogo;
