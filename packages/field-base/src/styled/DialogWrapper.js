import styled from 'styled-components';

const DialogWrapper = styled.div`
  ${({ fitContainerWidth }) => (fitContainerWidth ? 'flex: 1 1 auto;' : '')}
  max-width: 100%;
`;

export default DialogWrapper;
