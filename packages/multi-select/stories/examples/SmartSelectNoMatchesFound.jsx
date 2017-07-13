import React from 'react';
import Select from '@atlaskit/multi-select';

const selectItems = [
  {
    heading: 'Cities',
    items: [],
  },
];

export default (
  <Select
    items={selectItems}
    label="Choose your favourite"
    shouldFitContainer
  />
);
