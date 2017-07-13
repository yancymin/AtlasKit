import styled, { css } from 'styled-components';
import { akBorderRadius } from '@atlaskit/util-shared-styles';

import {
  colorActive,
  colorFocus,
  colorLabelDefault,
  colorLineDefault,
  colorSelected,
  focusWidth,
  fontSize,
  lineHeight,
  paddingHorizontal,
  paddingVertical,
} from './constants';

const labelsLine = css`
  background-color: ${colorLineDefault};
  border-radius: 2px;
  bottom: 0;
  content: '';
  height: 2px;
  left: ${paddingHorizontal}px;
  margin: 0;
  position: absolute;
  right: ${paddingHorizontal}px;
  width: inherit;
`;

const selectedStyles = css`
  &::after {
    ${labelsLine}
  }
  color: ${colorSelected};

  &::after {
    background-color: currentcolor;
  }
`;

const TabLabels = styled.ul`
  display: flex;
  font-weight: 500;
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  &:not(:empty)::before {
    ${labelsLine}
  }
`;

/* shared with .ak-tabs-button-container */
const TabLabel = styled.li`
  color: ${colorLabelDefault};
  cursor: pointer;
  font-size: ${fontSize}px;
  line-height: ${lineHeight}px;
  margin: 0;
  padding: ${paddingVertical}px ${paddingHorizontal}px;
  white-space: nowrap;

  &:hover,
  &:active,
  &:active::before{
    color: ${colorActive};
  }

  &:focus {
    border-radius: ${akBorderRadius};
    box-shadow: 0 0 0 ${focusWidth}px ${colorFocus} inset;
    outline: none;
  }

  position: relative;
  ${({ isSelected }) => (isSelected ? selectedStyles : '')}
`;

export {
  TabLabel,
  TabLabels,
};
