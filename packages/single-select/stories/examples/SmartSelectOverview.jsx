import React from 'react';
import Select from '@atlaskit/single-select';

const selectItems = [
  {
    heading: 'Cities',
    items: [
      { content: 'Sydney', value: 'city_1' },
      { content: 'Canberra', value: 'city_2' },
      { content: 'Melbourne', value: 'city_3' },
      { content: 'Perth', value: 'city_4', isDisabled: true },
    ],
  },
];

export default (
  <Select
    items={selectItems}
    label="Choose your favourite"
    onSelected={(item) => {
      console.log(item);
    }}
  />
);
