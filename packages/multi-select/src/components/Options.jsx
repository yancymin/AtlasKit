const React = require('react');

const renderOptions = items => items.map((item, itemIndex) => (
  <option
    disabled={item.isDisabled}
    key={itemIndex}
    value={item.value}
  >{item.content}</option>)
);

const renderOptGroups = groups => groups.map((group, groupIndex) =>
  <optgroup
    key={groupIndex}
    label={group.heading}
  >
    {renderOptions(group.items)}
  </optgroup>
);

export default renderOptGroups;
