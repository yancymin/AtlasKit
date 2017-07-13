import React from 'react';
import Tabs from '@atlaskit/tabs';

export default (
  <Tabs
    onSelect={selectedIndex => (console.log(`Selected tab at index ${selectedIndex}`))}
    tabs={[
      {
        content: 'String content',
        defaultSelected: true,
        label: 'First tab',
      },
      {
        content: <p>JSX content</p>,
        label: 'Second tab',
      },
    ]}
  />
);
