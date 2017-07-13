import styled from 'styled-components';
import { akColorN0 } from '@atlaskit/util-shared-styles';
import { getHeight, paddingUnitless, transition } from './constants';

const colors = {
  default: akColorN0,
  checkedDisabled: '#A1DCC4',
  uncheckedDisabled: '#AFB6C2',
};

const getBackgroundColor = ({ isChecked, isDisabled }) => {
  let color = colors.default;

  if (isDisabled) color = colors.uncheckedDisabled;
  if (isDisabled && isChecked) color = colors.checkedDisabled;

  return color;
};
const getTransform = ({ isChecked, size }) => (isChecked
  ? `translateX(${getHeight({ size })}px)`
  : 'initial'
);

export default styled.span`
  background-color: ${getBackgroundColor};
  border-radius: 50%;
  bottom: ${2 * paddingUnitless}px;
  content: "";
  height: ${props => getHeight(props) - (paddingUnitless * 2)}px;
  left: ${2 * paddingUnitless}px;
  position: absolute;
  transform: ${getTransform};
  transition: ${transition};
  width: ${props => getHeight(props) - (paddingUnitless * 2)}px;
`;
