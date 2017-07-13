import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ justify }) => `flex-${justify}`};
  width: 100%;
`;
