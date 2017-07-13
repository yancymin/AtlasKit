import React from 'react';
import Tabs from '@atlaskit/tabs';

const TabContent = () => (
  <div>
    <h2>Tab as a component</h2>
    <p>Tabs can be used to render any react component as their content.</p>
  </div>
);

const tabs = [
  { label: 'Tab 1', content: 'Content of Tab 1' },
  { label: 'Tab 2', content: 'Content of Tab 2' },
  { label: 'Tab 3', content: 'Content of Tab 3', defaultSelected: true },
  { label: 'Tab 4', content: TabContent() },
];

const TabsExample = () => (
  <div>
    <Tabs tabs={tabs} onSelect={e => console.log('New tab selected', e)} />
  </div>
);

export default TabsExample;
