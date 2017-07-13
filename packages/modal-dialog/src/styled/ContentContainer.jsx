import styled from 'styled-components';
import { akColorN30, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { modalShadowInnerSize } from '../shared-variables';

const boxShadow = (modalShadowDirectionFlip = 1) => (
  `inset 0px ${modalShadowInnerSize * modalShadowDirectionFlip}px 0px 0px ${akColorN30}`
);

const getBoxShadows = ({ hasHeader, hasFooter }) => {
  if (hasHeader && hasFooter) {
    return `${boxShadow()}, ${boxShadow(-1)}`;
  } else if (hasHeader) {
    return boxShadow();
  } else if (hasHeader) {
    return boxShadow(-1);
  }
  return 'none';
};

export default styled.div`
  box-shadow: ${getBoxShadows};
  flex: 0 1 auto;
  overflow-y: auto;
  padding: 0 ${akGridSizeUnitless * 2}px;
  position: relative;
`;
