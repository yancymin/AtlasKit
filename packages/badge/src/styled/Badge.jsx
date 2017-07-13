import styled from 'styled-components';
import {
  akColorN30,
  akColorN500,
  akColorB400,
  akColorR300,
  akColorG50,
  akColorG500,
  akColorR50,
  akColorR500,
  akColorN0,
  akColorB50,
  akColorB500,
} from '@atlaskit/util-shared-styles';

const backgroundColor = {
  added: akColorG50,
  darkTheme: akColorB50,
  default: akColorN30,
  important: akColorR300,
  primary: akColorB400,
  removed: akColorR50,
};
const textColor = {
  added: akColorG500,
  darkTheme: akColorB500,
  default: akColorN500,
  important: akColorN0,
  primary: akColorN0,
  removed: akColorR500,
};

const getBackgroundColor = ({ appearance, theme }) => (theme === 'dark'
  ? backgroundColor.darkTheme
  : backgroundColor[appearance]
);

const getTextColor = ({ appearance, theme }) => (theme === 'dark'
  ? textColor.darkTheme
  : textColor[appearance]
);

const BadgeElement = styled.div`
  background-color: ${getBackgroundColor};
  border-radius: 2em;
  color: ${getTextColor};
  display: inline-block;
  font-size: 12px;
  font-weight: normal;
  line-height: 1;
  min-width: 1px;
  padding: 0.16666666666667em 0.5em;
  text-align: center;
`;
BadgeElement.displayName = 'BadgeElement';
export default BadgeElement;
