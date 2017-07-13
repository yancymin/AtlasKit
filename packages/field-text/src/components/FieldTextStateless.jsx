import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Base, { Label } from '@atlaskit/field-base';
import Input from '../styled/Input';

export default class FieldText extends PureComponent {
  static propTypes = {
    /** Set whether the fields should expand to fill available horizontal space. */
    compact: PropTypes.bool,
    /** Type value to be passed to the html input. */
    type: PropTypes.string,
    /** Sets the field as uneditable, with a changed hover state. */
    disabled: PropTypes.bool,
    /** If true, prevents the value of the input from being edited. */
    isReadOnly: PropTypes.bool,
    /** Add asterisk to label. Set required for form that the field is part of. */
    required: PropTypes.bool,
    /** Sets styling to indicate that the input is invalid. */
    isInvalid: PropTypes.bool,
    /** Label to be displayed above the input. */
    label: PropTypes.string,
    /** Name value to be passed to the html input. */
    name: PropTypes.string,
    /** Text to display in the input if the input is empty. */
    placeholder: PropTypes.string,
    /** The value of the input. */
    value: PropTypes.string,
    /** Handler to be called when the input changes. */
    onChange: PropTypes.func.isRequired,
    /** Id value to be passed to the html input. */
    id: PropTypes.string,
    /** Sets whether to show or hide the label. */
    isLabelHidden: PropTypes.bool,
    /** Provided component is rendered inside a modal dialogue when the field is
    selected. */
    invalidMessage: PropTypes.node,
    /** Ensure the input fits in to its containing element. */
    shouldFitContainer: PropTypes.bool,
    /** Sets whether to apply spell checking to the content. */
    isSpellCheckEnabled: PropTypes.bool,
    /** Sets whether the component should be automatically focused on component
    render. */
    autoFocus: PropTypes.bool,
    /** Set the maximum length that the entered text can be. */
    maxLength: PropTypes.number,
  }

  static defaultProps = {
    compact: false,
    disabled: false,
    isReadOnly: false,
    required: false,
    isInvalid: false,
    type: 'text',
    isSpellCheckEnabled: true,
  }

  focus() {
    this.input.focus();
  }

  render() {
    return (
      <div>
        <Label
          label={this.props.label}
          htmlFor={this.props.id}
          isLabelHidden={this.props.isLabelHidden}
          isRequired={this.props.required}
        />
        <Base
          isCompact={this.props.compact}
          isDisabled={this.props.disabled}
          isInvalid={this.props.isInvalid}
          isReadOnly={this.props.isReadOnly}
          isRequired={this.props.required}
          invalidMessage={this.props.invalidMessage}
          isFitContainerWidthEnabled={this.props.shouldFitContainer}
        >
          <Input
            type={this.props.type}
            disabled={this.props.disabled}
            readOnly={this.props.isReadOnly}
            name={this.props.name}
            placeholder={this.props.placeholder}
            value={this.props.value}
            required={this.props.required}
            onChange={this.props.onChange}
            id={this.props.id}
            autoFocus={this.props.autoFocus}
            spellCheck={this.props.isSpellCheckEnabled}
            maxLength={this.props.maxLength}
            innerRef={(input) => { this.input = input; }}
          />
        </Base>
      </div>
    );
  }
}
