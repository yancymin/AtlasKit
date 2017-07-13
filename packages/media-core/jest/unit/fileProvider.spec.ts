import * as chai from 'chai';
import * as sinon from 'sinon';
import {FileProvider} from '../../src/providers/fileProvider';

const expect = chai.expect;
const assert = chai.assert;

const fileId = 'some-file-id';
const clientId = 'some-client-id';
const collection = 'some-collection';
const succeededFileItem = {
  type: 'file',
  details: {
    id: fileId,
    processingStatus: 'succeeded'
  }
};
const pendingFileItem = {
  type: 'file',
  details: {
    id: fileId,
    processingStatus: 'pending'
  }
};
const mockObserver = () => {
  return {
    next: sinon.spy(),
    complete: sinon.spy(),
    error: sinon.spy()
  };
};

describe('FileProvider', () => {
  it('should complete given file that succeeds immediately', () => {
    const fileService = Mocks.fileServiceSucceeded();
    const fileProvider = FileProvider.fromFileService(fileService, fileId, clientId, collection).observable();
    const observer = mockObserver();

    fileProvider.subscribe(observer);

    return new Promise((resolve) => {
      fileProvider.subscribe({
        complete: () => {
          assert(observer.next.calledWith(succeededFileItem));
          assert(observer.complete.calledWith(undefined));
          assert(observer.error.notCalled);
          resolve();
        }
      });
    });
  });

  it('should next partial items given file that succeeds in future', () => {
    const fileService = Mocks.fileServicePendingBeforeSucceeded();
    const fileProvider = FileProvider.fromFileService(fileService, fileId, clientId, collection).observable();
    const observer = mockObserver();

    fileProvider.subscribe(observer);

    return new Promise((resolve) => {
      fileProvider.subscribe({
        complete: () => {
          expect(observer.next.firstCall.args[0]).to.equal(pendingFileItem);
          expect(observer.next.secondCall.args[0]).to.equal(succeededFileItem);
          assert(observer.complete.calledWith(undefined));
          assert(observer.error.notCalled);
          resolve();
        }
      });
    });
  });

  it('should error given file service rejects', () => {
    const fileService = Mocks.fileServiceError();
    const fileProvider = FileProvider.fromFileService(fileService, fileId, clientId, collection).observable();
    const observer = mockObserver();

    fileProvider.subscribe(observer);

    return new Promise((resolve) => {
      fileProvider.subscribe({
        error: (error) => {
          expect(observer.next.notCalled);
          expect(observer.complete.notCalled);
          expect(observer.error.calledWith(error));
          resolve();
        }
      });
    });
  });

  it('should call the service only once for multiple observers', (done) => {
    const fileService = Mocks.fileServiceSucceeded();
    const fileProvider = FileProvider.fromFileService(fileService, fileId, clientId, collection).observable();

    const observer = mockObserver();
    const observer2 = mockObserver();

    fileProvider.subscribe(observer);
    fileProvider.subscribe(observer2);

    fileProvider.subscribe({
      complete: () => {

        // observer 1
        assert(observer.next.calledWith(succeededFileItem));
        assert(observer.complete.calledWith(undefined));
        assert(observer.error.notCalled);

        // observer 2
        assert(observer2.next.calledWith(succeededFileItem));
        assert(observer2.complete.calledWith(undefined));
        assert(observer2.error.notCalled);

        expect(fileService.getFileItem.callCount).to.equal(1);

        done();
      }
    });
  });

  it('should replay last file item after completion', (done) => {
    const fileService = Mocks.fileServiceSucceeded();
    const fileProvider = FileProvider.fromFileService(fileService, fileId, clientId, collection).observable();

    const observer = mockObserver();

    fileProvider.subscribe(observer);

    fileProvider.subscribe({
      complete: () => {
        assert(observer.next.calledWith(succeededFileItem));
        assert(observer.complete.calledWith(undefined));
        assert(observer.error.notCalled);

        fileProvider.subscribe({
          next: fileItem => {
            expect(fileItem).to.equal(succeededFileItem);
            done();
          },
          error: error => assert.fail(error)
        });
      }
    });
  });

  it('should replay complete event after completion', (done) => {
    const fileService = Mocks.fileServiceSucceeded();
    const fileProvider = FileProvider.fromFileService(fileService, fileId, clientId, collection).observable();

    const observer = mockObserver();

    fileProvider.subscribe(observer);

    fileProvider.subscribe({
      complete: () => {
        assert(observer.next.calledWith(succeededFileItem));
        assert(observer.complete.calledWith(undefined));
        assert(observer.error.notCalled);

        fileProvider.subscribe({
          complete: () => done(),
          error: error => assert.fail(error)
        });
      }
    });
  });
});

class Mocks {
  public static fileServiceSucceeded() {
    const stub = sinon.stub();
    stub.onCall(0).returns(Promise.resolve(succeededFileItem));
    return {
      getFileItem: stub
    };
  }

  public static fileServicePendingBeforeSucceeded() {
    const stub = sinon.stub();
    stub.onCall(0).returns(Promise.resolve(pendingFileItem));
    stub.onCall(1).returns(Promise.resolve(succeededFileItem));

    return {
      getFileItem: stub
    };
  }

  public static fileServiceError() {
    return {
      getFileItem: sinon.stub()
        .returns(Promise.reject(new Error('mock-error')))
    };
  }
}
