const sampleTabsNoSelection = [
  {
    content: 'Tab 1 content',
    label: 'Tab 1 label',
    onSelect: () => {},
  },
  {
    content: 'Tab 2 content',
    label: 'Tab 2 label',
    onSelect: () => {},
  },
  {
    content: 'Tab 3 content',
    label: 'Tab 3 label',
    onSelect: () => {},
  },
];

const sampleTabs = sampleTabsNoSelection.map(item => ({ ...item }));
sampleTabs[1].isSelected = true;

const sampleTabsDefaultSelected = sampleTabsNoSelection.map(item => ({ ...item }));
sampleTabsDefaultSelected[1].defaultSelected = true;

export {
  sampleTabs,
  sampleTabsNoSelection,
  sampleTabsDefaultSelected,
};
