import React, { PureComponent } from 'react';
import InlineEditor from '@atlaskit/inline-edit';
import SingleLineTextInput from '@atlaskit/input';

export default class InlineEditorExamples extends PureComponent {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <InlineEditor
          label="Waiting State"
          isWaiting
          editView={<SingleLineTextInput
            isEditing
            isInitiallySelected
          />}
          readView={<SingleLineTextInput isEditing={false} value={'This will be styled as disabled'} />}
          onConfirm={() => {}}
          onCancel={() => console.log('cancel')}
        />
        <InlineEditor
          label="Invalid State"
          isInvalid
          editView={<SingleLineTextInput
            isEditing
            isInitiallySelected
          />}
          readView={<SingleLineTextInput isEditing={false} value={'This will be styled as invalid'} />}
          onConfirm={() => {}}
          onCancel={() => console.log('cancel')}
        />
      </div>
    );
  }
}
