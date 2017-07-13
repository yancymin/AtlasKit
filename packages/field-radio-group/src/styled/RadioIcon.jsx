import styled from 'styled-components';
import {
    backgroundColor,
    backgroundColorFocus,
    backgroundColorHover,
    backgroundColorSelected,
    backgroundColorSelectedHover,
    borderColor,
    borderColorFocus,
    borderColorHover,
    borderColorSelected,
    borderColorSelectedHover,
    borderWidth,
    borderWidthFocus,
    fullHeight,
    fullWidth,
} from './constants';

const getStyles = ({
  isDisabled,
  isFocus,
  isHover,
  isSelected,
}) => {
  const styles = {
    'background-color': backgroundColor,
    'border-width': `${borderWidth}px`,
    'border-style': 'solid',
    'border-color': borderColor,
    'border-radius': '50%',
    'box-sizing': 'border-box',
    cursor: 'pointer',
    display: 'inline-block',
    height: `${fullHeight}px`,
    margin: '2px',
    position: 'relative',
    'vertical-align': 'middle',
    width: `${fullWidth}px`,
  };

  // Hover (not Disabled)
  if (isHover && !isDisabled) {
    styles['background-color'] = backgroundColorHover;
    styles['border-color'] = borderColorHover;
  }

  // Focus
  if (isFocus) {
    styles['background-color'] = backgroundColorFocus;
    styles['border-color'] = borderColorFocus;
    styles['border-width'] = `${borderWidthFocus}px`;
    styles['box-sizing'] = 'content-box';
    styles.margin = '0';
  }

  // Focus + Hover
  if (isFocus && isHover) {
    styles['background-color'] = backgroundColorHover;
  }

  // Selected
  if (isSelected) {
    styles['background-color'] = backgroundColorSelected;
    styles['border-color'] = borderColorSelected;
  }

  // Selected + Hover (not Disabled)
  if (isSelected && isHover && !isDisabled) {
    styles['background-color'] = backgroundColorSelectedHover;
    styles['border-color'] = borderColorSelectedHover;
  }

  // Selected + Focus (not Disabled)
  if (isSelected && isFocus && !isDisabled) {
    styles['background-color'] = backgroundColorSelected;
    styles['border-color'] = borderColorFocus;
  }

  // Selected + Focus + Hover
  if (isSelected && isFocus && isHover) {
    styles['background-color'] = borderColorSelectedHover;
  }

  // Disabled
  if (isDisabled) {
    styles.opacity = 0.5;
    styles.cursor = 'default';
  }

  return styles;
};

const stringifyStyles = styles => Object.keys(styles)
  .reduce((styleString, key) => `${styleString}
    ${key}: ${styles[key]};`, '');

const RadioIcon = styled.span`${props => stringifyStyles(getStyles(props))}`;

RadioIcon.displayName = 'RadioIcon';

export default RadioIcon;
