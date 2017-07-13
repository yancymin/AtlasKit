import styled, { css } from 'styled-components';

import {
  backgroundColor,
  backgroundColorDisabled,
  backgroundColorFocused,
  backgroundColorHover,
  backgroundColorSubtle,
  borderColor,
  borderColorDisabled,
  borderColorFocused,
  borderColorHover,
  borderRadius,
  borderWidth,
  borderWidthFocused,
  borderWidthSubtle,
  colorDisabled,
  colorInvalid,
  fontSize,
  heightBase,
  heightCompact,
  horizontalPadding,
  innerHeight,
  lineHeight,
  transitionDuration,
} from './constants';

const getBorderAndPadding = ({ paddingDisabled, invalid, focused, compact, subtle, none }) => {
  let border;
  const height = compact ? heightCompact : heightBase;
  if (invalid || focused || none) border = borderWidthFocused;
  else if (subtle) border = borderWidthSubtle;
  else border = borderWidth;
  const padding = (paddingDisabled)
    ? css`0`
    : `${(height - (2 * border) - innerHeight) / 2}px ${horizontalPadding - border}px;`;

  return css`
    border-width: ${border}px;
    padding: ${padding};
  `;
};

const getBackgroundColor = ({ disabled, none, focused, subtle }) => {
  if (disabled) return backgroundColorDisabled;
  if (none || subtle) return 'transparent';
  if (focused) return backgroundColorFocused;
  return backgroundColor;
};

const contentDisabled = css`
  color: ${colorDisabled};
  pointer-events: none;
`;

const getHoverState = ({ invalid, readOnly, focused, none }) => {
  if (readOnly || focused || none) return '';
  return css`
    &:hover {
      background-color: ${invalid ? backgroundColorSubtle : backgroundColorHover};
      border-color: ${invalid ? colorInvalid : borderColorHover};
    }
  `;
};

const getBorderColor = ({ disabled, invalid, focused }) => {
  if (disabled) return borderColorDisabled;
  if (invalid) return colorInvalid;
  if (focused) return borderColorFocused;
  return borderColor;
};

const getFocusedSate = ({ focused, subtle, paddingDisabled, readOnly, none }) => {
  if (!focused || readOnly || none) return '';
  return css`
    ${paddingDisabled && subtle ? `margin: -${borderWidthFocused}px` : ''}
    ${paddingDisabled && !subtle ? `margin: -${borderWidthFocused / 2}px` : ''}
  `;
};

const Content = styled.div`
  background-color: ${props => getBackgroundColor(props)};
  ${props => getBorderAndPadding(props)}
  ${props => getHoverState(props)}
  border-color: ${props => getBorderColor(props)};
  border-radius: ${borderRadius};
  border-style: solid;
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  font-size: ${fontSize}px;
  justify-content: space-between;
  line-height: ${lineHeight};
  max-width: 100%;
  min-height: ${innerHeight}px;
  overflow: hidden;
  transition: background-color ${transitionDuration} ease-in-out, border-color ${transitionDuration} ease-in-out;
  word-wrap: break-word;
  ${props => getFocusedSate(props)}
  ${({ none }) => (none ? css`border: none;` : '')}
  ${({ invalid, paddingDisabled }) => (invalid && paddingDisabled
    ? css`margin: -${borderWidthFocused / 2}px;`
    : ''
  )}
  ${({ disabled }) => (disabled ? contentDisabled : '')}
`;

export default Content;
