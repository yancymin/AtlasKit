import React from 'react';
import { AkFieldRadioGroup } from '@atlaskit/field-radio-group';

const items = [
  { name: 'color', value: 'red', label: 'Red' },
  { name: 'color', value: 'blue', label: 'Blue', isSelected: true },
  { name: 'color', value: 'yellow', label: 'Yellow' },
];

const changeHandler = (event) => {
  console.log(`Radio item for ${event.target.value} was selected.`);
  // Update your state here.
};

export default (
  <AkFieldRadioGroup
    items={items}
    label="Pick your favourite color:"
    onRadioChange={changeHandler}
  />
);
