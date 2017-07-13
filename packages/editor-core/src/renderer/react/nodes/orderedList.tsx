import styled from 'styled-components';

export default styled.ol`
  list-style-type: decimal;
  & ol {
    list-style-type: lower-alpha;
  }
  & ol ol {
    list-style-type: lower-roman;
  }
  & ol ol ol {
    list-style-type: decimal;
  }
  & ol ol ol ol {
    list-style-type: lower-alpha;
  }
  & ol ol ol ol ol {
    list-style-type: lower-roman;
  }
  & ol ol ol ol ol ol {
    list-style-type: decimal;
  }
  & ol ol ol ol ol ol ol {
    list-style-type: lower-alpha;
  }
  & ol ol ol ol ol ol ol ol {
    list-style-type: lower-roman;
  }
`;
