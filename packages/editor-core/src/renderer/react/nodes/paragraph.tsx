import {
  akFontFamily,
  akFontSizeDefault,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

export default styled.p`
  font-family: ${akFontFamily};
  font-size: ${akFontSizeDefault};
  font-weight: 400;
  line-height: 24px;
  white-space: pre-wrap;
  word-wrap: break-word;
`;
