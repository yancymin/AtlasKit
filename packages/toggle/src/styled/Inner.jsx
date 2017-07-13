import styled from 'styled-components';
import { akColorN0 } from '@atlaskit/util-shared-styles';
import { transition } from './constants';

const colors = {
  default: akColorN0,
  checkedDisabled: '#A1DCC4',
  uncheckedDisabled: '#AFB6C2',
};

const getColor = ({ isChecked, isDisabled }) => {
  let color = colors.default;

  if (isDisabled) color = colors.uncheckedDisabled;
  if (isDisabled && isChecked) color = colors.checkedDisabled;

  return color;
};
const getFlexDirection = ({ isChecked }) => (isChecked ? 'row' : 'row-reverse');

export default styled.div`
  color: ${getColor};
  display: inline-flex;
  flex-direction: ${getFlexDirection};
  height: 100%;
  transition: ${transition};
  width: 100%;
`;
