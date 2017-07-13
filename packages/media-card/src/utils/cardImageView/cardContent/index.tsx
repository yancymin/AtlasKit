import * as React from 'react';
import {Component} from 'react';
import {MediaType, MediaItemType} from '@atlaskit/media-core';
import {MediaImage} from '../../mediaImage';
import {CardLoading} from '../../cardLoading';

export interface CardContentProps {
  mediaItemType?: MediaItemType;
  mediaType?: MediaType;
  dataURI?: string;
  loading?: boolean;
  crop?: boolean;
}

export class CardContent extends Component<CardContentProps, {}> {
  render() {
    const {loading, mediaType, mediaItemType, dataURI, crop} = this.props;

    if (loading) {
      return <CardLoading mediaItemType={mediaItemType} />;
    }

    if (this.shouldDisplayImageThumbnail(dataURI, mediaType)) {
      return <MediaImage dataURI={dataURI} fadeIn={loading} crop={crop}/>;
    } else {
      return null;
    }
  }

  private shouldDisplayImageThumbnail(dataURI?: string, mediaType?: MediaType): dataURI is string {
    return !!(mediaType !== 'doc' && dataURI);
  }
}
