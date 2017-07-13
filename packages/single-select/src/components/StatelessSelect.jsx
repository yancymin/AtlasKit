import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Droplist, { Item, Group } from '@atlaskit/droplist';
import FieldBase, { Label } from '@atlaskit/field-base';
import ExpandIcon from '@atlaskit/icon/glyph/expand';
import { mapAppearanceToFieldBase } from './appearances';
import { AutocompleteWrapper, AutocompleteInput } from '../styled/Autocomplete';
import Content from '../styled/Content';
import DummyItem from './DummyItem';
import DummyGroup from './DummyGroup';
import ElemBefore from '../styled/ElemBefore';
import Expand from '../styled/Expand';
import NothingWasFound from './NothingWasFound';
import Placeholder from '../styled/Placeholder';
import StatelessSelectWrapper from '../styled/StatelessSelectWrapper';
import Trigger from '../styled/Trigger';

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

const itemShape = DummyItem.propTypes;
const groupShape = DummyGroup.propTypes;

export default class StatelessSelect extends PureComponent {
  static propTypes = {
    /** Subtle items do not have a background color. */
    appearance: PropTypes.oneOf(appearances.values),
    /** Sets whether the dropdown should be constrained to the width of its trigger */
    droplistShouldFitContainer: PropTypes.bool,
    /** Value to be used when filtering the items. Compared against 'content'. */
    filterValue: PropTypes.string,
    /** Sets whether the field should be selectable. If it is, the field will be
    a text box, which will filter the items. */
    hasAutocomplete: PropTypes.bool,
    /** id property to be passed down to the html select component. */
    id: PropTypes.string,
    /** message to show on the dialog when isInvalid is true */
    invalidMessage: PropTypes.node,
    /** Sets whether the select is selectable. Changes hover state. */
    isDisabled: PropTypes.bool,
    /** controls the top margin of the label component rendered. */
    isFirstChild: PropTypes.bool,
    /** Sets whether the Select dropdown is open. */
    isOpen: PropTypes.bool,
    /** Sets whether form including select can be submitted without an option
    being made. */
    isRequired: PropTypes.bool,
    /** Set whether there is an error with the selection. Sets an orange border
    and shows the warning icon. */
    isInvalid: PropTypes.bool,
    /** An array of objects, each one of which must have an array of items, and
    may have a heading. All items should have content and value properties, with
    content being the displayed text. */
    items: PropTypes.arrayOf(PropTypes.shape(groupShape)),
    /** Label to be displayed above select. */
    label: PropTypes.string,
    /** name property to be passed to the html select element. */
    name: PropTypes.string,
    /** Message to display in any group in items if there are no items in it,
    including if there is one item that has been selected. */
    noMatchesFound: PropTypes.string,
    /** Handler called when a selection is made, with the item chosen. */
    onSelected: PropTypes.func,
    /** Handler to be called when the filtered items changes. */
    onFilterChange: PropTypes.func,
    /** Handler called when the select is opened or closed. Called with an object
    that has both the event, and the new isOpen state. */
    onOpenChange: PropTypes.func,
    /** Text to be shown within the select when no item is selected. */
    placeholder: PropTypes.string,
    /** Where the select dropdown should be displayed relative to the field position. */
    position: PropTypes.string,
    /** Sets whether the field will become focused. */
    shouldFocus: PropTypes.bool,
    /** The selected item data */
    selectedItem: PropTypes.shape(itemShape),
    /** Sets whether the field should be constrained to the width of its trigger */
    shouldFitContainer: PropTypes.bool,
    /** Sets whether the droplist should flip its position when there is not enough space. */
    shouldFlip: PropTypes.bool,
  }

