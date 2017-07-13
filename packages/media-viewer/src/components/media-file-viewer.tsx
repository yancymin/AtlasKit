import * as React from 'react';
import { Component } from 'react';
import { Subscription } from 'rxjs/Subscription';
import { Context, FileItem } from '@atlaskit/media-core';
import { fetchToken } from '../domain/fetch-token';
import { MediaFileAttributesFactory } from '../domain/media-file-attributes';
import { MediaViewerInterface, MediaViewerConstructor, MediaViewerConfig } from '../mediaviewer';

export interface MediaFileViewerProps {
  readonly context: Context;
  readonly fileId: string;
  readonly collectionName?: string;

  readonly MediaViewer: MediaViewerConstructor;
  readonly mediaViewerConfiguration?: MediaViewerConfig;
  readonly basePath: string;
  readonly onClose?: () => void;
}

export interface MediaFileViewerState {
  readonly mediaViewer: MediaViewerInterface;
}

export class MediaFileViewer extends Component<MediaFileViewerProps, MediaFileViewerState> {
  private subscription: Subscription;

  componentDidMount(): void {
    const { context, fileId, collectionName, basePath, onClose, MediaViewer, mediaViewerConfiguration } = this.props;
    const { config } = context;
    const { serviceHost, clientId, tokenProvider } = config;

    this.setState({
      mediaViewer: new MediaViewer({
        ...mediaViewerConfiguration,
        assets: {
          basePath: basePath
        },
        fetchToken: fetchToken(clientId, tokenProvider, collectionName)
      })
    }, () => {
      const { mediaViewer } = this.state;
      const provider = context.getMediaItemProvider(fileId, 'file', collectionName);

      this.subscription = provider.observable().subscribe({
        next: (item: FileItem) => {
          if (onClose) {
            mediaViewer.on('fv.close', onClose);
          }
          mediaViewer.setFiles([MediaFileAttributesFactory.fromFileItem(item, serviceHost)]);
          mediaViewer.open({ id: item.details.id });
        }
      });
    });
  }

  componentWillUnmount?(): void {
    this.subscription.unsubscribe();
  }

  render(): JSX.Element {
    return (
      <div />
    );
  }
}
