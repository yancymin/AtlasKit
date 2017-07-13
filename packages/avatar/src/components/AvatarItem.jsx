// @flow
import React, { cloneElement, Component } from 'react';

import { propsOmittedFromClickData } from './constants';
import { omit } from '../utils';
import { bgActiveColor, bgHoverColor, getStyles, Content, SecondaryText, PrimaryText } from '../styled/AvatarItem';
import { getProps, getStyledComponent } from '../helpers';
import { withPseudoState } from '../hoc';
import type { AvatarClickType, ComponentType, ElementType, FunctionType, StyledComponentType } from '../types';

/* eslint-disable react/no-unused-prop-types */
type Props = {
  avatar: ElementType,
  /** A custom component to use instead of the default span. */
  component?: ComponentType,
  /** Provides a url for avatars being used as a link. */
  href?: string,
  /** Change the style to indicate the item is active. */
  isActive?: boolean,
  /** Change the style to indicate the item is disabled. */
  isDisabled?: boolean,
  /** Change the style to indicate the item is focused. */
  isFocus?: boolean,
  /** Change the style to indicate the item is hovered. */
  isHover?: boolean,
  /** Change the style to indicate the item is selected. */
  isSelected?: boolean,
  /** Handler to be called on click. */
  onClick?: AvatarClickType,
  /** PrimaryText text */
  primaryText?: string,
  /** SecondaryText text */
  secondaryText?: string,
  /** Pass target down to the anchor, if href is provided. */
  target?: '_blank' | '_self',
  /** Whether or not overflowing primary and secondary text is truncated */
  enableTextTruncate?: boolean,
};

class AvatarItem extends Component {
  props: Props; // eslint-disable-line react/sort-comp
  node: { blur?: FunctionType, focus?: FunctionType };
  cache: {
    button?: ElementType,
    custom?: ComponentType,
    link?: ElementType,
    span?: ElementType,
  } = {};

  static defaultProps = { enableTextTruncate: true }

  getCachedComponent(type: StyledComponentType) {
    if (!this.cache[type]) {
      this.cache[type] = getStyledComponent[type](getStyles);
    }
    return this.cache[type];
  }
  getStyledComponent() {
    const { component, href, onClick } = this.props;
    let node = 'span';

    if (component) node = 'custom';
    else if (href) node = 'link';
    else if (onClick) node = 'button';

    return this.getCachedComponent(node);
  }
  getBorderColor = () => {
    const { href, isActive, isHover, isSelected, onClick } = this.props;
    const isInteractive = href || onClick;
    let borderColor: string;

    if (isInteractive && (isHover || isSelected)) borderColor = bgHoverColor;
    if (isInteractive && isActive) borderColor = bgActiveColor;

    return borderColor;
  }

  // expose blur/focus to consumers via ref
  blur = (e: FocusEvent) => {
    if (this.node.blur) this.node.blur(e);
  }
  focus = (e: FocusEvent) => {
    if (this.node.focus) this.node.focus(e);
  }

  // disallow click on disabled avatars
  guardedClick = (event: KeyboardEvent | MouseEvent) => {
    const { isDisabled, onClick } = this.props;

    if (isDisabled || (typeof onClick !== 'function')) return;

    const item: {} = omit(this.props, ...propsOmittedFromClickData);

    onClick({ item, event });
  }

  render() {
    const { avatar, enableTextTruncate, onClick, primaryText, secondaryText } = this.props;

    // maintain the illusion of a mask around presence/status
    const borderColor = this.getBorderColor();

    // distill props from context, props, and state
    const props = getProps(this);

    // provide element type based on props
    const Item = this.getStyledComponent();

    // augment the onClick handler
    props.onClick = onClick && this.guardedClick;

    return (
      <Item innerRef={r => (this.node = r)} {...props}>
        {cloneElement(avatar, { borderColor })}
        <Content truncate={enableTextTruncate}>
          <PrimaryText truncate={enableTextTruncate}>{primaryText}</PrimaryText>
          <SecondaryText truncate={enableTextTruncate}>{secondaryText}</SecondaryText>
        </Content>
      </Item>
    );
  }
}

export default withPseudoState(AvatarItem);
