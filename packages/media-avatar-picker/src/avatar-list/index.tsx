import * as React from 'react';
import {PureComponent} from 'react';

import {AvatarListWrapper} from './styled';
import {SmallAvatarImage} from '../predefined-avatar-view/styled';

export interface Avatar {
  dataURI: string;
}

export interface SelectableAvatar {
  avatar: Avatar;
  selected: boolean;
}

export interface AvatarListProps {
  avatars: Array<SelectableAvatar>;
  onItemClick?: (avatar: Avatar) => void;
}

export class AvatarList extends PureComponent<AvatarListProps, {}> {
  static defaultProps = {
    avatars: []
  };

  render() {
    const {avatars} = this.props;
    const cards = avatars.map(
      (avatar, idx) => {
        const elementKey = `predefined-avatar-${idx}`;
        return (<li key={elementKey}>
          <SmallAvatarImage
            className={avatar.selected ? 'selected' : ''}
            src={avatar.avatar.dataURI}
            // tslint:disable-next-line:jsx-no-lambda
            onClick={(e) => this.onItemClick(avatar)}
          />
        </li>);
      }
    );

    return (
      <AvatarListWrapper>
        <ul>
          {cards}
        </ul>
      </AvatarListWrapper>
    );
  }

  onItemClick(avatar: SelectableAvatar) {
    const { onItemClick } = this.props;
    if (onItemClick) {
      onItemClick(avatar.avatar);
    }
  }
}
