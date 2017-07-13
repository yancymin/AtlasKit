import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Div from '../styled/Badge';

export const APPEARANCE_ENUM = {
  values: ['default', 'primary', 'important', 'added', 'removed'],
  defaultValue: 'default',
};

export const THEME_ENUM = {
  values: ['default', 'dark'],
  defaultValue: 'default',
};

// returns the assigned appearance if valid, falling back to the default otherwise
function validAppearance(appearance) {
  const { values, defaultValue } = APPEARANCE_ENUM;
  return values.indexOf(appearance) !== -1 ? appearance : defaultValue;
}

export default class Badge extends PureComponent {
  static propTypes = {
    /** Affects the visual style of the badge */
    appearance: PropTypes.oneOf(APPEARANCE_ENUM.values),
    /** The maximum value to display. If value is 100, and max is 50,
        "50+" will be displayed */
    max: PropTypes.number,
    /** Handler function to be called when the value prop is changed.
        Called with fn({ oldValue, newValue }) */
    onValueUpdated: PropTypes.func,
    /** Changes the badge colors for use with different color themes */
    theme: PropTypes.oneOf(THEME_ENUM.values),
    /** The value displayed within the badge. */
    value: PropTypes.number,
  }

  static defaultProps = {
    appearance: APPEARANCE_ENUM.defaultValue,
    max: 99,
    theme: THEME_ENUM.defaultValue,
    value: 0,
  }

  componentWillUpdate(nextProps) {
    const { onValueUpdated, value: oldValue } = this.props;
    const { value: newValue } = nextProps;
    if (onValueUpdated && newValue !== oldValue) {
      onValueUpdated({ oldValue, newValue });
    }
  }

  displayValue() {
    const { value, max } = this.props;
    if (value < 0) {
      return '0';
    }
    if (max > 0 && value > max) {
      return `${max}+`;
    }
    if (value === Infinity) {
      return '\u221E'; // ∞ inifinity character
    }
    return String(value);
  }

  render() {
    const { appearance, theme } = this.props;

    return (
      <Div appearance={validAppearance(appearance)} theme={theme}>
        {this.displayValue()}
      </Div>
    );
  }
}
