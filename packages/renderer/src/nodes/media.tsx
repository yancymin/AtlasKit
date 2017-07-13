import * as React from 'react';
import { PureComponent } from 'react';
import {
  Context,
  ContextConfig,
  ContextFactory,
  FileDetails,
  MediaItemType,
  MediaProvider,
  MediaState,
  UrlPreview,
  ImageResizeMode
} from '@atlaskit/media-core';
import {
  Card,
  CardDimensions,
  CardEvent,
  CardStatus,
  CardView,
  MediaIdentifier,
  UrlPreviewIdentifier,
} from '@atlaskit/media-card';

import { Renderable } from './';
import { CardEventClickHandler } from '../config';

export interface MediaNode extends Renderable {
  type: string;
  attrs: {
    type: MediaItemType;
    id: string;
    collection: string;
  };
}

export interface MediaProps {
  mediaProvider?: Promise<MediaProvider>;
  onClick?: CardEventClickHandler;
  cardDimensions?: CardDimensions;
  item: MediaNode;
  resizeMode?: ImageResizeMode;
}

export interface State extends MediaState {
  mediaProvider?: MediaProvider;
  viewContext?: Context;
}

/**
 * Map media state status into CardView processing status
 * Media state status is more broad than CardView API so we need to reduce it
 */
function mapMediaStatusIntoCardStatus(state: MediaState): CardStatus {
  switch (state.status) {
    case 'ready':
    case 'unknown':
    case 'unfinalized':
      return 'complete';

    case 'processing':
      return 'processing';

    case 'uploading':
      return 'uploading';

    // default case is to let TypeScript know that this function always returns a string
    case 'error':
    default:
      return 'error';
  }
}

export default class Media extends PureComponent<MediaProps, State> {
  private destroyed = false;
  private thumbnailWm = new WeakMap();

  state: State = {
    id: '',
    status: 'unknown'
  };

  componentWillMount() {
    this.handleMediaProvider(this.props);
  }

  componentWillUnmount() {
    this.destroyed = true;

    const { mediaProvider } = this.state;
    if (!mediaProvider) {
      return;
    }

    const { stateManager } = mediaProvider;
    if (stateManager) {
      const { id } = this.props.item.attrs;
      stateManager.unsubscribe(id, this.handleMediaStateChange);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { mediaProvider } = nextProps;

    if (this.props.mediaProvider !== mediaProvider) {
      this.handleMediaProvider(nextProps);
    }
  }

  render() {
    switch (this.props.item.attrs.type) {
      case 'file':
        return this.renderFile();

      case 'link':
        return this.renderLink();

      default:
        return null;
    }
  }

  private async handleMediaProvider(props: MediaProps) {
    if (this.destroyed) {
      return;
    }

    const { mediaProvider } = props;
    const { id } = props.item.attrs;

    if (!mediaProvider) {
      this.setState({ mediaProvider });
      return;
    }

    const resolvedMediaProvider = await mediaProvider;
    if (this.destroyed) {
      return;
    }

    if (!resolvedMediaProvider) {
      this.setState({ mediaProvider: undefined });
      return;
    }

    this.setState({ mediaProvider: resolvedMediaProvider });

    const { stateManager } = resolvedMediaProvider;
    if (stateManager) {
      stateManager.subscribe(id, this.handleMediaStateChange);

      const mediaState = stateManager.getState(id);
      this.setState({ ...mediaState });
    }

    let context = await resolvedMediaProvider.viewContext;
    if ('clientId' in (context as ContextConfig)) {
      context = ContextFactory.create(context as ContextConfig);
    }

    if (this.destroyed) {
      return;
    }

    this.setState({ viewContext: context as Context });
  }

  private handleMediaStateChange = (mediaState: MediaState) => {
    if (this.destroyed) {
      return;
    }

    this.setState({ ...mediaState });
  }

  private handleLinkCardViewClick(result: CardEvent) {
    result.event.preventDefault();
  }

  private renderLink() {
    const { mediaProvider, viewContext } = this.state;
    const { cardDimensions, item, onClick } = this.props;
    const { collection, id } = item.attrs;

    if (!mediaProvider || !viewContext) {
      const previewDetails = {
        type: '',
        url: '',
        title: ' ... loading'
      } as UrlPreview;

      return <CardView
        // CardViewProps
        status="loading"
        mediaItemType="link"
        metadata={previewDetails}
        dimensions={cardDimensions}

        // SharedCardProps
        onClick={this.handleLinkCardViewClick}
      />;
    }

    const mediaIdentifier = {
      mediaItemType: 'link',
      id: id || '',
      collectionName: collection || ''
    } as MediaIdentifier;

    const urlPreviewIdentifier = {
      mediaItemType: 'link',
      url: id
    } as UrlPreviewIdentifier;

    return (
      <Card
        context={viewContext}
        dimensions={cardDimensions}
        identifier={id ? mediaIdentifier : urlPreviewIdentifier}
        onClick={onClick}
        resizeMode={this.resizeMode}
      />
    );
  }

  private renderFile() {
    const { mediaProvider, viewContext } = this.state;
    const { cardDimensions, item } = this.props;
    const { id } = item.attrs;

    if (!mediaProvider || !viewContext) {
      return <CardView
        status="loading"
        mediaItemType="file"
        dimensions={cardDimensions}
      />;
    }

    if (id.substr(0, 10) === 'temporary:') {
      return this.renderTemporaryFile();
    } else {
      return this.renderPublicFile();
    }
  }

  private renderPublicFile() {
    const { viewContext } = this.state;
    const { cardDimensions, item, onClick } = this.props;
    const { collection, id } = item.attrs;

    return (
      <Card
        context={viewContext!}
        dimensions={cardDimensions}
        identifier={{
          id,
          mediaItemType: 'file',
          collectionName: collection
        }}
        selectable={false}
        onClick={onClick}
        resizeMode={this.resizeMode}
      />
    );
  }

  private renderTemporaryFile() {
    const { state } = this;
    const { thumbnail, fileName, fileSize, fileType} = state;

    // Cache the data url for thumbnail, so it's not regenerated on each re-render (prevents flicker)
    let dataURI: string | undefined;
    if (thumbnail) {
      if (this.thumbnailWm.has(thumbnail)) {
        dataURI = this.thumbnailWm.get(thumbnail);
      } else {
        dataURI = URL.createObjectURL(thumbnail);
        this.thumbnailWm.set(thumbnail, dataURI);
      }
    }

    // Make sure that we always display progress bar when the file is uploading (prevents flicker)
    let progress = state.progress;
    if (!progress && state.status === 'uploading') {
      progress = .0;
    }

    // Construct file details object
    const fileDetails: FileDetails = {
      name: fileName,
      size: fileSize,
      mimeType: fileType,
      mediaType: (thumbnail || (fileType && fileType.indexOf('image/') > -1) ? 'image' : 'unknown')
    };

    return <CardView
      // CardViewProps
      status={mapMediaStatusIntoCardStatus(state)}
      mediaItemType="file"
      metadata={fileDetails}

      // FileCardProps
      dataURI={dataURI}
      progress={progress}
    />;
  }

  private get resizeMode(): ImageResizeMode {
    const {resizeMode} = this.props;

    return resizeMode || 'full-fit';
  }
}
