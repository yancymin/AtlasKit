import React from 'react';
import Select from '@atlaskit/single-select';

const selectItems = [
  {
    items: [
      { content: 'Sydney', value: 'city_1' },
      { content: 'Canberra', value: 'city_2' },
      { content: 'Melbourne', value: 'city_3' },
      { content: 'Perth', value: 'city_4', isDisabled: true },
    ],
  },
];

const selectedItem = selectItems[0].items[0];

export default (
  <Select
    defaultSelected={selectedItem}
    hasAutocomplete
    items={selectItems}
    placeholder="Select all!"
  />
);
