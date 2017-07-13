import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { modalBorderRadius } from '../shared-variables';

const getBorderRadius = ({ headerOrFooter }) => {
  const topBorderRadius = headerOrFooter === 'header' ? modalBorderRadius : 0;
  const bottomBorderRadius = headerOrFooter === 'footer' ? modalBorderRadius : 0;

  return `
    border-top-left-radius: ${topBorderRadius};
    border-top-right-radius: ${topBorderRadius};
    border-bottom-left-radius: ${bottomBorderRadius};
    border-bottom-right-radius: ${bottomBorderRadius};
  `;
};

export default styled.div`
  flex: 0 0 auto;
  padding: ${akGridSizeUnitless * 2}px;

  ${getBorderRadius}
`;
