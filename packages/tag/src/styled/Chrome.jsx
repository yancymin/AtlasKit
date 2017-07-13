import styled from 'styled-components';
import {
  akColorN20,
  akColorN30,
  akColorR50,

  akGridSizeUnitless,
  akHelperMixins,
} from '@atlaskit/util-shared-styles';

import { buttonWidthUnitless, borderRadius, tagHeight } from './constants';

export default styled.span`
  ${akHelperMixins.focusRing.default};
  background-color: ${({ markedForRemoval }) => (markedForRemoval ? akColorR50 : akColorN20)};
  border-radius: ${({ isRounded }) => (isRounded ? `${buttonWidthUnitless / 2}px` : borderRadius)};
  cursor: default;
  display: flex;
  height: ${tagHeight};
  line-height: 1;
  margin: ${akGridSizeUnitless / 2}px;
  padding: 0;
  overflow: ${({ isRemoved, isRemoving }) => ((isRemoved || isRemoving) ? 'hidden' : 'initial')};

  &:hover {
    ${akHelperMixins.focusRing.none};
    background-color: ${({ markedForRemoval }) => (markedForRemoval ? akColorR50 : akColorN30)};
  }
`;
