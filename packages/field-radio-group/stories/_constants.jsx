import React from 'react';

function copyItems(items) {
  return items.map(item => ({ ...item }));
}

const sampleItems = [
  { name: 'animal', value: 'dog', label: 'Dog' },
  { name: 'animal', value: 'cat', label: 'Cat' },
  { name: 'animal', value: 'hippo', label: (<span>Hippo <i>(disabled)</i></span>), isDisabled: true },
];

const sampleItemsWithSelection = copyItems(sampleItems);
sampleItemsWithSelection[1].isSelected = true;

const sampleItemsWithDefault = copyItems(sampleItems);
sampleItemsWithDefault[1].defaultSelected = true;

const longSampleWithDefault = [
  { name: 'character', value: 'homer', label: 'Homer Simpson' },
  { name: 'character', value: 'marge', label: 'Marge Simpson' },
  { name: 'character', value: 'bart', label: 'Bart Simpson' },
  { name: 'character', value: 'lisa', label: 'Lisa Simpson' },
  { name: 'character', value: 'maggie', label: 'Maggie Simpson' },
  { name: 'character', value: 'abe', label: 'Grandpa Abraham Simpson' },
  { name: 'character', value: 'krusty', label: 'Krusty the Clown', defaultSelected: true },
  { name: 'character', value: 'ned', label: 'Ned Flanders' },
  { name: 'character', value: 'skinner', label: 'Principal Seymour Skinner' },
  { name: 'character', value: 'moe', label: 'Moe Szyslak' },
];

export {
  sampleItems,
  sampleItemsWithSelection,
  sampleItemsWithDefault,
  longSampleWithDefault,
};
