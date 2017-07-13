import styled from 'styled-components';
import { akColorN500, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

// Outputs the styles for actions separator: mid-dot for non-bold flags, or space for bold flags.
const getDivider = ({ hasDivider, useMidDot }) => `
  display: ${hasDivider ? 'inline-block' : 'none'};
  content: "${useMidDot ? '\u00B7' : ''}";
  width: ${useMidDot ? akGridSizeUnitless * 2 : akGridSizeUnitless}px;
`;

export default styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: ${akGridSizeUnitless}px;
`;

export const Action = styled.div`
  &::before {
    color: ${akColorN500};
    text-align: center;
    vertical-align: middle;

    ${getDivider}
  }
`;
