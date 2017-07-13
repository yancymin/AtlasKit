import { action } from '@kadira/storybook';
import React, { PureComponent } from 'react';
import SingleLineTextInput from '@atlaskit/input';
import Select from '@atlaskit/single-select';
import styled from 'styled-components';
import { InlineEditStateless } from '../src';

// Prevent edit views that use their own field-base from shifting due to negative margin
// set in 'no-padding' mode. Fixes shifting content for single-select
const NoFieldBaseEditWrapper = styled.div`
  margin: 1px -1px 1px 1px;
`;

/* eslint-disable react/prop-types */
export default class extends PureComponent {
  defaultProps = {
    selectItems: [
      {
        items: [
          { content: 'Some Readable Value', value: 'some_id' },
        ],
      },
    ],
  }

  state = {
    isEditing: false,
    editValue: this.props.selectItems[0].items[0],
    readValue: this.props.selectItems[0].items[0],
  }

  onConfirm = () => {
    this.setState(state => ({ readValue: state.editValue, isEditing: false }));
    action('onConfirm')(this.state.editValue.value);
  }

  onCancel = () => {
    this.setState(state => ({ editValue: state.readValue, isEditing: false }));
    action('onCancel')();
  }

  onSelect = (e) => {
    this.setState({ editValue: e.item }, this.onConfirm);
  }

  renderReadView = () => (
    <SingleLineTextInput
      isEditing={false}
      value={this.state.readValue.content}
    />
  )

  renderEditView = () => (
    <NoFieldBaseEditWrapper>
      <Select
        defaultSelected={this.state.editValue}
        items={this.props.selectItems}
        onSelected={this.onSelect}
        isDefaultOpen
        shouldFitContainer
        shouldFocus
      />
    </NoFieldBaseEditWrapper>
  );

  render() {
    return (
      <InlineEditStateless
        editView={this.renderEditView()}
        readView={this.renderReadView()}
        isEditing={this.state.isEditing}
        onEditRequested={() => this.setState({ isEditing: true })}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
        disableEditViewFieldBase
        areActionButtonsHidden
        {...this.props}
      />
    );
  }
}
