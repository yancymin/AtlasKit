import React, { PureComponent } from 'react';
import { InlineEditStateless } from '@atlaskit/inline-edit';
import SingleLineTextInput from '@atlaskit/input';

export default class InlineEditorExamples extends PureComponent {
  state = {
    textInputVal: '',
    isEditing: false,
  }

  render() {
    return (
      <div>
        <InlineEditStateless
          label="Inline Edit"
          isEditing={this.state.isEditing}
          onEditRequested={() => this.setState({ isEditing: true })}
          onCancel={() => this.setState({ isEditing: false })}
          onConfirm={() => this.setState({ isEditing: false })}
          readView={
            <SingleLineTextInput
              isEditing={false}
              value={this.state.textInputVal || 'Field value'}
            />
          }
          editView={
            <SingleLineTextInput
              isEditing
              isInitiallySelected
              value={this.state.textInputVal}
              onChange={e => this.setState({ textInputVal: e.target.value })}
            />
          }
        />
      </div>
    );
  }
}
