import {
  akColorB300,
  akColorB400,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

export default styled.a`
  color: ${akColorB400};

  &:hover {
    color: ${akColorB300};
    text-decoration: underline;
  }
`;
