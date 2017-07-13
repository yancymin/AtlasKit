import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction, MediaType, ImageResizeMode} from '@atlaskit/media-core';

import {CardDimensions, CardStatus} from '../../index';
import {CardImageView} from '../../utils/cardImageView';
import {toHumanReadableMediaSize} from '../../utils';

export interface FileCardImageViewProps {
  mediaName?: string;
  mediaType?: MediaType;
  mediaSize?: number;

  dataURI?: string;
  progress?: number;
  status: CardStatus;

  dimensions?: CardDimensions;
  resizeMode?: ImageResizeMode;

  selectable?: boolean;
  selected?: boolean;

  error?: string;

  actions?: Array<CardAction>;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onRetry?: CardAction;
}

export class FileCardImageView extends Component<FileCardImageViewProps, {}> {
  render() {
    const {error, mediaSize, mediaType, mediaName, dataURI, progress, status, dimensions,
       selectable, selected, actions, onClick, onMouseEnter, onRetry, resizeMode} = this.props;
    const fileSize = toHumanReadableMediaSize(mediaSize || 0);

    return <CardImageView
      error={error}
      mediaType={mediaType}
      mediaName={mediaName}
      subtitle={fileSize}
      dataURI={dataURI}
      progress={progress}
      status={status}
      dimensions={dimensions}
      selectable={selectable}
      selected={selected}
      actions={actions}
      resizeMode={resizeMode}

      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onRetry={onRetry}
    />;
  }
}

export default FileCardImageView;
