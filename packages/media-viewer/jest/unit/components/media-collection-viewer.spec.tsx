// TODO: deal with unused expression error while calling "chai calledOnce"
/* tslint:disable */ //:no-unused-expressions
import * as React from 'react';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import * as chai from 'chai';
import { expect } from 'chai';
import * as sinonChai from 'sinon-chai';
import { mount, shallow } from 'enzyme';
import { Subject } from 'rxjs/Subject';
import { MediaCollection, MediaCollectionFileItem } from '@atlaskit/media-core';
import {
  MediaCollectionViewer, MediaCollectionViewerProps, MediaCollectionViewerState
} from '../../../src/components/media-collection-viewer';
import { MediaFileAttributesFactory } from '../../../src/domain/media-file-attributes';
import { Stubs } from '../_stubs';

chai.use(sinonChai);

describe('<MediaCollectionViewer />', () => {
  const token = 'some-token';
  const tokenProvider = sinon.stub().returns(Promise.resolve(token));
  const serviceHost = 'some-service-host';
  const contextConfig = {
    clientId: 'some-client',
    serviceHost,
    tokenProvider
  };
  const occurrenceKey = 'some-occurence-key';
  const collectionName = 'some-collection';
  const basePath = 'some-base-path';
  const file = {
    type: 'file',
    details: {
      id: 'file-1',
      occurrenceKey: 'occurence-1'
    }
  } as MediaCollectionFileItem;
  const collection = {
    id: collectionName,
    items: [file]
  } as MediaCollection;

  it('should get the correct collection provider', () => {
    const context = Stubs.context(contextConfig);
    shallow(
      <MediaCollectionViewer
        context={context as any}
        occurrenceKey={occurrenceKey}
        collectionName={collectionName}
        MediaViewer={Stubs.mediaViewerConstructor() as any}
        basePath={basePath}
      />);

    expect(context.getMediaCollectionProvider).to.have.been.calledOnce;
    expect(context.getMediaCollectionProvider).to.have.been.calledWith(collectionName, MediaCollectionViewer.defaultPageSize);
  });

  it('should get the correct collection provider given page size', () => {
    const context = Stubs.context(contextConfig);
    const pageSize = 28;

    shallow(
      <MediaCollectionViewer
        context={context as any}
        occurrenceKey={occurrenceKey}
        collectionName={collectionName}
        pageSize={pageSize}
        MediaViewer={Stubs.mediaViewerConstructor() as any}
        basePath={basePath}
      />);

    expect(context.getMediaCollectionProvider).to.have.been.calledOnce;
    expect(context.getMediaCollectionProvider).to.have.been.calledWith(collectionName, pageSize);
  });

  it('should construct a media viewer instance with default config', () => {
    const mediaViewerConstructor = Stubs.mediaViewerConstructor();

    shallow(
      <MediaCollectionViewer
        context={Stubs.context(contextConfig) as any}
        occurrenceKey={occurrenceKey}
        collectionName={collectionName}
        MediaViewer={mediaViewerConstructor as any}
        basePath={basePath}
      />);

    expect(mediaViewerConstructor).to.have.been.calledOnce;
    expect(mediaViewerConstructor).to.have.been.calledWith({
      assets: {
        basePath
      },
      fetchToken: sinon.match.func
    });
  });

  it('should construct a media viewer instance with custom config', () => {
    const mediaViewerConstructor = Stubs.mediaViewerConstructor();
    const additionalConfiguration = {
      enableMiniMode: true
    }

    shallow(
      <MediaCollectionViewer
        context={Stubs.context(contextConfig) as any}
        occurrenceKey={occurrenceKey}
        collectionName={collectionName}
        mediaViewerConfiguration={additionalConfiguration}
        MediaViewer={mediaViewerConstructor as any}
        basePath={basePath}
      />);

    expect(mediaViewerConstructor).to.have.been.calledOnce;
    expect(mediaViewerConstructor).to.have.been.calledWith({
      assets: {
        basePath
      },
      enableMiniMode: true,
      fetchToken: sinon.match.func
    });
  });

  it('should listen on fv.close given an onClose handler', () => {
    const onClose = sinon.stub();

    const wrapper = mount<MediaCollectionViewerProps, MediaCollectionViewerState>(
      <MediaCollectionViewer
        context={Stubs.context(contextConfig) as any}
        occurrenceKey={occurrenceKey}
        collectionName={collectionName}
        MediaViewer={Stubs.mediaViewerConstructor() as any}
        basePath={basePath}
        onClose={onClose}
      />);

    const { mediaViewer } = wrapper.state();

    expect(mediaViewer.on).to.have.been.calledWith('fv.close', onClose);

    wrapper.unmount();
    expect(mediaViewer.off).to.have.been.calledWith('fv.close', onClose);
  });

  it('should not listen on fv.close given no onClose handler', () => {
    const wrapper = mount<MediaCollectionViewerProps, MediaCollectionViewerState>(
      <MediaCollectionViewer
        context={Stubs.context(contextConfig) as any}
        occurrenceKey={occurrenceKey}
        collectionName={collectionName}
        MediaViewer={Stubs.mediaViewerConstructor() as any}
        basePath={basePath}
      />);

    expect(wrapper.state().mediaViewer.on).to.have.not.been.calledWith('fv.close');
  });

  it('should listen on fv.changeFile to detect if the next page needs to be loaded', () => {
    const wrapper = mount<MediaCollectionViewerProps, MediaCollectionViewerState>(
      <MediaCollectionViewer
        context={Stubs.context(contextConfig) as any}
        occurrenceKey={occurrenceKey}
        collectionName={collectionName}
        MediaViewer={Stubs.mediaViewerConstructor() as any}
        basePath={basePath}
      />);

    const { mediaViewer } = wrapper.state();

    expect(mediaViewer.on).to.have.been.calledWith('fv.changeFile');

    wrapper.unmount();
    expect(mediaViewer.off).to.have.been.calledWith('fv.changeFile');
  });

  it('should open media viewer with query, given media viewer is not open', () => {
    const subject = new Subject<MediaCollection>();
    const wrapper = mount<MediaCollectionViewerProps, MediaCollectionViewerState>(
      <MediaCollectionViewer
        context={Stubs.context(contextConfig, Stubs.mediaCollectionProvider(subject)) as any}
        occurrenceKey={occurrenceKey}
        collectionName={collectionName}
        MediaViewer={Stubs.mediaViewerConstructor() as any}
        basePath={basePath}
      />);

    const files = MediaFileAttributesFactory.fromMediaCollection(collection, serviceHost);
    const { mediaViewer } = wrapper.state();
    (mediaViewer.isOpen as SinonStub).returns(false);

    subject.next(collection);

    expect(mediaViewer.open).to.have.been.calledWith({ id: occurrenceKey });
    expect(mediaViewer.setFiles).to.have.been.calledWith(files);
  });

  it('should set files with query and not open media viewer, given media viewer is already open', () => {
    const subject = new Subject<MediaCollection>();
    const wrapper = mount<MediaCollectionViewerProps, MediaCollectionViewerState>(
      <MediaCollectionViewer
        context={Stubs.context(contextConfig, Stubs.mediaCollectionProvider(subject)) as any}
        occurrenceKey={occurrenceKey}
        collectionName={collectionName}
        MediaViewer={Stubs.mediaViewerConstructor() as any}
        basePath={basePath}
      />);

    const files = MediaFileAttributesFactory.fromMediaCollection(collection, serviceHost);
    const currentFile = files[0];
    const { mediaViewer } = wrapper.state();

    (mediaViewer.isOpen as SinonStub).returns(true);
    (mediaViewer.getCurrent as SinonStub).returns(currentFile);

    subject.next(collection);

    expect(mediaViewer.open).to.have.been.not.called;
    expect(mediaViewer.setFiles).to.have.been.calledWith(files, { id: currentFile.id });
  });

  it('should load next page, given media viewer is showing last page on navigation', () => {
    const provider = Stubs.mediaCollectionProvider(undefined);
    const wrapper = mount<MediaCollectionViewerProps, MediaCollectionViewerState>(
      <MediaCollectionViewer
        context={Stubs.context(contextConfig, provider) as any}
        occurrenceKey={occurrenceKey}
        collectionName={collectionName}
        MediaViewer={Stubs.mediaViewerConstructor() as any}
        basePath={basePath}
      />);

    const { mediaViewer } = wrapper.state();

    (mediaViewer.isShowingLastFile as SinonStub).returns(true);
    (mediaViewer as any).trigger('fv.changeFile');

    expect(provider.loadNextPage).to.have.been.called;
  });

  it('should not load next page, given media viewer not is showing last page on navigation', () => {
    const provider = Stubs.mediaCollectionProvider(undefined);
    const wrapper = mount<MediaCollectionViewerProps, MediaCollectionViewerState>(
      <MediaCollectionViewer
        context={Stubs.context(contextConfig, provider) as any}
        occurrenceKey={occurrenceKey}
        collectionName={collectionName}
        MediaViewer={Stubs.mediaViewerConstructor() as any}
        basePath={basePath}
      />);

    const { mediaViewer } = wrapper.state();

    (mediaViewer.isShowingLastFile as SinonStub).returns(false);
    (mediaViewer as any).trigger('fv.changeFile');

    expect(provider.loadNextPage).to.have.not.been.called;
  });
});
