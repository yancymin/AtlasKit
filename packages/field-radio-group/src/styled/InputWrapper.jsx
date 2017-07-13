import styled from 'styled-components';
import { iconHorizontalPadding } from './constants';

const InputWrapper = styled.span`
  padding: 0 ${iconHorizontalPadding}px;
  position: relative;
`;

InputWrapper.displayName = 'InputWrapper';

export default InputWrapper;
