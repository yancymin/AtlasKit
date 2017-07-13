import React from 'react';
import TextField from '@atlaskit/field-text';

const Example = () => (
  <div>
    <TextField label="hidden label" isLabelHidden />
    <TextField autoFocus label="autofocused" />
    <TextField value="candy" label="With default value" />
    <TextField disabled label="disabled" />
    <TextField required label="Required" />
    <TextField isInvalid label="Is Invalid" />
    <TextField placeholder="Click here to input" label="With Placeholder" />
    <TextField onChange={e => console.console.log('value changed', e)} label="With change handler" />
    <TextField invalidMessage="Modal Dialog Text" label="with error message" />
    <TextField isSpellCheckEnabled={false} label="spell check disabled" />
    <TextField maxLength={5} label="Max length of 5" />
    <TextField type="Number" label="Number typed input" />
  </div>
);

export default Example;
