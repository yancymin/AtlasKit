import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import AkFieldRadioGroup from './RadioGroupStateless';
import { itemsPropTypeSmart } from './constants';

// ========================================================================
// NOTE: Duplicated in ./internal/constants unitl docgen can follow imports.
// -------------------------------------------------------------
// DO NOT update values here without updating the other.
// ========================================================================
const itemsDefault = [];

export default class FieldRadioGroup extends PureComponent {
  static propTypes = {
    /** Mark whether this field is required for form validation. */
    isRequired: PropTypes.bool,
    /** Items to be rendered by a single Radio component. Passes options down to
    an AkRadio component, with label passed as children. */
    items: itemsPropTypeSmart,
    /** Label to display above the radio button options. */
    label: PropTypes.string,
    /** Called when the value changes; passed the event */
    onRadioChange: PropTypes.func,
  }

  static defaultProps = {
    isRequired: false,
    items: itemsDefault,
    onRadioChange: () => {},
  }

  constructor() {
    super();
    this.state = {
      selectedValue: null, // Overrides default once user selects a value.
    };
  }

  getItems = () => {
    // If there is a user-selected value, then select that item
    if (this.state.selectedValue) {
      return this.props.items.map(item => (
        item.value === this.state.selectedValue
          ? { ...item, ...{ isSelected: true } }
          : item
      ));
    }

    // Otherwise, look for a defaultSelected item and select that item
    const hasDefaultSelected = this.props.items.some(item => item.defaultSelected);
    if (hasDefaultSelected) {
      return this.props.items.map(item => (
        item.defaultSelected
          ? { ...item, ...{ isSelected: true } }
          : item
      ));
    }
    return this.props.items;
  }

  changeHandler = (event) => {
    this.props.onRadioChange(event);
    this.setState({ selectedValue: event.target.value });
  }

  render() {
    return (
      <AkFieldRadioGroup
        label={this.props.label}
        onRadioChange={this.changeHandler}
        isRequired={this.props.isRequired}
        items={this.getItems()}
      />
    );
  }
}
