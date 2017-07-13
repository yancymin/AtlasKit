import styled from 'styled-components';
import {
  akHelperMixins,

  akColorN500,
  akColorR300,
  akColorR500,
} from '@atlaskit/util-shared-styles';
import { buttonWidthUnitless, borderRadius } from './constants';

// NOTE:
// "-moz-focus-inner" removes some inbuilt padding that Firefox adds (taken from reduced-ui-pack)
// the focus ring is red unless combined with hover, then uses default blue
export default styled.button`
  align-items: center;
  appearance: none;
  background: none;
  border: none;
  border-radius: ${({ isRounded }) => (isRounded ? `${buttonWidthUnitless / 2}px` : borderRadius)};
  color: ${akColorN500};
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;

  ${akHelperMixins.focusRing.generate(akColorR300)}

  &:hover {
    color: ${akColorR500};
    ${akHelperMixins.focusRing.default}
  }

  &::-moz-focus-inner { border: 0; margin: 0; padding: 0; }
`;