  static defaultProps = {
    appearance: appearances.default,
    droplistShouldFitContainer: true,
    filterValue: '',
    hasAutocomplete: false,
    isOpen: false,
    isRequired: false,
    items: [],
    label: '',
    noMatchesFound: 'No matches found',
    onFilterChange: () => {},
    onSelected: () => {},
    onOpenChange: () => {},
    placeholder: '',
    position: 'bottom left',
    shouldFocus: false,
    selectedItem: {},
    shouldFlip: true,
  }

  state = { }

  componentDidMount = () => {
    if (this.props.isOpen) {
      this.focus();
    }

    if (!this.props.droplistShouldFitContainer && this.droplistNode) {
      this.setDroplistMinWidth();
    }
  }

  componentDidUpdate = (prevProps) => {
    if (!prevProps.shouldFocus && this.props.shouldFocus) {
      this.focus();
    }

    if (!this.props.droplistShouldFitContainer && this.droplistNode) {
      this.setDroplistMinWidth();
    }
  }

  onOpenChange = (attrs) => {
    this.props.onOpenChange(attrs);
    this.setState({
      focusedItemIndex: undefined,
    });

    if (attrs.isOpen) {
      this.focus();
    }
  }

  getNextFocusable = (indexItem, length) => {
    let currentItem = indexItem;

    if (currentItem === undefined) {
      currentItem = 0;
    } else if (currentItem < length) {
      currentItem++;
    } else {
      currentItem = 0;
    }

    return currentItem;
  }

  getPrevFocusable = (indexItem, length) => {
    let currentItem = indexItem;

    if (currentItem > 0) {
      currentItem--;
    } else {
      currentItem = length;
    }

    return currentItem;
  }

  getAllItems = (groups) => {
    let allItems = [];
    groups.forEach((val) => {
      allItems = allItems.concat(val.items);
    });
    return allItems;
  }

  getAllVisibleItems = groups => this.filterItems(this.getAllItems(groups))

  getNextNativeSearchItem = (items, key, currentIndex, isSecondStep) => {
    let res = items.find((item, index) => {
      const content = item.content && item.content.toLowerCase();
      if (index <= currentIndex) {
        return false;
      }
      return content && (content.indexOf(key.toLowerCase()) === 0);
    });

    if (!res && !isSecondStep) {
      res = this.getNextNativeSearchItem(items, key, -1, true);
    }

    return res;
  }

  setDroplistMinWidth = () => {
    const width = this.triggerNode.getBoundingClientRect().width;
    this.setState({ droplistWidth: width });
  }

  getItemTrueIndex = (itemIndex, groupIndex = 0) => itemIndex + this.props.items
    .filter((group, thisGroupIndex) => thisGroupIndex < groupIndex)
    .reduce((totalItems, group) => totalItems + group.items.length, 0);

  focus = () => {
    if (this.inputNode) {
      this.inputNode.focus();
    } else {
      this.triggerNode.focus();
    }
  }

  clearNativeSearch = () => {
    this.nativeSearchKey = '';
    this.nativeSearchCounter = undefined;
  }

  filterItems = (items) => {
    const value = this.props.filterValue;
    const trimmedValue = value && value.toLowerCase().trim();
    const selectedItem = this.props.selectedItem;
    const unselectedItems = items.filter(item => selectedItem.value !== item.value);
    return trimmedValue &&
      (trimmedValue !== (selectedItem.content && selectedItem.content.toLowerCase())) ?
      unselectedItems.filter(item => (item.content.toLowerCase().indexOf(trimmedValue) > -1)) :
      unselectedItems;
  }

  scrollToFocused = (index) => {
    const scrollable = this.containerNode.querySelector('[data-role="droplistContent"]');
    let item;

    if (scrollable && index !== undefined) {
      item = scrollable.querySelectorAll('[data-role="droplistItem"]')[index];
    }

    if (item && scrollable) {
      scrollable.scrollTop = (item.offsetTop - scrollable.clientHeight) + item.clientHeight;
    }
  }

