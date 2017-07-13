import styled from 'styled-components';
import {
  akColorB100,
  akColorG300,
  akColorG500,
  akColorN200,
  akColorN80,
} from '@atlaskit/util-shared-styles';
import {
  borderWidth,
  getHeight,
  getWidth,
  transition,
} from './constants';

const colors = {
  bgChecked: akColorG300,
  bgCheckedHover: akColorG500,
  bgCheckedDisabled: '#35B885',

  bgUnchecked: akColorN80,
  bgUncheckedHover: akColorN200,
  bgUncheckedDisabled: '#f3f4f5',
};

const getBgColor = ({ isChecked, isDisabled }) => {
  let color = colors.bgUnchecked;

  if (isChecked) color = colors.bgChecked;
  if (isDisabled && !isChecked) color = colors.bgUncheckedDisabled;
  if (isDisabled && isChecked) color = colors.bgCheckedDisabled;

  return color;
};
const getHoverStyles = ({ isChecked, isDisabled }) => {
  let bgcolor;
  if (!isDisabled) {
    bgcolor = isChecked ? colors.bgCheckedHover : colors.bgUncheckedHover;
  }

  return `
    &:hover {
      background-color: ${bgcolor};
      cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
    }
  `;
};
const getBorderColor = ({ isFocused }) => (isFocused ? akColorB100 : 'transparent');

export default styled.div`
  background-clip: content-box;
  background-color: ${getBgColor};
  border-radius: ${getHeight}px;
  border: ${borderWidth} solid ${getBorderColor};
  display: block;
  height: ${getHeight}px;
  padding: ${borderWidth};
  position: relative;
  transition: ${transition};
  width: ${getWidth}px;

  ${getHoverStyles}
`;
