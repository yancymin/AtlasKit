import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import Droplist from '@atlaskit/droplist';
import { Label } from '@atlaskit/field-base';

import ItemShape from '../internal/ItemShape';
import GroupShape from '../internal/GroupShape';
import FooterShape from '../internal/FooterShape';
import { SelectWrapper } from '../styled/Stateless';
import Trigger from './Trigger';
import Footer from './Footer';
import { filterItems, getNextFocusable, getPrevFocusable, groupItems } from '../internal/sharedFunctions';
import renderGroups from './Groups';
import renderOptGroups from './Options';

const groupShape = GroupShape.propTypes;
const itemShape = ItemShape.propTypes;
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

const getAllValues = selectedItems => selectedItems.map(item => item.value);

/*

==============================+
COMPONENT CODE BEGINS HERE
==============================+

*/

export default class StatelessMultiSelect extends PureComponent {
  static propTypes = {
    /** Subtle items do not have a background color. */
    appearance: PropTypes.oneOf(appearances.values),
    /** Message to display in footer after the name of the new item. Only applicable if
     * shouldAllowCreateItem prop is set to true. Default: 'New item'*/
    createNewItemLabel: PropTypes.string,
    /** Value to be used when filtering the items. Compared against "item's filterValues". */
    filterValue: PropTypes.string,
    /** Element to show after the list of item. Accepts an object of the specific shape */
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
    /** Set whether there is an error with the selection. Sets an orange border
    and shows the warning icon. */
    isInvalid: PropTypes.bool,
    /** Sets whether the Select dropdown is open. */
    isOpen: PropTypes.bool,
    /** Sets whether form including select can be submitted without an option
    being made. */
    isRequired: PropTypes.bool,
    /** An array of objects, each one of which must have an array of items, and
    may have a heading. All items should have content and value properties, with
    content being the displayed text. */
    items: PropTypes.oneOfType([
      PropTypes.shape(groupShape),
      PropTypes.arrayOf(PropTypes.shape(itemShape)),
    ]),
    /** Label to be displayed above select. */
    label: PropTypes.string,
    /** Mesage to display in any group in items if there are no items in it,
    including if there is one item that has been selected. */
    noMatchesFound: PropTypes.string,
    /** name property to be passed to the html select element. */
    name: PropTypes.string,
    /** Handler to be called when the filtered items changes.*/
    onFilterChange: PropTypes.func,
    /** Handler to be called when a new item is created.
     * Only applicable when the shouldAllowCreateItem is set to true.*/
    onNewItemCreated: PropTypes.func,
    /** Handler called when the select is opened or closed. Called with an object
    that has both the event, and the new isOpen state. */
    onOpenChange: PropTypes.func,
    /** Handler called when a selection is made, with the item chosen. */
    onSelected: PropTypes.func,
    /** Function to be called by the tags representing a selected item. Passed to
    the `onAfterRemoveAction` on the Tag. */
    onRemoved: PropTypes.func,
    /** Text to be shown within the select when no item is selected. */
    placeholder: PropTypes.string,
    /** Where the select dropdown should be displayed relative to the field position. */
    position: PropTypes.string,
    /** Array of selected items */
    selectedItems: PropTypes.arrayOf(PropTypes.shape(itemShape)),
    /** Sets whether the field should be constrained to the width of its trigger */
    shouldFitContainer: PropTypes.bool,
    /** Sets whether a new item could be created and added to the list by pressing Enter
     * inside the autocomplete field. If set to true then no additional footer from the 'footer'
     * property would be rendered.*/
    shouldAllowCreateItem: PropTypes.bool,
  }

  static defaultProps = {
    appearance: appearances.default,
    createNewItemLabel: 'New item',
    filterValue: '',
    footer: {},
    shouldFocus: false,
    isOpen: false,
    items: [],
    label: '',
    noMatchesFound: 'No matches found',
    onFilterChange: () => {},
    onOpenChange: () => {},
    onSelected: () => {},
    onRemoved: () => {},
    position: 'bottom left',
    selectedItems: [],
    shouldAllowCreateItem: false,
  }

  // This is used only to manipulate focus , it's okay to have state in this case.
  state = {
    isFocused: this.props.isOpen || this.props.shouldFocus,
    focusedItemIndex: null,
    groupedItems: groupItems(this.props.items),
  }

  componentDidMount = () => {
    if (this.state.isFocused && this.inputNode) {
      this.inputNode.focus();
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.items !== nextProps.items) {
      this.setState({ groupedItems: groupItems(nextProps.items) });
    }
  }

  componentDidUpdate = (prevProps) => {
    if (!prevProps.shouldFocus && this.props.shouldFocus && this.inputNode) {
      this.inputNode.focus();
    }
  }

