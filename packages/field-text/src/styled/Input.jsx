import styled from 'styled-components';

const InputElement = styled.input`
  background: transparent;
  border: 0;
  box-sizing: border-box;
  color: inherit;
  cursor: inherit;
  font-size: 14px;
  outline: none;
  width: 100%;

  &::-ms-clear {
    display: none;
  }

  &:invalid {
    box-shadow: none;
  }
`;

export default InputElement;
