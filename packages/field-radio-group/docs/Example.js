import React from 'react';
import RadioGroup from '@atlaskit/field-radio-group';

const items = [
  { name: 'color', value: 'red', label: 'Red' },
  { name: 'color', value: 'blue', label: 'Blue', defaultSelected: true },
  { name: 'color', value: 'yellow', label: 'Yellow' },
  { name: 'color', value: 'custom', label: <b>Custom Label Component</b> },
  { name: 'color', value: 'disabled', label: 'Disabled Option', isDisabled: true },
];

const Example = () => (
  <RadioGroup
    label="Basic Radio Group Example"
    items={items}
  />
);

export default Example;
