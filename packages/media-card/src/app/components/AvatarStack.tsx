import * as React from 'react';
import Avatar from '@atlaskit/avatar';
import { StackWrapper, ItemWrapper, MoreAvatar } from '../styled/AvatarStack';

export interface AvatarStackProps {
  avatars: {
    src?: string;
    icon?: JSX.Element;
    label?: string;
    presence?: 'none' | 'online' | 'busy' | 'offline';
  }[];
  max?: number;
  size?: 'small' | 'medium';
  borderColor?: string;
}

export const AvatarStack = (props: AvatarStackProps) => { /* tslint:disable-line:variable-name */
  const { avatars, max = 5, size = 'medium', borderColor = 'white'} = props;

  const tooManyAvatars = avatars.length > max;
  const avatarsSubset = avatars.slice(0, tooManyAvatars ? max - 1 : max);

  // reverse the array so the ordering is maintained when using flex-direction: row-reverse
  // clone the array because .reverse() mutates the array rather than returning a copy
  const avatarsReversed = [...avatarsSubset].reverse();

  return (
    <StackWrapper>
      {tooManyAvatars && (
        <ItemWrapper key="more-avatars" borderColor={borderColor}>
          <MoreAvatar avatarSize={size}>+{(avatars.length - max) + 1}</MoreAvatar>
        </ItemWrapper>
      )}
      {avatarsReversed.map((avatar, index) => (
        <ItemWrapper key={index} borderColor={borderColor}>
          <Avatar
            {...avatar}
            appearance="circle"
            size={size}
            presenceBorderColor={borderColor}
          />
        </ItemWrapper>
      ))}
    </StackWrapper>
  );
};
