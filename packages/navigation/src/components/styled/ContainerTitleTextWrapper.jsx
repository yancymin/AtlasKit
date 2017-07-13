import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
import { whenCollapsed } from '../../theme/util';

const ContainerTitleTextWrapper = styled.div`
  margin-left: ${gridSize}px;
  width: 100%;
  min-width: 0;

  ${whenCollapsed`
    display: none;
  `}
`;

ContainerTitleTextWrapper.displayName = 'ContainerTitleTextWrapper';
export default ContainerTitleTextWrapper;
