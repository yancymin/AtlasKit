import * as React from 'react';
import { PureComponent } from 'react';
import MediaComponent from './MediaComponent';
import { CardEventClickHandler } from '../Renderer';
import { MediaType } from '../../schema';
import { CardDimensions } from '@atlaskit/media-card';
import {
  CardEventHandler,
  ImageResizeMode,
} from '@atlaskit/media-core';
import {
  default as ProviderFactory,
  WithProviders
} from '../../providerFactory';
import { EditorView } from '../../prosemirror';

export interface MediaProps {
  id: string;
  editorView?: EditorView;
  providers?: ProviderFactory;
  type: MediaType;
  collection: string;
  cardDimensions?: CardDimensions;
  resizeMode?: ImageResizeMode;
  onClick?: CardEventClickHandler;
  onDelete?: CardEventHandler;
}

export default class Media extends PureComponent<MediaProps, {}> {
  private providerFactory: ProviderFactory;

  constructor(props) {
    super(props);
    this.providerFactory = props.providers || new ProviderFactory();
  }

  componentWillUnmount() {
    if (!this.props.providers) {
      // new ProviderFactory is created if no `providers` has been set
      // in this case when component is unmounted it's safe to destroy this providerFactory
      this.providerFactory.destroy();
    }
  }

  private renderWithProvider = (providers) => {
    const {
      id,
      type,
      collection,
      cardDimensions,
      onClick,
      onDelete,
      resizeMode,
    } = this.props;

    return (
      <MediaComponent
        id={id}
        mediaProvider={providers.mediaProvider}
        type={type}
        collection={collection}
        cardDimensions={cardDimensions}
        resizeMode={resizeMode}
        onDelete={onDelete}
        onClick={onClick}
      />
    );
  }

  render() {
    return (
      <WithProviders
        providers={['mediaProvider']}
        providerFactory={this.providerFactory}
        renderNode={this.renderWithProvider}
      />
    );
  }
}
