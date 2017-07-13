// @flow
import React, { Component } from 'react';
import DropdownMenu from '@atlaskit/dropdown-menu';
import Avatar from './Avatar';
import { Grid, Stack } from '../styled/AvatarGroup';
import { DEFAULT_BORDER_COLOR } from '../styled/constants';
import MoreIndicator from '../components/MoreIndicator';
import type { AvatarClickType, AvatarPropTypes, ComponentType, FunctionType, SizeType } from '../types';

const GROUP_COMPONENT = {
  grid: Grid,
  stack: Stack,
};
const MAX_COUNT = {
  grid: 11,
  stack: 5,
};

type Props = {
  /** Indicates the shape of the avatar. Most avatars are circular, but square avatars
  can be used for 'container' objects. */
  appearance: 'grid' | 'stack',
  /** Component used to render each avatar */
  avatar?: ComponentType,
  /** Typically the background color that the avatar is presented on.
  Accepts any color argument that the CSS border-color property accepts. */
  borderColor?: string,
  /** Array of avatar data passed to each `avatar` component */
  data: Array<AvatarPropTypes>,
  /** The maximum number of avatars allowed in the grid */
  maxCount?: number,
  /** Handle the click event on the avatar item */
  onAvatarClick?: AvatarClickType,
  /** Take control of the click event on the more indicator. This will cancel
  the default dropdown behaviour. */
  onMoreClick?: FunctionType,
  /** Defines the size of the avatar */
  size?: SizeType,
};

export default class AvatarGroup extends Component {
  props: Props; // eslint-disable-line react/sort-comp

  static defaultProps = {
    appearance: 'stack',
    avatar: Avatar,
    maxCount: 0,
    size: 'medium',
  }

  renderMoreDropdown(max: number, total: number) {
    const { appearance, data, borderColor, onMoreClick, onAvatarClick, size } = this.props;

    // bail if there's not enough items
    if (total <= max) return null;

    // prepare the button -- we'll use it twice
    const MoreButton = props => (
      <MoreIndicator
        borderColor={borderColor || DEFAULT_BORDER_COLOR}
        count={total - max}
        isInteractive
        isStack={appearance === 'stack'}
        size={size}
        {...props}
      />
    );

    // bail if the consumer wants to handle onClick
    if (typeof onMoreClick === 'function') {
      return <MoreButton onClick={onMoreClick} />;
    }

    // crop and prepare the dropdown items
    const items = data.slice(max).map(avatar => ({
      content: avatar.name,
      elemBefore: <Avatar {...avatar} size="small" borderColor="transparent" />,
      href: avatar.href,
      rel: avatar.target ? 'noopener noreferrer' : null,
      target: avatar.target,
    }));

    return (
      <DropdownMenu items={[{ items }]} onItemActivated={onAvatarClick} position="bottom right">
        <MoreButton />
      </DropdownMenu>
    );
  }

  render() {
    const {
      avatar: Item, appearance, borderColor, data, maxCount, onAvatarClick, size,
    } = this.props;

    // NOTE: conditionally defaulting the `maxCount` prop based on `appearance`
    const max = (maxCount === 0) ? MAX_COUNT[appearance] : maxCount;
    const total = data.length;
    const Group = GROUP_COMPONENT[appearance];

    const items = data.slice(0, max).map((avatar, idx) => (
      <Item
        {...avatar}
        borderColor={borderColor}
        groupAppearance={appearance}
        index={idx}
        onClick={avatar.onClick || onAvatarClick}
        size={size}
        stackIndex={max - idx}
      />
    ));

    return (
      <Group size={size}>
        {items}
        {this.renderMoreDropdown(max, total)}
      </Group>
    );
  }
}
