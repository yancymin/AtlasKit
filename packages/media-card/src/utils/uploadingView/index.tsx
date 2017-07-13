import * as React from 'react';
import {Component} from 'react';
import {CardAction, CardActionType} from '@atlaskit/media-core';

import {ProgressBar} from '../progressBar';
import {MediaImage} from '../mediaImage';
import {Menu} from '../menu';
import {Ellipsify} from '../ellipsify';
import {Wrapper, Overlay, Title, Body, ProgressWrapper, CancelButtonWrapper} from './styled';

export interface UploadingViewProps {
  title?: string;
  progress: number;
  dataURI?: string;
  deleteAction?: CardAction;
}

export class UploadingView extends Component<UploadingViewProps, {}> {
  render() {
    const {title, progress, dataURI, deleteAction} = this.props;

    const cancelButton = deleteAction && deleteAction.type === CardActionType.delete
      ? (
        <CancelButtonWrapper>
          <Menu actions={[deleteAction]} triggerColor="white" />
        </CancelButtonWrapper>
      )
      : null;

    return (
      <Wrapper>
        <Overlay>
          <Title>
            <Ellipsify text={title || ''} lines={2}/>
          </Title>
          <Body>
              <ProgressWrapper>
                <ProgressBar progress={progress}/>
              </ProgressWrapper>
              {cancelButton}
            </Body>
        </Overlay>
        {dataURI && (
          <MediaImage dataURI={dataURI}/>
        )}
      </Wrapper>
    );
  }
}
