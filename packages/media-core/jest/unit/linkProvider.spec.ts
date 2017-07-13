import * as chai from 'chai';
import * as sinon from 'sinon';

import {LinkItem} from '../../src';
import {LinkProvider} from '../../src/providers/linkProvider';

const assert = chai.assert;

const linkId = 'some-link-id';
const clientId = 'some-client-id';
const collection = 'some-collection';
const someLinkItem = <LinkItem> {
  type: 'link',
  details: {
    id: linkId,
    url: 'some-url'
  }
};
const mockObserver = () => {
  return {
    next: sinon.spy(),
    complete: sinon.spy(),
    error: sinon.spy()
  };
};

describe('LinkProvider', () => {
  it('should complete given link service resolves a link item', () => {
    const linkService = Mocks.linkServiceResolves();
    const linkProvider = LinkProvider.fromLinkService(linkService, linkId, clientId, collection).observable();
    const observer = mockObserver();

    linkProvider.subscribe(observer);

    return new Promise((resolve) => {
      linkProvider.subscribe({
        complete: () => {
          assert(observer.next.calledWith(someLinkItem));
          assert(observer.complete.calledWith(undefined));
          assert(observer.error.notCalled);
          resolve();
        }
      });
    });
  });

  it('should error given link service rejects with an error', () => {
    const linkService = Mocks.linkServiceError();
    const linkProvider = LinkProvider.fromLinkService(linkService, linkId, clientId, collection).observable();
    const observer = mockObserver();

    linkProvider.subscribe(observer);

    return new Promise((resolve) => {
      linkProvider.subscribe({
        error: (error) => {
          assert(observer.next.notCalled);
          assert(observer.complete.notCalled);
          assert(observer.error.calledWith(error));
          resolve();
        }
      });
    });
  });
});

class Mocks {
  public static linkServiceResolves() {
    const getLinkStub = sinon.stub();
    getLinkStub.onCall(0).returns(Promise.resolve(someLinkItem));

    const addLinkStub = sinon.stub();
    addLinkStub.onCall(0).returns(Promise.resolve(linkId));

    return {
      getLinkItem: getLinkStub,
      addLinkItem: addLinkStub
    };
  }

  public static linkServiceError() {
    const stub = sinon.stub().returns(Promise.reject(new Error('mock-error')));

    return {
      getLinkItem: stub,
      addLinkItem: stub
    };
  }
}
