import React from 'react';
import { Item, Group } from '@atlaskit/droplist';

import NoMatches from '../styled/NoMatch';
import GroupsContainer from '../styled/GroupsContainer';
import { filterItems } from '../internal/sharedFunctions';

const renderItems = ({ items, focusedItemIndex, handleItemSelect }) => (
  items.map((item, itemIndex) => (
    <Item
      {...item}
      elemBefore={item.elemBefore}
      isFocused={itemIndex === focusedItemIndex}
      key={itemIndex}
      onActivate={(attrs) => {
        handleItemSelect(item, attrs);
      }}
    >
      {item.content}
    </Item>
  ))
);

const renderNoItemsMessage = noMatchesFound => (
  <NoMatches>
    {noMatchesFound}
  </NoMatches>
);
/* eslint-disable react/prop-types*/
const renderGroups = ({
  filterValue,
  focusedItemIndex,
  hasFooter,
  groups,
  handleItemSelect,
  noMatchesFound,
  selectedItems,
  shouldAllowCreateItem,
}) => {
  const renderedGroups = groups.map((group, groupIndex) => {
    const filteredItems = filterItems(group.items, filterValue, selectedItems);
    return filteredItems.length > 0 ?
      <Group
        heading={group.heading}
        key={groupIndex}
      >
        {renderItems({
          items: filteredItems,
          focusedItemIndex,
          handleItemSelect,
        })}
      </Group>
      : null;
  }).filter(group => !!group);

  // don't show the 'noItems' message when the new item functinality is enabled
  return (renderedGroups.length > 0 || shouldAllowCreateItem)
    ? <GroupsContainer hasFooter={hasFooter}>{renderedGroups}</GroupsContainer>
    : renderNoItemsMessage(noMatchesFound);
};
/* eslint-enable prop-types */

export default renderGroups;
