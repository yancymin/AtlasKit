import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import uid from 'uid';

import ItemShape from '../internal/ItemShape';
import GroupShape from '../internal/GroupShape';
import FooterShape from '../internal/FooterShape';
import MultiSelectStateless from './Stateless';

const itemShape = ItemShape.propTypes;
const groupShape = GroupShape.propTypes;
const footerShape = FooterShape.propTypes;

// =============================================================
// NOTE: Duplicated in ./internal/appearances until docgen can follow imports.
// -------------------------------------------------------------
// DO NOT update values here without updating the other.
// =============================================================

const appearances = {
  values: [
    'default',
    'subtle',
  ],
  default: 'default',
};

export default class MultiSelect extends PureComponent {
  static propTypes = {
    /** Subtle items do not have a background color. */
    appearance: PropTypes.oneOf(appearances.values),
    /** Message to display in footer after the name of the new item. Only applicable if
     * shouldAllowCreateItem prop is set to true. */
    createNewItemLabel: PropTypes.string,
    /** An array of items that will be selected on component mount. */
    defaultSelected: PropTypes.arrayOf(PropTypes.shape(itemShape)),
    /** Element to show after the list of item. Accepts an object of a specific shape */
    footer: PropTypes.shape(footerShape),
    /** id property to be passed down to the html select component. */
    id: PropTypes.string,
    /** message to show on the dialog when isInvalid is true */
    invalidMessage: PropTypes.node,
    /** Sets whether the select is selectable. Changes hover state. */
    isDisabled: PropTypes.bool,
    /** controls the top margin of the label component rendered. */
    isFirstChild: PropTypes.bool,
    /** Sets whether the field will become focused. */
    shouldFocus: PropTypes.bool,
    /** Set whether the component should be open on mount. */
    isDefaultOpen: PropTypes.bool,
    /** Sets whether form including select can be submitted without an option
    being made. */
    isRequired: PropTypes.bool,
    /** Set whether there is an error with the selection. Sets an orange border
    and shows the warning icon. */
    isInvalid: PropTypes.bool,
    /** An array of objects, each one of which must have an array of items, and
    may have a heading. All items should have content and value properties, with
    content being the displayed text. */
    items: PropTypes.oneOfType([
      PropTypes.shape(groupShape),
      PropTypes.arrayOf(PropTypes.shape(itemShape)),
    ]),    /** Label to be displayed above select. */
    label: PropTypes.string,
    /** name property to be passed to the html select element. */
    name: PropTypes.string,
    /** Mesage to display in any group in items if there are no items in it,
    including if there is one item that has been selected. */
    noMatchesFound: PropTypes.string,
    /** Handler to be called when the filtered items changes.*/
    onFilterChange: PropTypes.func,
    /** Handler to be called when a new item is created.
     * Only applicable when the shouldAllowCreateItem is set to true.*/
    onNewItemCreated: PropTypes.func,
    /** Handler to be called on select change. */
    onSelectedChange: PropTypes.func,
    /** Handler called when the select is opened or closed. Called with an object
    that has both the event, and the new isOpen state. */
    onOpenChange: PropTypes.func,
    /** Text to be shown within the select when no item is selected. */
    placeholder: PropTypes.string,
    /** Where the select dropdown should be displayed relative to the field position. */
    position: PropTypes.string,
    /** Sets whether the field should be constrained to the width of its trigger */
    shouldFitContainer: PropTypes.bool,
    /** Sets whether a new item could be created and added to the list by pressing Enter
     * inside the autocomplete field */
    shouldAllowCreateItem: PropTypes.bool,
  }

  static defaultProps = {
    appearance: appearances.default,
    createNewItemLabel: 'New item',
    defaultSelected: [],
    shouldFocus: false,
    isRequired: false,
    items: [],
    label: '',
    onFilterChange: () => {},
    onNewItemCreated: () => {},
    onOpenChange: () => {},
    onSelectedChange: () => {},
    position: 'bottom left',
    shouldAllowCreateItem: false,
  }

  state = {
    isOpen: this.props.isDefaultOpen,
    selectedItems: this.props.defaultSelected,
    filterValue: '',
    items: this.props.items,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.state.items) {
      this.setState({ items: [...nextProps.items] });
    }
  }

  selectItem = (item) => {
    const selectedItems = [...this.state.selectedItems, item];
    this.setState({ selectedItems });
    this.props.onSelectedChange({ items: selectedItems, action: 'select', changed: item });
  }

  removeItem = (item) => {
    const selectedItems = this.state.selectedItems.filter(i => i.value !== item.value);
    this.setState({ selectedItems });
    this.props.onSelectedChange({ items: selectedItems, action: 'remove', changed: item });
  }

  selectedChange = (item) => {
    if (this.state.selectedItems.some(i => i.value === item.value)) {
      this.removeItem(item);
    } else {
      this.selectItem(item);
    }
  }

  handleFilterChange = (value) => {
    this.props.onFilterChange(value);
    this.setState({ filterValue: value });
  }

  handleOpenChange = (attrs) => {
    this.setState({ isOpen: attrs.isOpen });
    this.props.onOpenChange(attrs);
  }

  handleNewItemCreate = ({ value: textValue }) => {
    const { items, selectedItems } = this.state;
    const id = uid();
    const newItem = { value: id, content: textValue };
    const newItemsArray = [...items];
    newItemsArray[newItemsArray.length - 1].items.push(newItem);

    this.setState({
      items: newItemsArray,
      selectedItems: [...selectedItems, newItem],
      filterValue: '',
    });
    this.props.onNewItemCreated({ value: textValue, item: newItem });
  }

  render() {
    const {
      appearance,
      createNewItemLabel,
      footer,
      id,
      isDisabled,
      isFirstChild,
      isInvalid,
      invalidMessage,
      isRequired,
      label,
      name,
      noMatchesFound,
      placeholder,
      position,
      shouldAllowCreateItem,
      shouldFitContainer,
      shouldFocus,
    } = this.props;
    const { filterValue, isOpen, items, selectedItems } = this.state;

    return (
      <MultiSelectStateless
        appearance={appearance}
        createNewItemLabel={createNewItemLabel}
        filterValue={filterValue}
        footer={footer}
        id={id}
        isDisabled={isDisabled}
        isFirstChild={isFirstChild}
        isInvalid={isInvalid}
        invalidMessage={invalidMessage}
        isOpen={isOpen}
        isRequired={isRequired}
        items={items}
        label={label}
        name={name}
        noMatchesFound={noMatchesFound}
        onFilterChange={this.handleFilterChange}
        onNewItemCreated={this.handleNewItemCreate}
        onOpenChange={this.handleOpenChange}
        onRemoved={this.selectedChange}
        onSelected={this.selectedChange}
        placeholder={placeholder}
        position={position}
        selectedItems={selectedItems}
        shouldAllowCreateItem={shouldAllowCreateItem}
        shouldFitContainer={shouldFitContainer}
        shouldFocus={shouldFocus}
      />
    );
  }
}
