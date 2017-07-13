// TODO: deal with unused expression error while calling "chai calledOnce"
/* tslint:disable */ //:no-unused-expressions
import * as React from 'react';
import * as sinon from 'sinon';
import * as chai from 'chai';
import { expect } from 'chai';
import * as sinonChai from 'sinon-chai';
import { shallow } from 'enzyme';
import {
  MediaFileListViewer
} from '../../../src/components/media-file-list-viewer';
import { Stubs } from '../_stubs';

chai.use(sinonChai);

describe('<MediaFileListViewer />', () => {
  const token = 'some-token';
  const tokenProvider = sinon.stub().returns(Promise.resolve(token));
  const serviceHost = 'some-service-host';
  const contextConfig = {
    clientId: 'some-client',
    serviceHost,
    tokenProvider
  };
  const collectionName = 'some-collection';
  const basePath = 'some-base-path';

  it('should construct a media viewer instance with default config', () => {
    const mediaViewerConstructor = Stubs.mediaViewerConstructor();

    shallow(
      <MediaFileListViewer
        fileId='xxx-xxx'
        fileIds={['xxx-xxxx']}
        context={Stubs.context(contextConfig) as any}
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
      <MediaFileListViewer
        fileId='xxx-xxx'
        fileIds={['xxx-xxxx']}
        context={Stubs.context(contextConfig) as any}
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
});
