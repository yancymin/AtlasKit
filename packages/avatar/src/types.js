// @flow
import { Component, Element } from 'react';
import type { PropType } from 'babel-plugin-react-flow-props-to-prop-types';

export type ChildrenType = PropType<Array<Element<any>> | Element<any>, any>;
export type ComponentType = PropType<Component<{}, {}, {}>, any>;
export type ElementType = PropType<Element<mixed>, any>;
export type FunctionType = (...args: Array<any>) => mixed;

export type AppearanceType = 'circle' | 'square';
export type PresenceType = ('online' | 'busy' | 'offline') | ComponentType;
export type SizeType = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
export type StatusType = 'approved' | 'declined' | 'locked';
export type StyledComponentType = 'custom' | 'button' | 'link' | 'span';

export type AvatarClickType = ({ event: KeyboardEvent | MouseEvent, item: {} }) => void;

/* eslint-disable react/no-unused-prop-types */
export type AvatarPropTypes = {
  /** Indicates the shape of the avatar. Most avatars are circular, but square avatars
  can be used for 'container' objects. */
  appearance?: AppearanceType,
  /** Used to override the default border color of the presence indicator.
  Accepts any color argument that the border-color CSS property accepts. */
  borderColor?: string,
  /** A custom component to use instead of the default span. */
  component?: ComponentType,
  /** Display a tooltip on hover */
  enableTooltip?: boolean,
  /** Provides a url for avatars being used as a link. */
  href?: string,
  /** Change the style to indicate the avatar is active. */
  isActive?: boolean,
  /** Change the style to indicate the avatar is disabled. */
  isDisabled?: boolean,
  /** Change the style to indicate the avatar is focused. */
  isFocus?: boolean,
  /** Change the style to indicate the avatar is hovered. */
  isHover?: boolean,
  /** Change the style to indicate the avatar is selected. */
  isSelected?: boolean,
  /** Name will be displayed in a tooltip, also used by screen readers as fallback
  content if the image fails to load. */
  name?: string,
  /** Handler to be called on click. */
  onClick?: AvatarClickType,
  /** Indicates a user's online status by showing a small icon on the avatar.
  Refer to presence values on the Presence component.
  Alternatively accepts any React element. For best results, it is recommended to
  use square content with height and width of 100%. */
  presence?: PresenceType,
  /** Defines the size of the avatar */
  size?: SizeType,
  /** A url to load an image from (this can also be a base64 encoded image). */
  src?: string,
  /** Indicates contextual information by showing a small icon on the avatar.
  Refer to status values on the Status component. */
  status?: StatusType,
  /** The index of where this avatar is in the group `stack`. */
  stackIndex?: number,
  /** Assign specific tabIndex order to the underlying node. */
  tabIndex?: number,
  /** Pass target down to the anchor, if href is provided. */
  target?: '_blank' | '_self',
};
/* eslint-enable react/no-unused-prop-types */
