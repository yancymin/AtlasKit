// @flow
import React, { PureComponent } from 'react';
import DefaultLinkComponent from './DefaultLinkComponent';
import InteractiveWrapper from './InteractiveWrapper';

import NavigationItemIcon from '../styled/NavigationItemIcon';
import NavigationItemAfter from '../styled/NavigationItemAfter';
import NavigationItemAction from '../styled/NavigationItemAction';
import NavigationItemCaption from '../styled/NavigationItemCaption';
import NavigationItemText from '../styled/NavigationItemText';
import NavigationItemTextAfter from '../styled/NavigationItemTextAfter';
import NavigationItemInner from '../styled/NavigationItemInner';
import NavigationItemMainText from '../styled/NavigationItemMainText';
import NavigationItemOuter from '../styled/NavigationItemOuter';
import NavigationItemSubText from '../styled/NavigationItemSubText';
import type { ReactElement } from '../../types';

type Props = {|
  action?: ReactElement,
  /** Text to appear to the right of the text. It has a lower font-weight. */
  caption?: string,
  /** Location to link out to on click. This is passed down to the custom link
  component if one is provided. */
  href?: string,
  /** React element to appear to the left of the text. This should be an
  @atlaskit/icon component. */
  icon?: ReactElement,
  /** Element displayed to the right of the item. The dropIcon should generally be
  an appropriate @atlaskit icon, such as the ExpandIcon. */
  dropIcon?: ReactElement,
  /** Set whether to disable the hover styling */
  isHoverStylesDisabled?: boolean,
  /** Set whether the icon should be highlighted as selected. Selected items have
  a different background color. */
  isSelected?: boolean,
  /** Set whether the item should be used to trigger a dropdown. If this is strue,
  The href property will be disabled. */
  isDropdownTrigger?: boolean,
  /** Component to be used as link, if default link component does not suit, such
  as if you are using a different router. Component is passed a href prop, and the content
  of the title as children. This will be wrapped in a component to style it. */
  linkComponent?: () => mixed,
  /** Function to be called on click. This is passed down to a custom link component,
  if one is provided.  */
  onClick?: (e: MouseEvent) => void,
  /** Function to be called on mouse enter. */
  onMouseEnter?: (e: MouseEvent) => void,
  /** Function to be called on mouse leave. */
  onMouseLeave?: (e: MouseEvent) => void,
  /** Text to be displayed beneath the main text. */
  subText?: string,
  /** Tab index of the component */
  tabIndex?: number,
  /** Main text to be displayed as the item. Accepts a react component but in most
  cases this should just be a string. */
  text: ReactElement,
  /** React component to be placed to the right of the main text. */
  textAfter?: ReactElement,
|}

export default class NavigationItem extends PureComponent {
  static defaultProps = {
    isHoverStylesDisabled: false,
    isSelected: false,
    linkComponent: DefaultLinkComponent,
    isDropdownTrigger: false,
    onMouseEnter: () => {},
    onMouseLeave: () => {},
  }

  onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
  }

  props: Props

  render() {
    const icon = this.props.icon
      ? <NavigationItemIcon>{this.props.icon}</NavigationItemIcon>
      : null;

    const dropIcon = this.props.dropIcon && this.props.isDropdownTrigger ? (
      <NavigationItemIcon
        isDropdownTrigger
        hasNoPadding={this.props.isDropdownTrigger}
      >
        {this.props.dropIcon}
      </NavigationItemIcon>
    ) : null;

    const textAfter = this.props.textAfter
      ? <NavigationItemTextAfter>{this.props.textAfter}</NavigationItemTextAfter>
      : null;

    const action = this.props.action
      ? <NavigationItemAction>{this.props.action}</NavigationItemAction>
      : null;

    const after = this.props.textAfter ? (
      <NavigationItemAfter
        shouldTakeSpace={this.props.action || this.props.textAfter}
        isDropdownTrigger={this.props.isDropdownTrigger}
      >
        {textAfter}
      </NavigationItemAfter>
    ) : null;

    const wrappedCaption = this.props.caption
      ? <NavigationItemCaption>{this.props.caption}</NavigationItemCaption>
      : null;

    const interactiveWrapperProps = {
      onMouseDown: this.onMouseDown,
      onClick: this.props.onClick,
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
      tabIndex: this.props.tabIndex,
    };

    if (!this.props.isDropdownTrigger) {
      interactiveWrapperProps.href = this.props.href;
      interactiveWrapperProps.linkComponent = this.props.linkComponent;
    }

    return (
      <NavigationItemOuter
        isDropdown={this.props.isDropdownTrigger}
        isHoverStylesEnabled={!this.props.isHoverStylesDisabled}
        isSelected={this.props.isSelected}
      >
        <InteractiveWrapper
          {...interactiveWrapperProps}
        >
          <NavigationItemInner>
            {icon}
            <NavigationItemText isDropdown={this.props.isDropdownTrigger}>
              <NavigationItemMainText>
                {this.props.text}
                {wrappedCaption}
              </NavigationItemMainText>
              <NavigationItemSubText>
                {this.props.subText}
              </NavigationItemSubText>
            </NavigationItemText>
            {after}
            {dropIcon}
            {action}
          </NavigationItemInner>
        </InteractiveWrapper>
      </NavigationItemOuter>
    );
  }
}
