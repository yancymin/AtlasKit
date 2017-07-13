// @flow
import React, { Component } from 'react';

import { validIconSizes, propsOmittedFromClickData } from './constants';
import Presence from './Presence';
import Image from './AvatarImage';
import Status from './Status';

import Outer, { PresenceWrapper, StatusWrapper } from '../styled/Avatar';
import { DEFAULT_BORDER_COLOR } from '../styled/constants';
import { getInnerStyles } from '../styled/utils';
import Tooltip from '../styled/Tooltip';

import { omit } from '../utils';
import { getProps, getStyledComponent } from '../helpers';
import { mapProps, withPseudoState } from '../hoc';

import type {
  AvatarPropTypes,
  ComponentType,
  ElementType,
  FunctionType,
  StyledComponentType,
} from '../types';

class Avatar extends Component {
  props: AvatarPropTypes; // eslint-disable-line react/sort-comp
  node: { blur?: FunctionType, focus?: FunctionType };
  cache: {
    button?: ElementType,
    custom?: ComponentType,
    link?: ElementType,
    span?: ElementType,
  } = {};

  static defaultProps = {
    appearance: 'circle',
    borderColor: DEFAULT_BORDER_COLOR,
    enableTooltip: true,
    size: 'medium',
  }

  getCachedComponent(type: StyledComponentType) {
    if (!this.cache[type]) {
      this.cache[type] = getStyledComponent[type](getInnerStyles);
    }
    return this.cache[type];
  }
  getStyledComponent() {
    const { component, href, onClick } = this.props;
    let node: StyledComponentType = 'span';

    if (component) node = 'custom';
    else if (href) node = 'link';
    else if (onClick) node = 'button';

    return this.getCachedComponent(node);
  }

  // expose blur/focus to consumers via ref
  blur = (e: FocusEvent) => {
    if (this.node.blur) this.node.blur(e);
  }
  focus = (e: FocusEvent) => {
    if (this.node.focus) this.node.focus(e);
  }

  // disallow click on disabled avatars
  // only return avatar data properties
  guardedClick = (event: {}) => {
    const { isDisabled, onClick } = this.props;

    if (isDisabled || (typeof onClick !== 'function')) return;

    const item: {} = omit(this.props, ...propsOmittedFromClickData);

    onClick({ item, event });
  }

  // enforce status / presence rules
  /* eslint-disable no-console */
  renderIcon = () => {
    const { appearance, borderColor, presence, size, status } = this.props;
    const showPresence = !!presence;
    const showStatus = !!status;

    // add warnings for various invalid states
    if (!validIconSizes.includes(size) && (showPresence || showStatus)) {
      console.warn(`Avatar size "${size}" does NOT support ${showPresence ? 'presence' : 'status'}`);
      return null;
    }
    if (showPresence && showStatus) {
      console.warn('Avatar supports `presence` OR `status` properties, not both.');
      return null;
    }

    let indicator;

    if (showPresence) {
      const customPresenceNode = typeof presence === 'object'
        ? presence
        : null;

      indicator = (
        <PresenceWrapper appearance={appearance} size={size}>
          <Presence
            borderColor={borderColor}
            presence={!customPresenceNode && presence}
            size={size}
          >
            {customPresenceNode}
          </Presence>
        </PresenceWrapper>
      );
    } else if (showStatus) {
      indicator = (
        <StatusWrapper appearance={appearance} size={size}>
          <Status
            status={status}
            borderColor={borderColor}
            size={size}
          />
        </StatusWrapper>
      );
    }

    return indicator;
  }
  /* eslint-enable no-console */

  render() {
    const { appearance, enableTooltip, isHover, onClick, name, size, src, stackIndex } = this.props;

    // distill props from context, props, and state
    const props: AvatarPropTypes = getProps(this);

    // provide element type based on props
    const Inner = this.getStyledComponent();

    // augment the onClick handler
    props.onClick = onClick && this.guardedClick;

    return (
      <Outer size={size} stackIndex={stackIndex}>
        <Inner innerRef={r => (this.node = r)} {...props}>
          <Image
            alt={name}
            appearance={appearance}
            size={size}
            src={src}
          />
        </Inner>
        {(enableTooltip && isHover && name) ? (
          <Tooltip>{name}</Tooltip>
        ) : null}
        {this.renderIcon()}
      </Outer>
    );
  }
}

/**
*  1. Higher order components seem to ignore default properties. Mapping
*     `appearance` explicity here circumvents the issue.
*  2. The withPseudoState HOC should remain generic so rather than pass on
*     `enableTooltip` we map it to `isInteractive`.
*  3. Handle keyboard/mouse events and pass props to the wrapped component:
*     - isActive
*     - isFocus
*     - isHover
*/
export default mapProps({
  appearance: props => props.appearance || Avatar.defaultProps.appearance, // 1
  isInteractive: props => props.enableTooltip || Avatar.defaultProps.enableTooltip, // 2
})(withPseudoState(Avatar)); // 3