  focusNextItem = () => {
    const filteredItems = this.getAllVisibleItems(this.props.items);
    const length = filteredItems.length - 1;
    const index = this.getNextFocusable(this.state.focusedItemIndex, length);
    this.setState({
      focusedItemIndex: index,
    });
    this.scrollToFocused(index);
  }

  focusPreviousItem = () => {
    const filteredItems = this.getAllVisibleItems(this.props.items);
    const length = filteredItems.length - 1;
    const index = this.getPrevFocusable(this.state.focusedItemIndex, length);
    this.setState({
      focusedItemIndex: index,
    });
    this.scrollToFocused(index);
  }

  focusItem = (item) => {
    const filteredItems = this.getAllVisibleItems(this.props.items);
    const index = filteredItems.indexOf(item);
    this.setState({
      focusedItemIndex: index,
    });
    this.scrollToFocused(index);
  }

  handleNativeSearch = (event) => {
    const { selectedItem, items } = this.props;
    const { key: eventKey } = event;
    let { nativeSearchKey } = this;
    const allItems = this.getAllItems(items);

    if (!this.nativeSearchCounter) {
      nativeSearchKey = eventKey;
    } else {
      nativeSearchKey += eventKey;
    }

    const current = this.state.focusedItemIndex !== undefined ?
      this.state.focusedItemIndex :
      allItems.indexOf(selectedItem);

    const allItemsWithoutSelected = (selectedItem && selectedItem.value) ?
      allItems.filter(item => item.value !== selectedItem.value) : allItems;

    if (!this.props.isOpen) {
      const matchingItem = this.getNextNativeSearchItem(
        allItems,
        nativeSearchKey,
        current,
      );
      this.handleItemSelect(matchingItem, { event });
    } else {
      const matchingItem = this.getNextNativeSearchItem(
        allItemsWithoutSelected,
        nativeSearchKey,
        current,
      );
      this.focusItem(matchingItem);
    }

    clearTimeout(this.nativeSearchCounter);
    this.nativeSearchCounter = setTimeout(this.clearNativeSearch, 200);
    this.previousKey = eventKey;
    this.nativeSearchKey = nativeSearchKey;
  }

