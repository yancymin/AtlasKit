import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import * as mediaTestHelpers from '@atlaskit/media-test-helpers';
import {
  Context,
  ContextConfig,
  ContextFactory,
  MediaProvider,
  MediaStateManager,
  DefaultMediaStateManager,
} from '@atlaskit/media-core';
import MediaComponent from '../../../src/ui/Media/MediaComponent';
import { MediaType } from '../../../src/schema';
import {
  Card,
  CardView,
  CardViewProps,
} from '@atlaskit/media-card';
import {
  storyMediaProviderFactory,
  randomId,
} from '../../../src/test-helper';

describe('@atlaskit/editor-core/ui/MediaComponent', () => {
  const file = {
    type: 'media',
    attrs: {
      type: 'file',
      id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
      collection: 'MediaServicesSample'
    }
  };

  const tempFile = {
    type: 'media',
    attrs: {
      type: 'file',
      id: 'temporary:5556346b-b081-482b-bc4a-4faca8ecd2de',
      collection: 'MediaServicesSample'
    }
  };

  const link = {
    type: 'media',
    attrs: {
      type: 'link',
      id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
      collection: 'MediaServicesSample'
    }
  };

  const stateManager = new DefaultMediaStateManager();
  const testCollectionName = `media-plugin-mock-collection-${randomId()}`;

  const getFreshResolvedProvider = () => {
    return Promise.resolve(storyMediaProviderFactory(mediaTestHelpers, testCollectionName, stateManager)) as Promise<MediaProvider>;
  };

  it('should render a CardView component if the media type is file without provider', () => {
    const mediaComponent = shallow(
      <MediaComponent
        id={file.attrs.id}
        type={file.attrs.type as MediaType}
        collection={file.attrs.collection}
      />);
    const props: CardViewProps = mediaComponent.find(CardView).props();
    expect(mediaComponent.find(CardView).length).to.equal(1);
    expect(props.mediaItemType).to.equal('file');
    expect(props.status).to.equal('loading');
  });

  it('should render a Card component if the media is a public file with provider', async () => {
    const mediaProvider: Promise<MediaProvider> = Promise.resolve({
      viewContext: Promise.resolve({})
    });
    const mediaComponent = shallow(
      <MediaComponent
        id={file.attrs.id}
        type={file.attrs.type as MediaType}
        collection={file.attrs.collection}
        mediaProvider={mediaProvider}
      />);

    const resolvedMediaProvider = await mediaProvider;
    await resolvedMediaProvider.viewContext;

    expect(mediaComponent.find(Card).length).to.equal(1);
  });

  it('should render a CardView component if the media is a temporary file with provider', async () => {
    const mediaProvider: Promise<MediaProvider> = Promise.resolve({
      viewContext: Promise.resolve({})
    });
    const mediaComponent = shallow(
      <MediaComponent
        id={tempFile.attrs.id}
        type={tempFile.attrs.type as MediaType}
        collection={tempFile.attrs.collection}
        mediaProvider={mediaProvider}
      />);

    const resolvedMediaProvider = await mediaProvider;
    await resolvedMediaProvider.viewContext;

    expect(mediaComponent.find(CardView).length).to.equal(1);
  });


  it('should render nothing if media type is link without provider', async () => {
    const mediaProvider = getFreshResolvedProvider();
    const mediaComponent = shallow(
      <MediaComponent
        id={link.attrs.id}
        type={link.attrs.type as MediaType}
        collection={link.attrs.collection}
      />);

    const resolvedMediaProvider = await mediaProvider;
    const resolvedLinkCreateContextConfig = await resolvedMediaProvider.linkCreateContext as ContextConfig;
    const linkCreateContext = ContextFactory.create(resolvedLinkCreateContextConfig) as Context;
    mediaComponent.setState({ 'linkCreateContext': linkCreateContext });

    expect(mediaComponent.find(Card).length).to.equal(0);
  });

  it('should render nothing if linkCreateContext not provided', async () => {
    const mediaProvider = getFreshResolvedProvider();
    const mediaComponent = shallow(
      <MediaComponent
        id={link.attrs.id}
        type={link.attrs.type as MediaType}
        collection={link.attrs.collection}
        mediaProvider={mediaProvider}
      />);

    await mediaProvider;

    expect(mediaComponent.find(Card).length).to.equal(0);
  });

  it('should render a Card component if media type is link with provider', async () => {
    const mediaProvider = getFreshResolvedProvider();
    const mediaComponent = shallow(
      <MediaComponent
        id={link.attrs.id}
        type={link.attrs.type as MediaType}
        collection={link.attrs.collection}
        mediaProvider={mediaProvider}
      />);

    const resolvedMediaProvider = await mediaProvider;
    const resolvedLinkCreateContextConfig = await resolvedMediaProvider.linkCreateContext as ContextConfig;
    const linkCreateContext = ContextFactory.create(resolvedLinkCreateContextConfig) as Context;
    mediaComponent.setState({ 'linkCreateContext': linkCreateContext });

    expect(mediaComponent.find(Card).length).to.equal(1);
  });

  it('should use stateManager from Plugin state in Editor mode', async () => {
    const mediaProvider: Promise<MediaProvider> = Promise.resolve({
      viewContext: Promise.resolve({})
    });
    let subscribeCalled = false;

    // tslint:disable-next-line
    MediaComponent.prototype.getStateManagerFromEditorPlugin = () => {
      return {
        getState: () => undefined,
        updateState: () => { },
        subscribe: () => {
          subscribeCalled = true;
        },
        unsubscribe: () => { }
      } as MediaStateManager;
    };

    shallow(
      <MediaComponent
        id={link.attrs.id}
        type={link.attrs.type as MediaType}
        collection={link.attrs.collection}
        mediaProvider={mediaProvider}
      />
    );

    const resolvedMediaProvider = await mediaProvider;
    await resolvedMediaProvider.viewContext;

    expect(subscribeCalled).to.equal(true);
  });
});
