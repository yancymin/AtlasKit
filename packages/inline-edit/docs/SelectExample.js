import React, { PureComponent } from 'react';
import InlineEditor from '@atlaskit/inline-edit';
import Select from '@atlaskit/single-select';

const selectItems = [{
  heading: 'Cities',
  items: [
    { content: 'Sydney', value: 'sydney' },
    { content: 'Canberra', value: 'canberra' },
  ],
}];

export default class InlineEditorExamples extends PureComponent {
  state = {}
  render() {
    return (
      <InlineEditor
        label="Inline Edit select field"
        disableEditViewFieldBase
        onConfirm={() => console.log('Edit confirmed')}
        onCancel={() => console.log('cancel')}
        readView={this.state.selectInputVal ? this.state.selectInputVal.item.content : 'Select Field'}
        editView={
          <Select
            items={selectItems}
            onSelected={e => this.setState({ selectInputVal: e })}
            isDefaultOpen
            shouldFitContainer
            shouldFocus
            defaultSelected={
              this.state.selectInputVal
              ? this.state.selectInputVal.item
              : undefined
            }
          />
        }
      />
    );
  }
}