  handleKeyboardInteractions = (event) => {
    const isSelectOpen = this.props.isOpen;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isSelectOpen) {
          this.onOpenChange({ event, isOpen: true });
        }
        this.focusNextItem();
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isSelectOpen) {
          this.focusPreviousItem();
        }
        break;
      case 'Enter':
        if (isSelectOpen) {
          event.preventDefault();
          if (this.state.focusedItemIndex !== undefined) {
            this.handleItemSelect(
              this.getAllVisibleItems(this.props.items)[this.state.focusedItemIndex], { event }
            );
          }
        }
        break;
      default:
        if (!this.props.hasAutocomplete) {
          this.handleNativeSearch(event);
        }
        break;
    }
  }

  handleInputOnChange = (event) => {
    const value = event.target.value;

    if (value !== this.props.filterValue) {
      this.props.onFilterChange(value);
      this.onOpenChange({ event, isOpen: true });
    }
  }

  handleTriggerClick = (event) => {
    if (!this.props.isDisabled) {
      this.onOpenChange({ event, isOpen: !this.props.isOpen });
    }
  }

  handleItemSelect = (item, attrs) => {
    if (item && !item.isDisabled) {
      this.props.onOpenChange({ isOpen: false, event: attrs.event });
      this.props.onSelected(item);
      this.props.onFilterChange(item.content);
      this.setState({ focusedItemIndex: undefined });
    }
  }

  renderItems = (items, groupIndex = 0) => {
    const filteredItems = this.filterItems(items);

    if (filteredItems.length) {
      return filteredItems.map((item, itemIndex) => (<Item
        {...item}
        isFocused={this.getItemTrueIndex(itemIndex, groupIndex) === this.state.focusedItemIndex}
        key={itemIndex}
        onActivate={(attrs) => {
          this.handleItemSelect(item, attrs);
        }}
        type="option"
      >
        {item.content}
      </Item>));
    }

    return (<NothingWasFound noMatchesFound={this.props.noMatchesFound} />);
  }

  renderGroups = groups => groups.map((group, groupIndex) =>
    <Group
      heading={group.heading}
      key={groupIndex}
    >
      {this.renderItems(group.items, groupIndex)}
    </Group>
  )

  renderOptions = items => items.map((item, itemIndex) => (<option
    disabled={item.isDisabled}
    key={itemIndex}
    value={item.value}
  >{item.content}</option>))

  renderOptGroups = groups => groups.map((group, groupIndex) =>
    <optgroup
      label={group.heading}
      key={groupIndex}
    >
      {this.renderOptions(group.items)}
    </optgroup>
  )

  renderSelect = () => (<select
    disabled={this.props.isDisabled}
    id={this.props.id}
    name={this.props.name}
    readOnly
    required={this.props.isRequired}
    style={{ display: 'none' }}
    value={this.props.selectedItem.value}
  >
    <option value="" />
    {this.renderOptGroups(this.props.items)}
  </select>)

  render() {
    const {
      appearance,
      droplistShouldFitContainer,
      filterValue,
      hasAutocomplete,
      id,
      invalidMessage,
      isDisabled,
      isFirstChild,
      isInvalid,
      isOpen,
      isRequired,
      items,
      label,
      placeholder,
      position,
      selectedItem,
      shouldFitContainer,
      shouldFlip,
    } = this.props;

    // disabled because all of the accessibility is handled manually
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <StatelessSelectWrapper
        onKeyDown={this.handleKeyboardInteractions}
        innerRef={(ref) => {
          this.containerNode = ref;
        }}
        shouldFitContainer={shouldFitContainer}
      >
        {this.renderSelect()}
        {label ? <Label
          htmlFor={id}
          isFirstChild={isFirstChild}
          isRequired={isRequired}
          label={label}
        /> : null}
        <Droplist
          isKeyboardInteractionDisabled
          isOpen={isOpen}
          isTriggerDisabled
          isTriggerNotTabbable
          onOpenChange={this.onOpenChange}
          position={position}
          shouldFitContainer={droplistShouldFitContainer}
          shouldFlip={shouldFlip}
          trigger={
            <FieldBase
              appearance={mapAppearanceToFieldBase([appearance])}
              isDisabled={isDisabled}
              isFitContainerWidthEnabled
              isInvalid={isInvalid}
              invalidMessage={invalidMessage}
              isPaddingDisabled
            >
              <Trigger
                onClick={this.handleTriggerClick}
                tabIndex={!isDisabled && !hasAutocomplete ? '0' : null}
                innerRef={ref => (this.triggerNode = ref)}
              >
                {
                  !hasAutocomplete || isDisabled ?
                    <Content>
                      {
                        selectedItem.elemBefore ?
                          <ElemBefore>
                            {selectedItem.elemBefore}
                          </ElemBefore> :
                          null
                      }
                      {
                        selectedItem.content ?
                          <span>{selectedItem.content}</span> :
                          <Placeholder>{placeholder}</Placeholder>
                      }
                    </Content> :
                    <AutocompleteWrapper>
                      <AutocompleteInput
                        onChange={this.handleInputOnChange}
                        placeholder={placeholder}
                        innerRef={ref => (this.inputNode = ref)}
                        type="text"
                        value={filterValue}
                        disabled={isDisabled}
                      />
                    </AutocompleteWrapper>
                }
                <Expand>
                  <ExpandIcon label="" />
                </Expand>
              </Trigger>
            </FieldBase>
          }
        >
          <div
            ref={ref => (this.droplistNode = ref)}
            style={{ minWidth: this.state.droplistWidth }}
          >
            {this.renderGroups(items)}
          </div>
        </Droplist>
      </StatelessSelectWrapper>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
