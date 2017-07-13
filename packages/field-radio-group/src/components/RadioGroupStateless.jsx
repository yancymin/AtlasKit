import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Base from 'ak-field-base';
import Radio from './Radio';
import { itemsPropType } from './constants';

// ========================================================================
// NOTE: Duplicated in ./internal/constants unitl docgen can follow imports.
// -------------------------------------------------------------
// DO NOT update values here without updating the other.
// ========================================================================

const itemsDefault = [];

/* eslint-disable-next-line react/prefer-stateless-function */
export default class FieldRadioGroup extends PureComponent {
  static propTypes = {
    /** Mark whether this field is required for form validation. */
    isRequired: PropTypes.bool,
    /** Items to be rendered by a single Radio component. Passes options down to
    an AkRadio component, with label passed as children. */
    items: itemsPropType,
    /** Label to display above the radio button options. */
    label: PropTypes.string,
    /** Handler called whenever a new radio button is selected. Called with the
    value of the new selection. */
    onRadioChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isRequired: false,
    items: itemsDefault,
    label: '',
  }

  renderItems = () => (
    this.props.items.map((item, index) => (
      <Radio
        key={index}
        isDisabled={item.isDisabled}
        isRequired={this.props.isRequired}
        isSelected={item.isSelected}
        name={item.name}
        onChange={this.props.onRadioChange}
        value={item.value}
      >
        {item.label}
      </Radio>
    ))
  );

  render() {
    return (
      <Base
        appearance="none"
        isRequired={this.props.isRequired}
        label={this.props.label}
      >
        <div
          aria-label={this.props.label}
          role="group"
        >
          {this.renderItems()}
        </div>
      </Base>
    );
  }
}
