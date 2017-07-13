import styled from 'styled-components';

const ContentWrapper = styled.div`
  align-items: center;
  ${({ disabled }) => (disabled ? 'cursor: not-allowed' : '')}
  display: flex;
  ${({ fitContainerWidth }) => (fitContainerWidth ? 'flex: 1 1 auto;' : '')};
  max-width: 100%;
`;

export default ContentWrapper;