  onFocus = () => {
    if (!this.props.isDisabled) {
      this.setState({ isFocused: true });

      /**
       * Check if we're tabbing to the Remove button on a tag.
       * This is a hacky workaround for now and should be fixed when
       * we implement proper traversal for tags with the keyboard.
       *
       * @see {@link https://ecosystem.atlassian.net/browse/AK-2250}
       * @todo Implement traversal of tags with arrow keys, then remove this.
       */
      if (document.activeElement.tagName.toLowerCase() !== 'button') {
        this.inputNode.focus();
      }
    }
  }

  onBlur = () => {
    if (!this.props.isDisabled) {
      this.setState({ isFocused: false });
    }
  }

  onOpenChange = (attrs) => {
    const target = attrs.event.target;
    // eslint-disable-next-line react/no-find-dom-node
    const tagGroup = ReactDOM.findDOMNode(this.tagGroup);
    const tagGroupElements = tagGroup.children;
    const isInsideTagGroup = [...tagGroupElements].some(
      node => node.contains(target) && node.tagName !== 'INPUT'
    );

    if (!isInsideTagGroup) {
      this.props.onOpenChange(attrs);
    }

    if (attrs.isOpen) {
      tagGroup.querySelector('input').focus();
    }
  }

  getPlaceholder = () => {
    const { isOpen, selectedItems, placeholder } = this.props;

    if (!isOpen && selectedItems.length === 0) {
      return placeholder;
    }

    return null;
  }

  getAllVisibleItems = (groups) => {
    const { filterValue, selectedItems } = this.props;
    let allFilteredItems = [];
    groups.forEach((val) => {
      const filteredItems = filterItems(val.items, filterValue, selectedItems);
      allFilteredItems = allFilteredItems.concat(filteredItems);
    });
    return allFilteredItems;
  };

  handleItemCreate = (event) => {
    const { filterValue: value, items } = this.props;
    if (value) {
      const allVisible = this.getAllVisibleItems(items);
      const matchingElement = allVisible.filter(item => item.content === value);
      if (!matchingElement.length) {
        this.props.onNewItemCreated({ value });
      } else {
        this.handleItemSelect(matchingElement[0], { event });
      }
    }
  }

  handleItemSelect = (item, attrs) => {
    if (!this.isFooterFocused()) {
      // we short circuit above because when focusing on footer we don't have `item`.
      // We could look at adding item.disabled in the future though if required.
      if (!item.isDisabled) {
        this.props.onOpenChange({ isOpen: false, event: attrs.event });
        this.props.onSelected(item);
        this.props.onFilterChange('');
        this.setState({ focusedItemIndex: null });
      }
    } else if (this.props.shouldAllowCreateItem) {
      this.handleItemCreate(attrs.event);
    } else {
      // footer is focused and we dont have shouldAllowCreateItem so call the footer's onActivate
      this.handleFooterActivate(attrs.event);
    }
  }

  handleItemRemove = (item) => {
    this.props.onRemoved(item);
  }

  removeLatestItem = () => {
    if (this.props.selectedItems.length) {
      const selectedItems = this.props.selectedItems;
      this.handleItemRemove(selectedItems[selectedItems.length - 1]);
    }
  }

  hasVisibleFooter = () => {
    const { footer, shouldAllowCreateItem, filterValue } = this.props;
    // This logic is interesting because we explicitly check !multiSelectContainer with footer
    // because if you have both turned on but you havent typed anything, there will be no footer
    return (footer.content && !shouldAllowCreateItem) || (shouldAllowCreateItem && !!filterValue);
  }

  isFooterFocused = () => {
    const { focusedItemIndex, groupedItems } = this.state;
    const selectableItems = this.getAllVisibleItems(groupedItems);
    // if our selected index is outside of our array bounds, the footer should be selected
    return focusedItemIndex === selectableItems.length;
  }

  handleOnChange = (event) => {
    const value = event.target.value;

    if (value !== this.props.filterValue) {
      // We want to get rid of the focus on the items when the shouldAllowCreateItem enabled.
      // When a user presses Enter multi-select should create a new value if nothing is focused, but
      // it still should allow to focus an item in the list and select it by pressing Enter
      // as normal multi-select does.
      if (this.props.shouldAllowCreateItem) {
        this.setState({ focusedItemIndex: null });
      }

      this.props.onFilterChange(value);
      this.onOpenChange({ event, isOpen: true });
    }
  }

  handleTriggerClick = (event) => {
    if (!this.props.isDisabled) {
      this.onOpenChange({ event, isOpen: true });
    }
  }

  handleFooterActivate = (event) => {
    const { footer } = this.props;
    if (footer.onActivate) {
      footer.onActivate(event);
    }
  }

