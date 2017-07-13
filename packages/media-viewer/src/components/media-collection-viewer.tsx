import * as React from 'react';
import { Component } from 'react';
import { Context, MediaCollectionProvider } from '@atlaskit/media-core';
import { Subscription } from 'rxjs/Subscription';
import { fetchToken } from '../domain/fetch-token';
import { MediaFileAttributesFactory } from '../domain/media-file-attributes';
import { MediaViewerConstructor, MediaViewerInterface, MediaViewerConfig } from '../mediaviewer';

export interface MediaCollectionViewerProps {
  readonly context: Context;
  readonly occurrenceKey: string;
  readonly collectionName: string;
  readonly pageSize?: number;

  readonly MediaViewer: MediaViewerConstructor;
  readonly mediaViewerConfiguration?: MediaViewerConfig;
  readonly basePath: string;

  readonly onClose?: () => void;
}

export interface MediaCollectionViewerState {
  readonly provider: MediaCollectionProvider;
  readonly mediaViewer: MediaViewerInterface;
}

export class MediaCollectionViewer extends Component<MediaCollectionViewerProps, MediaCollectionViewerState> {
  private subscription: Subscription;

  static readonly defaultPageSize = 10;

  constructor(props: MediaCollectionViewerProps) {
    super(props);

    const { context, collectionName, basePath, MediaViewer, mediaViewerConfiguration } = props;
    const { config } = context;
    const { clientId, tokenProvider } = config;
    const pageSize = this.props.pageSize || MediaCollectionViewer.defaultPageSize;

    this.state = {
      provider: context.getMediaCollectionProvider(collectionName, pageSize),
      mediaViewer: new MediaViewer({
        ...mediaViewerConfiguration,
        assets: {
          basePath: basePath
        },
        fetchToken: fetchToken(clientId, tokenProvider, collectionName)
      })
    };
  }

  componentDidMount(): void {
    const { context, occurrenceKey, onClose } = this.props;
    const { config } = context;
    const { serviceHost } = config;
    const { mediaViewer, provider } = this.state;

    if (onClose) {
      mediaViewer.on('fv.close', onClose);
    }

    mediaViewer.on('fv.changeFile', this.loadNextPageIfRequired);

    this.subscription = provider
      .observable()
      .subscribe({
        next: collection => {
          const files = MediaFileAttributesFactory.fromMediaCollection(collection, serviceHost);
          if (mediaViewer.isOpen()) {
            mediaViewer.setFiles(files, { id: mediaViewer.getCurrent().id });
          } else {
            mediaViewer.setFiles(files);
            mediaViewer.open({ id: occurrenceKey });
          }
        }
      });
  }

  componentWillUnmount(): void {
    const { onClose } = this.props;
    const { mediaViewer } = this.state;

    this.subscription.unsubscribe();
    if (onClose) {
      mediaViewer.off('fv.close', onClose);
    }
    mediaViewer.off('fv.changeFile', this.loadNextPageIfRequired);
  }

  render(): JSX.Element {
    return (
      <div />
    );
  }

  private loadNextPageIfRequired = () => {
    const { mediaViewer, provider } = this.state;
    if (mediaViewer.isShowingLastFile()) {
      provider.loadNextPage();
    }
  }
}
