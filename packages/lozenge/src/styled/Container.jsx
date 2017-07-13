import styled from 'styled-components';
import {
  akBorderRadius,

  akColorB50,
  akColorB500,
  akColorG50,
  akColorG500,
  akColorN0,
  akColorN20,
  akColorN40,
  akColorN500,
  akColorN600,
  akColorN700,
  akColorP50,
  akColorP500,
  akColorR50,
  akColorR500,
  akColorY50,
  akColorY500,

  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';

const HORIZONTAL_SPACING = `${akGridSizeUnitless / 2}px`;

const backgroundColor = {
  default: akColorN20,
  inprogress: akColorB50,
  moved: akColorY50,
  new: akColorP50,
  removed: akColorR50,
  success: akColorG50,
};
const textColor = {
  default: akColorN500,
  inprogress: akColorB500,
  moved: akColorN600,
  new: akColorP500,
  removed: akColorR500,
  success: akColorG500,
};

const boldBackgroundColor = {
  default: akColorN40,
  inprogress: akColorB500,
  moved: akColorY500,
  new: akColorP500,
  removed: akColorR500,
  success: akColorG500,
};
const boldTextColor = {
  default: akColorN700,
  inprogress: akColorN0,
  moved: akColorN600,
  new: akColorN0,
  removed: akColorN0,
  success: akColorN0,
};

const getBackgroundColor = ({ appearance, isBold }) => (isBold
  ? boldBackgroundColor[appearance]
  : backgroundColor[appearance]
);
const getTextColor = ({ appearance, isBold }) => (isBold
  ? boldTextColor[appearance]
  : textColor[appearance]
);

export default styled.span`
  background-color: ${getBackgroundColor};
  border-radius: ${akBorderRadius};
  box-sizing: border-box;
  color: ${getTextColor};
  display: inline-flex;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  max-width: 200px;
  padding: 2px ${HORIZONTAL_SPACING} 3px ${HORIZONTAL_SPACING};
  text-transform: uppercase;
  vertical-align: baseline;
  white-space: nowrap;
`;