  focusNextItem = () => {
    const filteredItems = this.getAllVisibleItems(this.props.items);
    const footerIsFocusable = this.hasVisibleFooter();
    const { focusedItemIndex } = this.state;
    this.setState({
      focusedItemIndex: getNextFocusable(focusedItemIndex, filteredItems.length, footerIsFocusable),
    });
  }

  focusPreviousItem = () => {
    const filteredItems = this.getAllVisibleItems(this.props.items);
    const footerIsFocusable = this.hasVisibleFooter();
    const { focusedItemIndex } = this.state;
    this.setState({
      focusedItemIndex: getPrevFocusable(focusedItemIndex, filteredItems.length, footerIsFocusable),
    });
  }

  handleKeyboardInteractions = (event) => {
    const { isOpen, items, filterValue } = this.props;
    const { focusedItemIndex } = this.state;

    const isSelectOpen = isOpen;
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
          if (focusedItemIndex !== null) {
            this.handleItemSelect(
              this.getAllVisibleItems(items)[focusedItemIndex], { event }
            );
          } else if (this.props.shouldAllowCreateItem) {
            this.handleItemCreate();
          }
        }
        break;
      case 'Backspace':
        if (!filterValue) {
          this.removeLatestItem();
          this.onOpenChange({ event, isOpen: true });
        }
        break;
      case 'Tab':
        // tabbing from within the multi select should move focus to the next form element
        // hence, we close the dropdown and clear the focusedItemIndex
        this.onOpenChange({ event, isOpen: false });
        this.setState({ focusedItemIndex: null });
        break;
      default:
        break;
    }
  }

  renderFooter = () => {
    const { filterValue: newValue, shouldAllowCreateItem, footer, createNewItemLabel } = this.props;
    if (shouldAllowCreateItem) {
      if (newValue) {
        return (<Footer
          appearance={footer.appearance}
          isFocused={this.isFooterFocused()}
          newLabel={this.props.createNewItemLabel}
          onClick={this.handleItemCreate}
          shouldHideSeparator={!this.getAllVisibleItems(this.props.items).length}
        >
          { newValue }
          {' '}
          ({ createNewItemLabel })
        </Footer>);
      }
    } else if (footer.content) {
      return (<Footer
        appearance={footer.appearance}
        elemBefore={footer.elemBefore}
        isFocused={this.isFooterFocused()}
        onClick={this.handleFooterActivate}
        shouldHideSeparator={!this.getAllVisibleItems(this.props.items).length}
      >{ footer.content }</Footer>);
    }
    return null;
  }

  render() {
    const {
      appearance,
      filterValue,
      id,
      isDisabled,
      isFirstChild,
      isInvalid,
      invalidMessage,
      isOpen,
      isRequired,
      label,
      name,
      noMatchesFound,
      position,
      selectedItems,
      shouldAllowCreateItem,
      shouldFitContainer,
    } = this.props;

    const { groupedItems, isFocused, focusedItemIndex } = this.state;

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <SelectWrapper
        shouldFitContainer={shouldFitContainer}
        onKeyDown={this.handleKeyboardInteractions}
      >
        <select
          disabled={isDisabled}
          id={id}
          multiple
          name={name}
          readOnly
          required={isRequired}
          style={{ display: 'none' }}
          value={getAllValues(selectedItems)}
        >
          {renderOptGroups(groupedItems)}
        </select>
        {label ? <Label
          htmlFor={id}
          isFirstChild={isFirstChild}
          isRequired={isRequired}
          label={label}
        /> : null}
        <Droplist
          appearance={this.hasVisibleFooter() ? 'tall' : 'default'}
          isKeyboardInteractionDisabled
          isOpen={isOpen}
          isTriggerDisabled
          isTriggerNotTabbable
          onOpenChange={this.onOpenChange}
          position={position}
          shouldFitContainer
          trigger={
            <Trigger
              appearance={appearance}
              filterValue={filterValue}
              handleItemRemove={this.handleItemRemove}
              handleOnChange={this.handleOnChange}
              handleTriggerClick={this.handleTriggerClick}
              inputNode={this.inputNode}
              inputRefFunction={ref => (this.inputNode = ref)}
              isDisabled={isDisabled}
              isFocused={isOpen || isFocused}
              isInvalid={isInvalid}
              invalidMessage={invalidMessage}
              isRequired={isRequired}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              placeholder={this.getPlaceholder()}
              selectedItems={selectedItems}
              tagGroup={this.tagGroup}
              tagGroupRefFunction={ref => (this.tagGroup = ref)}
            />
          }
        >
          {renderGroups({
            groups: groupedItems,
            hasFooter: this.hasVisibleFooter(),
            filterValue,
            selectedItems,
            noMatchesFound,
            focusedItemIndex,
            handleItemSelect: this.handleItemSelect,
            shouldAllowCreateItem,
          })}
          {this.renderFooter()}
        </Droplist>
      </SelectWrapper>
    );
  }
}
