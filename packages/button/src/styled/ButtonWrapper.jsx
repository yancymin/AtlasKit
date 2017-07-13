import styled from 'styled-components';

const ButtonWrapper = styled.span`
  align-self: center;
  display: inline-flex;
  flex-wrap: nowrap;
  max-width: 100%;
  ${props => (props.fit && `
    width: 100%;
    justify-content: center;
  `)}
`;

ButtonWrapper.displayName = 'ButtonWrapper';

export default ButtonWrapper;
