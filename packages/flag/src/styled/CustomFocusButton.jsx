import Button from '@atlaskit/button';
import styled from 'styled-components';
import { akHelperMixins } from '@atlaskit/util-shared-styles';

const { focusRing: { generate: createFocusRing } } = akHelperMixins;

// The !important part below is required to override the default AkButton focus ring style.
// See https://codepen.io/bgummeratlassian/pen/aWMQPz?editors=0010 for an example.
export const getFocusRingStyle = ({ focusRingColor }) => (
  focusRingColor ? createFocusRing(`${focusRingColor} !important`) : ''
);

export default styled(Button)`
  ${getFocusRingStyle}
`;
