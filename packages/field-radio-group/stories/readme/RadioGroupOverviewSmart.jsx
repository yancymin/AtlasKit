import React from 'react';
import FieldRadioGroup from '@atlaskit/field-radio-group';

const items = [
  { name: 'color', value: 'red', label: 'Red' },
  { name: 'color', value: 'blue', label: 'Blue', defaultSelected: true },
  { name: 'color', value: 'yellow', label: 'Yellow' },
  { name: 'color', value: 'green', label: 'Green' },
];

export default (
  <FieldRadioGroup
    items={items}
    label="Pick your favourite color:"
    onRadioChange={(e) => {
      // We don't need to worry about setting the state here, but we can still do other things
      console.log(e.target.value);
    }}
  />
);
