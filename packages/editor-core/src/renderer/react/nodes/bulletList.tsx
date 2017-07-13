import styled from 'styled-components';

export default styled.ul`
  list-style-type: disc;
  & ul {
    list-style-type: circle;
  }
  & ul ul {
    list-style-type: square;
  }
`;
