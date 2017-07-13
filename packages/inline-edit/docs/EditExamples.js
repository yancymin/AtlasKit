import React, { PureComponent } from 'react';
import InlineEditor from '@atlaskit/inline-edit';
import SingleLineTextInput from '@atlaskit/input';

export default class InlineEditorExamples extends PureComponent {
  state = {
    textInputVal: '',
  }

  render() {
    return (
      <InlineEditor
        label="Inline Edit Field"
        editView={<SingleLineTextInput
          isEditing
          isInitiallySelected
          value={this.state.textInputVal}
          onChange={e => this.setState({ textInputVal: e.target.value })}
        />}
        readView={<SingleLineTextInput isEditing={false} value={this.state.textInputVal || 'Field value'} />}
        onConfirm={() => {}}
        onCancel={() => console.log('cancel')}
      />
    );
  }
}
