import Button from '@atlaskit/button';
import styled from 'styled-components';
import { itemTruncateWidth } from '../constants';

const ButtonElement = styled(Button)`
  max-width: ${itemTruncateWidth}px;
`;

export default ButtonElement;
