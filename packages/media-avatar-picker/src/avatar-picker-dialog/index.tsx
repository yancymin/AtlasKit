import * as React from 'react';
import {PureComponent} from 'react';

import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';

import {Avatar} from '../avatar-list';
import {ImageNavigator} from '../image-navigator';
import {PredefinedAvatarList} from '../predefined-avatar-list';

import {AvatarPickerViewWrapper} from './styled';
import {PredefinedAvatarView} from '../predefined-avatar-view';

export interface AvatarPickerDialogProps {
  imageSource?: string;
  avatars: Array<Avatar>;
}

export enum Mode {
  Cropping,
  PredefinedAvatars,
}

export interface AvatarPickerDialogState {
  mode: Mode;
}

export class AvatarPickerDialog extends PureComponent<AvatarPickerDialogProps, AvatarPickerDialogState> {
  static defaultProps = {
    avatars: []
  };

  constructor() {
    super();

    this.state = {mode: Mode.Cropping};
  }

  render() {
    return (
      <ModalDialog
        width="352px"
        header="Upload an avatar"
        footer={
          <div>
            <Button appearance="primary">Save</Button>
            <Button appearance="subtle-link">Cancel</Button>
          </div>
        }
        isOpen={true}
      >
        <AvatarPickerViewWrapper>
          {this.renderContent()}
        </AvatarPickerViewWrapper>
      </ModalDialog>
    );
  }

  renderContent() {
    const {imageSource, avatars} = this.props;
    const {mode} = this.state;

    switch (mode) {
      case Mode.Cropping:
        return (
          <div className="cropping-wrapper">
            <div className="cropper">
              <ImageNavigator imageSource={imageSource} />
            </div>
            <div className="predefined-avatars">
              <PredefinedAvatarList
                avatars={avatars.slice(0, 5)}
                onShowMore={this.onShowMore}
              />
            </div>
          </div>
        );
      case Mode.PredefinedAvatars:
        return (
          <div className="predefined-avatars-wrapper">
            <PredefinedAvatarView
              avatars={avatars}
              onGoBack={this.onGoBack}
            />
          </div>
        );
    }
  }

  onShowMore = () => {
    this.setState(state => {
      return {...state, mode: Mode.PredefinedAvatars};
    });
  }

  onGoBack = () => {
    this.setState(state => {
      return {...state, mode: Mode.Cropping};
    });
  }
}
