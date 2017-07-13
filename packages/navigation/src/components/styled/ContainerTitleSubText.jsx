import styled from 'styled-components';
import { getProvided } from '../../theme/util';
import { truncate } from '../../utils/mixins';

const ContainerTitleSubText = styled.div`
  color: ${({ theme }) => getProvided(theme).subText};
  ${truncate()}
`;

ContainerTitleSubText.displayName = 'ContainerTitleSubText';
export default ContainerTitleSubText;
