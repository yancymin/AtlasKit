import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import SmartFieldBase from 'ak-field-base';
import SingleLineTextInput from '../src';
import { name } from '../package.json';

const containerStyle = {
  padding: 20,
  backgroundColor: 'white',
  width: 500,
};

const customTextStyle = {
  fontSize: 28,
};

const createSingleLineTextInput = props => (
  <SingleLineTextInput
    value="Lorem ipsum dolor sit amet"
    onChange={action('onChange')}
    onConfirm={action('onConfirm')}
    isEditing={false}
    {...props}
  />
);

const storyName = `${name} single-line-text-input`;

storiesOf(storyName, module)
  .add('with default font size', () => (
    <div style={containerStyle}>
      {createSingleLineTextInput()}
    </div>
  ))
  .add('with default font size in edit mode', () => (
    <div style={containerStyle}>
      {createSingleLineTextInput({ isEditing: true })}
    </div>
  ))
  .add('with auto focus', () => (
    <div style={containerStyle}>
      {createSingleLineTextInput({ isEditing: true, autoFocus: true })}
    </div>
  ))
  .add('with auto selection', () => (
    <div style={containerStyle}>
      {createSingleLineTextInput({ isEditing: true, isInitiallySelected: true })}
    </div>
  ))
  .add('with custom font size', () => (
    <div style={containerStyle}>
      {createSingleLineTextInput({ style: customTextStyle })}
    </div>
  ))
  .add('with custom font size in edit mode', () => (
    <div style={containerStyle}>
      {createSingleLineTextInput({ style: customTextStyle, isEditing: true })}
    </div>
  ))
  .add('with lots of text in read mode', () => (
    <div style={containerStyle}>
      {createSingleLineTextInput({ value: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.' })}
    </div>
  ))
  .add('with lots of text in edit mode', () => (
    <div style={containerStyle}>
      {createSingleLineTextInput({ isEditing: true, value: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.' })}
    </div>
  ))
  .add('with field base', () => (
    <div style={containerStyle}>
      <SmartFieldBase
        label="Inside a FieldBase"
      >
        {createSingleLineTextInput({
          value: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.',
          autoFocus: true,
          isEditing: false,
        })}
      </SmartFieldBase>
    </div>
  ));
