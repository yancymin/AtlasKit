import styled from 'styled-components';
import { getProvided } from '../../theme/util';
import { truncate } from '../../utils/mixins';

const ContainerTitleText = styled.div`
  color: ${({ theme }) => getProvided(theme).text};
  font-weight: 500;
  ${truncate()}
`;

ContainerTitleText.displayName = 'ContainerTitleText';
export default ContainerTitleText;
