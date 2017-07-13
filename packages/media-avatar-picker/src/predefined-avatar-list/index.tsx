import * as React from 'react';
import {PureComponent} from 'react';

import {AvatarList, Avatar} from '../avatar-list';

import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more';
import Button from '@atlaskit/button';
import {PredefinedAvatarsWrapper} from './styled';

interface ShowMoreButtonProps {
  onClick?: () => void;
}

class ShowMoreButton extends PureComponent<ShowMoreButtonProps, {}> {
  render() {
    return (
      <Button
        className="show-more-button"
        iconAfter={<EditorMoreIcon label="" size="large"/>}
        onClick={this.props.onClick}
      />
    );
  }
}

export interface PredefinedAvatarListProps {
  avatars: Array<Avatar>;
  selectedAvatar?: Avatar;
  onShowMore?: () => void;
  onAvatarSelected?: (avatar: Avatar) => void;
}

export interface PredefinedAvatarListState {
  selectedAvatar?: Avatar;
}

export class PredefinedAvatarList extends PureComponent<PredefinedAvatarListProps, PredefinedAvatarListState> {
  static defaultProps = {
    avatars: []
  };

  constructor() {
    super();

    this.onItemClick = this.onItemClick.bind(this);
  }

  componentWillMount() {
    this.setState(state => {
      const { avatars, selectedAvatar } = this.props;

      return {
        ...state,
        avatars,
        selectedAvatar: (!selectedAvatar && avatars.length > 0) ? avatars[0] : selectedAvatar
      };
    });
  }

  render() {
    const {avatars} = this.props;
    const selectableAvatars = avatars.map(
      a => ({
        avatar: a,
        selected: a === this.state.selectedAvatar
      })
    );

    return (
      <PredefinedAvatarsWrapper>
        <AvatarList avatars={selectableAvatars} onItemClick={this.onItemClick} />
        <ShowMoreButton onClick={this.props.onShowMore} />
      </PredefinedAvatarsWrapper>
    );
  }

  onItemClick(avatar: Avatar) {
    this.setState(state => {
      const { onAvatarSelected } = this.props;
      if (onAvatarSelected) {
        onAvatarSelected(avatar);
      }

      return {...state, selectedAvatar: avatar};
    });
  }
}
