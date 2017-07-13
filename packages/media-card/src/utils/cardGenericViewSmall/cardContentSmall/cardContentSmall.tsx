import * as React from 'react';
import {Component} from 'react';
import {LoadingWrapper} from '../styled';
import {PlaceholderSmall} from '../placholderSmall/placeholderSmall';
import {MediaType} from '@atlaskit/media-core';
import {MediaImage} from '../../../utils';

export interface CardContentProps {
  mediaType: MediaType;
  dataURI?: string;
  loading?: boolean;
}

export class CardContentSmall extends Component<CardContentProps, {}> {
  render() {
    const {loading, mediaType, dataURI} = this.props;

    if (loading) {
      return <LoadingWrapper />;
    }

    if (this.shouldDisplayImageThumbnail(dataURI)) {
      return <MediaImage dataURI={dataURI} fadeIn={loading} />;
    } else {
      return <PlaceholderSmall mediaType={mediaType} />;
    }
  }

  private shouldDisplayImageThumbnail(dataURI?: string): dataURI is string {
    return !!(dataURI);
  }
}
