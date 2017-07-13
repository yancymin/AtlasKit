import styled from 'styled-components';

export default styled.div`
  max-height: ${({ isExpanded }) => (isExpanded ? 150 : 0)}px;
  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)};
  overflow: ${({ isExpanded }) => (isExpanded ? 'visible' : 'hidden')};
  transition: max-height 0.3s, opacity 0.3s;
`;
