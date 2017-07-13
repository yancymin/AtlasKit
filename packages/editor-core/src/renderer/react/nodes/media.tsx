import * as React from 'react';
import { PureComponent } from 'react';
import { EventHandlers } from '../../../ui/Renderer';
import ProviderFactory from '../../../providerFactory';
import { default as UIMedia } from '../../../ui/Media';
import { MediaType } from '../../../schema';
import { CardDimensions } from '@atlaskit/media-card';

export interface MediaProps {
  id: string;
  providers?: ProviderFactory;
  eventHandlers?: EventHandlers;
  type: MediaType;
  collection: string;
  cardDimensions?: CardDimensions;
}

export default class Media extends PureComponent<MediaProps, {}> {
  render() {
    const {
      eventHandlers,
      id,
      providers,
      type,
      collection,
      cardDimensions,
    } = this.props;

    return (
      <UIMedia
        id={id}
        type={type}
        collection={collection}
        providers={providers}
        onClick={eventHandlers && eventHandlers.media && eventHandlers.media.onClick}
        cardDimensions={cardDimensions}
      />
    );
  }
}
