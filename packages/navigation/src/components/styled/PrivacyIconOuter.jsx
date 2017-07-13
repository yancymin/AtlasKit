import styled from 'styled-components';
import { unthemedColors } from '../../shared-variables';

/**
 * This entire class is a workaround to have privacy icons appear correctly on avatars.
 * Hopefully the Avatar 1.2 design spec will come to the rescue with a "restricted" option on a
 * "status" prop.
 */
const PrivacyIconOuter = styled.div`
  background-color: ${unthemedColors.presenceIconBg};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

PrivacyIconOuter.displayName = 'PrivacyIconOuter';
export default PrivacyIconOuter;
