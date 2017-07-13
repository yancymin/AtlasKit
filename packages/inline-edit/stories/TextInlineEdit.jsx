import { action } from '@kadira/storybook';
import React, { PureComponent } from 'react';
import SingleLineTextInput from '@atlaskit/input';
import uid from 'uid';
import InlineEdit from '../src';

/* eslint-disable react/prop-types */
export default class extends PureComponent {
  static defaultProps = {
    initialValue: 'Text',
    label: 'Inline Edit',
  }

  state = {
    readValue: this.props.initialValue,
    editValue: this.props.initialValue,
  }

  onChange = e =>
    this.setState({ editValue: e.target.value })

  onConfirm = () => {
    action('onConfirm')();
    this.setState(state => ({ readValue: state.editValue }));
  }

  onCancel = () => {
    action('onCancel')();
    this.setState(state => ({ editValue: state.readValue }));
  }

  renderInput = ({ isEditing, id }) => (
    <SingleLineTextInput
      id={id}
      isEditing={isEditing}
      isInitiallySelected
      value={this.state.editValue}
      onChange={this.onChange}
    />
  )

  render() {
    const id = uid();
    return (
      <InlineEdit
        label={this.props.label}
        labelHtmlFor={id}
        editView={this.renderInput({ isEditing: true, id })}
        readView={this.renderInput({ isEditing: false, id })}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
        {...this.props}
      />
    );
  }
}
