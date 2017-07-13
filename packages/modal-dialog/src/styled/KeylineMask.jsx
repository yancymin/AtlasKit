import styled from 'styled-components';
import { akColorN0, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { modalShadowInnerSize } from '../shared-variables';

const getTopOrBottomPosition = ({ headerOrFooter }) => {
  if (headerOrFooter === 'header') {
    return `
      left: 0;
      position: absolute;
      top: 0;
      right: 0;
    `;
  } else if (headerOrFooter === 'footer') {
    return `
      margin: 0 ${akGridSizeUnitless * -2}px;
    `;
  }
  return null;
};

export default styled.div`
  background: ${akColorN0};
  content: "";
  display: block;
  height: ${modalShadowInnerSize}px;

  ${getTopOrBottomPosition}
`;
