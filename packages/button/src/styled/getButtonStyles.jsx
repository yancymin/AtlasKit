import { css } from 'styled-components';
import {
  akGridSizeUnitless,
  akFontSizeDefault,
  akBorderRadius,
} from '@atlaskit/util-shared-styles';
import themeDefinitions from './themeDefinitions';

const akFontSizeUnitless = parseInt(akFontSizeDefault, 10);
const buttonHeight = `${(akGridSizeUnitless * 4) / akFontSizeUnitless}em`;
const compactButtonHeight = `${(akGridSizeUnitless * 3) / akFontSizeUnitless}em`;

const getState = ({
  disabled,
  isActive,
  isHover,
  isSelected,
}) => {
  if (disabled) return 'disabled';
  if (isSelected) return 'selected';
  if (isActive) return 'active';
  if (isHover) return 'hover';
  return 'default';
};

export const getPropertyAppearance = (property, props = {}, definitions = themeDefinitions) => {
  const { appearance, theme } = props;
  const { themes, fallbacks } = definitions;

  const themeStyles = themes[theme] || themes.default;
  const appearanceStyles = themeStyles[appearance] || themeStyles.default;
  const propertyStyles = appearanceStyles[property];

  if (!propertyStyles) {
    return fallbacks[property] || 'initial';
  }

  const state = getState(props);

  // console.log('getting styles');

  return propertyStyles[state] || propertyStyles.default || fallbacks[property];
};

export default function getButtonStyles(props) {
  /**
   * Variable styles
   */
  let cursor = 'default';
  let height = buttonHeight;
  let lineHeight = buttonHeight;
  let outline = 'none';
  let padding = `0 ${akGridSizeUnitless}px`;
  let pointerEvents = 'auto';
  let transitionDuration = '0.1s, 0.15s';
  let transition = 'background 0.1s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)';
  let verticalAlign = 'middle';
  let width = 'auto';

  // Spacing: Compact
  if (props.spacing === 'compact') {
    height = compactButtonHeight;
    lineHeight = compactButtonHeight;
  }

  // Spacing: None
  if (props.spacing === 'none') {
    height = 'auto';
    lineHeight = 'inherit';
    padding = '0';
    verticalAlign = 'baseline';
  }

  // Interaction: Hover
  if (props.isHover) {
    cursor = 'pointer';
    transition = 'background 0s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)';
  }

  // Interaction: Active
  if (props.isActive) {
    transitionDuration = '0s';
  }

  // Interaction: Focus
  if (props.isFocus) {
    outline = 'none';
    transitionDuration = '0s, 0.2s';
  }

  // Disabled
  if (props.disabled) {
    pointerEvents = 'none';
    cursor = 'not-allowed';
  }

  // Fit to parent width
  if (props.fit) {
    width = '100%';
  }

  /**
   * Appearance + Theme styles
   */
  const background = getPropertyAppearance('background', props);
  const color = getPropertyAppearance('color', props);
  const textDecoration = getPropertyAppearance('textDecoration', props);

  return css`
    align-items: baseline;
    background: ${background};
    box-sizing: border-box;
    border-radius: ${akBorderRadius};
    border-width: 0;
    width: ${width};
    color: ${color};
    cursor: ${cursor};
    display: inline-flex;
    font-style: normal;
    font-size: inherit;
    height: ${height};
    line-height: ${lineHeight};
    margin: 0;
    outline: ${outline};
    padding: ${padding};
    pointer-events: ${pointerEvents};
    text-align: center;
    text-decoration: ${textDecoration};
    transition-duration: ${transitionDuration};
    transition: ${transition};
    user-select: none;
    vertical-align: ${verticalAlign};
    white-space: nowrap;

    &::-moz-focus-inner {
      border: 0;
      margin: 0;
      padding: 0;
    }
  `;
}
