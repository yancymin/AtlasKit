import styled from 'styled-components';
import {
  akColorN0,
  akColorN800,
  akColorR400,
  akColorY300,

  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import { TRANSITION_DURATION } from './constants';

const backgroundColor = {
  error: akColorR400,
  warning: akColorY300,
};
const textColor = {
  error: akColorN0,
  warning: akColorN800,
};

export const getBackgroundColor = ({ appearance }) => backgroundColor[appearance];
export const getTextColor = ({ appearance }) => textColor[appearance];

export default styled.div`
  align-items: center;
  background-color: ${getBackgroundColor};
  color: ${getTextColor};
  display: flex;
  font-weight: 500;
  justify-content: center;
  padding: ${akGridSizeUnitless * 2}px;
  text-align: center;
  transition: color ${TRANSITION_DURATION};
`;
