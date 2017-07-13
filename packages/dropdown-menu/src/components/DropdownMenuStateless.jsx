import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import uid from 'uid';

import Button from '@atlaskit/button';
import Droplist, { Item, Group } from '@atlaskit/droplist';
import ExpandIcon from '@atlaskit/icon/glyph/expand';

export default class DropdownMenuStateless extends PureComponent {
  static propTypes = {
    /**
      * Controls the appearance of the menu.
      * Default menu has scroll after its height exceeds the pre-defined amount.
      * Tall menu has no restrictions.
      */
    appearance: PropTypes.oneOf(['default', 'tall']),
    /** Content that will be rendered inside the trigger element. */
    children: PropTypes.node,
    /** If true, a Spinner is rendered instead of the items */
    isLoading: PropTypes.bool,
    /** Controls the open state of the dropdown. */
    isOpen: PropTypes.bool,
    /** An array of groups. Every group must contain an array of items */
    items: PropTypes.arrayOf(PropTypes.shape({
      elemAfter: PropTypes.node,
      heading: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        elemBefore: PropTypes.node,
        href: PropTypes.string,
        isDisabled: PropTypes.bool,
        target: PropTypes.oneOf(['_blank', '_self']),
      })).isRequired,
    })).isRequired,
    /** Called when an item is activated. Receives an object with the activated item. */
    onItemActivated: PropTypes.func,
    /** Called when the menu should be open/closed. Received an object with isOpen state. */
    onOpenChange: PropTypes.func,
    /** Position of the menu. See the documentation of @atlastkit/layer for more details. */
    position: PropTypes.string,
    /** Option to display multiline items when content is too long.
      * Instead of ellipsing the overflown text it causes item to flow over multiple lines.
      */
    shouldAllowMultilineItems: PropTypes.bool,
    /** Option to fit dropdown menu width to its parent width */
    shouldFitContainer: PropTypes.bool,
    /** Flip its position to the opposite side of its target if it does not fit */
    shouldFlip: PropTypes.bool,
    /** Props to pass through to the trigger button. see @atlaskit/button for options */
    triggerButtonProps: PropTypes.shape(Button.propTypes),
    /** Types of the menu's built-in trigger.
      * default trigger is empty.
      * button trigger uses the Button component with the 'expand' icon.
      */
    triggerType: PropTypes.oneOf(['default', 'button']),
  }

  static defaultProps = {
    appearance: 'default',
    isLoading: false,
    isOpen: false,
    items: [],
    onItemActivated: () => {},
    onOpenChange: () => {},
    position: 'bottom left',
    shouldAllowMultilineItems: false,
    shouldFitContainer: false,
    shouldFlip: true,
    triggerButtonProps: {},
    triggerType: 'default',
  }

  state = {
    id: uid(),
  }

  componentDidMount = () => {
    if (this.domItemsList) {
      this.focusFirstItem();
    }
  }

  componentDidUpdate = (prevProp) => {
    if (this.props.isOpen && !prevProp.isOpen) {
      this.focusFirstItem();
    }
  }

  getNextFocusable = (indexItem, available) => {
    let currentItem = indexItem === undefined ? -1 : indexItem;
    const latestAvailable = available === undefined ? currentItem : available;

    if (currentItem < this.domItemsList.length - 1) {
      currentItem++;

      if (this.domItemsList[currentItem].getAttribute('aria-hidden') !== 'true') {
        return currentItem;
      }

      return this.getNextFocusable(currentItem, latestAvailable);
    }

    return latestAvailable;
  }

  getPrevFocusable = (indexItem, available) => {
    let currentItem = indexItem;
    const latestAvailable = available === undefined ? currentItem : available;

    if (currentItem > 0) {
      currentItem--;

      if (this.domItemsList[currentItem].getAttribute('aria-hidden') !== 'true') {
        return currentItem;
      }

      return this.getPrevFocusable(currentItem, latestAvailable);
    }

    return latestAvailable || currentItem;
  }

  focusFirstItem = () => {
    if (this.sourceOfIsOpen === 'keydown') {
      this.focusItem(this.getNextFocusable());
    }
  }

  focusNextItem = () => {
    this.focusItem(this.getNextFocusable(this.focusedItem));
  }

  focusPreviousItem = () => {
    this.focusItem(this.getPrevFocusable(this.focusedItem));
  }

  focusItem = (index) => {
    this.focusedItem = index;
    this.domItemsList[this.focusedItem].focus();
  }

  isTargetChildItem = (target) => {
    if (!target) return false;

    const isDroplistItem = target.getAttribute('data-role') === 'droplistItem';

    // eslint-disable-next-line react/no-find-dom-node
    return isDroplistItem && findDOMNode(this).contains(target);
  }

  handleKeyboardInteractions = (event) => {
    if (this.props.isOpen) {
      if (this.isTargetChildItem(event.target)) {
        switch (event.key) {
          case 'ArrowUp':
            event.preventDefault();
            this.focusPreviousItem();
            break;
          case 'ArrowDown':
            event.preventDefault();
            this.focusNextItem();
            break;
          case 'Tab':
            event.preventDefault();
            this.close({ event });
            break;
          default:
            break;
        }
      } else if (event.key === 'ArrowDown') {
        this.sourceOfIsOpen = 'keydown';
        this.focusFirstItem();
      } else if (event.key === 'Tab') {
        this.close({ event });
      }
    } else {
      switch (event.key) {
        case 'ArrowDown':
        case ' ':
        case 'Enter':
          event.preventDefault();
          this.open({ event, source: 'keydown' });
          break;
        default:
          break;
      }
    }
  }

  handleClick = (event) => {
    const menuContainer = this.domMenuContainer;
    // checking whether click was outside of the menu container.
    if (!menuContainer || (menuContainer && !menuContainer.contains(event.target))) {
      this.toggle({ source: 'click', event });
    }
  }

  open = (attrs) => {
    this.sourceOfIsOpen = attrs.source;
    this.props.onOpenChange({ isOpen: true, event: attrs.event });
  }

  close = (attrs) => {
    this.sourceOfIsOpen = null;
    this.props.onOpenChange({ isOpen: false, event: attrs.event });
  }

  toggle = (attrs) => {
    if (attrs.source === 'keydown') return;

    if (this.props.isOpen) {
      this.close(attrs);
    } else {
      this.open(attrs);
    }
  }

  renderItems = items => items.map((item, itemIndex) =>
    <Item
      {...item}
      key={itemIndex}
      onActivate={({ event }) => {
        this.props.onItemActivated({ item, event });
      }}
    >
      {item.content}
    </Item>
  )

  renderGroups = groups => groups.map((group, groupIndex) =>
    <Group heading={group.heading} elemAfter={group.elemAfter} key={groupIndex}>
      {this.renderItems(group.items)}
    </Group>
  )

  renderTrigger = () => {
    const { children, isOpen, triggerButtonProps, triggerType } = this.props;

    if (triggerType === 'button') {
      const triggerProps = { ...triggerButtonProps };
      const defaultButtonProps = {
        ariaControls: this.state.id,
        ariaExpanded: isOpen,
        ariaHaspopup: true,
        isSelected: isOpen,
      };
      if (!triggerProps.iconAfter && !triggerProps.iconBefore) {
        triggerProps.iconAfter = <ExpandIcon label="" />;
      }
      return (
        <Button {...defaultButtonProps} {...triggerProps}>
          {children}
        </Button>
      );
    }

    return children;
  }

  render() {
    const {
      appearance, isLoading, isOpen, onOpenChange, position,
      shouldAllowMultilineItems, shouldFitContainer, shouldFlip, items,
    } = this.props;
    const { id } = this;

    return (
      <Droplist
        appearance={appearance}
        isLoading={isLoading}
        isOpen={isOpen}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyboardInteractions}
        onOpenChange={onOpenChange}
        position={position}
        shouldAllowMultilineItems={shouldAllowMultilineItems}
        shouldFitContainer={shouldFitContainer}
        shouldFlip={shouldFlip}
        trigger={this.renderTrigger()}
      >
        <div
          id={id}
          ref={(ref) => {
            this.domMenuContainer = ref;
            this.domItemsList = ref
              ? ref.querySelectorAll('[data-role="droplistItem"]')
              : undefined;
          }}
          role="menu"
          style={shouldFitContainer ? null : { maxWidth: 300 }}
        >
          {this.renderGroups(items)}
        </div>
      </Droplist>
    );
  }
}
