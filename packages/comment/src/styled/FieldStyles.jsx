import styled, { css } from 'styled-components';

import { akColorN500 } from '@atlaskit/util-shared-styles';

const commonStyles = ({ hasAuthor }) => css`
  &:not(:hover):not(:active) {
    color: ${akColorN500};
  }
  font-weight: ${hasAuthor ? 500 : 'inherit'};
`;

const Anchor = styled.a`
  ${props => commonStyles(props)}
`;

const Span = styled.span`
  ${props => commonStyles(props)}
`;

export {
  Anchor,
  Span,
};
