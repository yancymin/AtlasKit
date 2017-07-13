import * as React from 'react';
import {PureComponent} from 'react';

import {PredefinedAvatarViewWrapper, LargeAvatarImage} from './styled';
import {Avatar} from '../avatar-list';

import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import Button from '@atlaskit/button';

export interface BackBtnProps {
  onClick?: () => void;
}

class BackBtn extends PureComponent<BackBtnProps, {}> {
  render() {
    return (
      <Button
        className="back-button"
        iconAfter={<ArrowLeftIcon label="" />}
        onClick={this.props.onClick}
      />
    );
  }
}

export interface PredefinedAvatarViewProps {
  avatars: Array<Avatar>;
  onGoBack?: () => void;
  onAvatarSelected?: (avatar: Avatar) => void;
}

export interface PredefinedAvatarViewState {
  selectedAvatar?: Avatar;
}

export class PredefinedAvatarView extends PureComponent<PredefinedAvatarViewProps, PredefinedAvatarViewState> {
  static defaultProps = {
    avatars: []
  };

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const {avatars} = this.props;
    const cards = avatars.map(
      (avatar, idx) => {
        const elementKey = `predefined-avatar-${idx}`;
        return (<li key={elementKey}>
          <LargeAvatarImage
            className={avatar === this.state.selectedAvatar ? 'selected' : ''}
            src={avatar.dataURI}
            // tslint:disable-next-line:jsx-no-lambda
            onClick={(e) => this.createOnItemClickHandler(avatar)}
          />
        </li>);
      }
    );

    return (
      <PredefinedAvatarViewWrapper>
        <div className="header">
          <BackBtn onClick={this.props.onGoBack} /><div className="description">Default avatars</div>
        </div>
        <ul>
          {cards}
        </ul>
      </PredefinedAvatarViewWrapper>
    );
  }

  createOnItemClickHandler(avatar: Avatar): (event: Event) => void {
    return () => {
      const { onAvatarSelected } = this.props;
      if (onAvatarSelected) {
        onAvatarSelected(avatar);
      }

      this.setState(state => {
        return {...state, selectedAvatar: avatar};
      });
    };
  }
}
