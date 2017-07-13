import { action } from '@kadira/storybook';
import React, { PureComponent } from 'react';
import SingleLineTextInput from '@atlaskit/input';
import { InlineEditStateless } from '../src';

/* eslint-disable react/prop-types */
export default class extends PureComponent {
  static defaultProps = {
    initialValue: 'This will take 3 seconds to update',
    label: 'Slow Inline Edit',
  }

  state = {
    readValue: this.props.initialValue,
    editValue: this.props.initialValue,
    isEditing: false,
  }

  onConfirm = () => {
    this.setState({ isWaiting: true, isEditing: true });
    setTimeout(() => {
      this.setState({ isWaiting: false, isEditing: false });
      action('onConfirm slow')();
    }, 3000);
  }

  onCancel = () =>
    this.setState(state => ({ editValue: state.readValue, isEditing: false }))

  onChange = e =>
    this.setState({ editValue: e.target.value })

  renderInput = ({ isEditing }) => (
    <SingleLineTextInput
      isEditing={isEditing}
      isInitiallySelected
      value={this.state.editValue}
      onChange={this.onChange}
    />
  )

  render() {
    return (
      <InlineEditStateless
        editView={this.renderInput({ isEditing: !this.state.isWaiting })}
        readView={this.renderInput({ isEditing: false })}
        isEditing={this.state.isEditing}
        onEditRequested={() => this.setState({ isEditing: true })}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
        isWaiting={this.state.isWaiting}
        isConfirmOnBlurDisabled
        {...this.props}
      />
    );
  }
}
