import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

let exampleCounter = 0;

export default class ToggleExample extends PureComponent {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
  }

  render() {
    exampleCounter++;
    const exampleId = `example${exampleCounter}`;
    const { checked, disabled, size } = this.props;
    return (
      <div className={`ak-field-toggle ak-field-toggle__size-${size}`}>
        <input
          type="checkbox"
          name={exampleId}
          id={exampleId}
          value={exampleId}
          defaultChecked={checked}
          disabled={disabled}
        />
        <label htmlFor={exampleId}>Option</label>
      </div>
    );
  }
}
