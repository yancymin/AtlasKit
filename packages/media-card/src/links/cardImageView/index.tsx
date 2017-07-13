import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction, ImageResizeMode} from '@atlaskit/media-core';

import {CardDimensions, CardAppearance, CardStatus} from '../../index';
import {CardImageView} from '../../utils/cardImageView';
import {Href} from '../../utils/href';

export interface LinkCardImageViewProps {
  linkUrl: string;
  title: string;
  site?: string;
  description?: string;
  thumbnailUrl?: string;
  iconUrl?: string;
  appearance?: CardAppearance;
  dimensions?: CardDimensions;
  resizeMode?: ImageResizeMode;
  status: CardStatus;
  actions?: Array<CardAction>;
  error?: string;

  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
}

export class LinkCardImageView extends Component<LinkCardImageViewProps, {}> {
  render() {
    const {error, linkUrl} = this.props;

    return error || this.isDownloadingOrProcessing()
      ? this.getCardImageView()
      : <Href linkUrl={linkUrl}>{this.getCardImageView()}</Href>;
  }

  private isDownloadingOrProcessing() {
    const {status} = this.props;
    return status === 'loading' || status === 'processing';
  }

  private getCardImageView(): JSX.Element {
    const {title, site, thumbnailUrl, status, dimensions, actions, onClick, onMouseEnter, error, iconUrl, linkUrl, resizeMode} = this.props;

    return (
      <CardImageView
        mediaItemType="link"
        mediaName={title}
        subtitle={site || linkUrl}
        mediaType="image"
        dataURI={thumbnailUrl}
        status={status}
        dimensions={dimensions}
        actions={actions}
        error={error}
        icon={iconUrl}
        resizeMode={resizeMode}

        onClick={onClick}
        onMouseEnter={onMouseEnter}
      />
    );
  }
}
