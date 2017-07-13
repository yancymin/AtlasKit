import * as sinon from 'sinon';
import * as events from 'events';
import { Subject } from 'rxjs/Subject';
import {
  ContextConfig,
  MediaCollection, MediaCollectionProvider
} from '@atlaskit/media-core';

export class Stubs {
  static mediaViewer() {
    const noop = () => { };
    const emitter = new events.EventEmitter();
    const mediaViewer = {
      on: noop,
      off: noop,
      trigger: event => emitter.emit(event),
      isOpen: sinon.stub(),
      open: sinon.stub(),
      setFiles: sinon.stub(),
      getCurrent: sinon.stub(),
      isShowingLastFile: sinon.stub()
    };

    sinon.stub(mediaViewer, 'on', (event, callback) => emitter.on(event, callback));
    sinon.stub(mediaViewer, 'off', (event, callback) => emitter.removeListener(event, callback));

    return mediaViewer;
  }

  static mediaViewerConstructor() {
    return sinon.stub().returns(Stubs.mediaViewer());
  }

  static mediaCollectionProvider(subject?: Subject<MediaCollection>) {
    return {
      observable: sinon.stub().returns(subject || new Subject<MediaCollection>()),
      refresh: sinon.spy(),
      loadNextPage: sinon.stub(),
      loadNextPageUntil: sinon.stub()
    };
  }

  static context(config: ContextConfig, collectionProvider?: MediaCollectionProvider) {
    return {
      config,
      getMediaCollectionProvider: sinon.stub().returns(collectionProvider || Stubs.mediaCollectionProvider())
    };
  }
}
