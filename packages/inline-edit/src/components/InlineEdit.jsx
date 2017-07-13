import React, { PureComponent, PropTypes } from 'react';
import InlineEditStateless from './InlineEditStateless';

export default class extends PureComponent {
  static propTypes = {
    /** Function passed to stateless component, isEditing will be set to false
    before the passed function is called. */
    onConfirm: PropTypes.func.isRequired,
    /** Function passed to stateless component, isEditing will be set to false
    before the passed function is called. */
    onCancel: PropTypes.func.isRequired,
  }

  state = {
    isEditing: false,
  }

  onConfirm = () => {
    this.exitEditingMode();
    const cancelConfirmation = this.enterEditingMode;
    this.props.onConfirm(cancelConfirmation);
  }

  onCancel = () => {
    this.exitEditingMode();
    this.props.onCancel();
  }

  enterEditingMode = () =>
    this.setState({ isEditing: true });

  exitEditingMode = () =>
    this.setState({ isEditing: false });

  render() {
    return (
      <InlineEditStateless
        isEditing={this.state.isEditing}
        {...this.props}
        onEditRequested={this.enterEditingMode}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
      />
    );
  }
}
