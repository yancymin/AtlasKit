import * as chai from 'chai';
import * as sinon from 'sinon';

import {MediaFileService} from '../../src/services/fileService';
import {JwtTokenProvider, MediaItem} from '../../src';
import {LRUCache} from 'lru-fast';
import {FileDetails} from '../../src/item';

const serviceHost = 'some-host';
const token = 'some-token';

const fileId = 'some-file-id';
const unprocessedFileId = 'some-unprocessed-file-id';
const clientId = 'some-client-id';
const collection = 'some-collection';
const authParams = `token=${token}&client=${clientId}`;
const defaultFileDetails = {
  id: 'some-file-id',
  mediaType: 'image',
  mimeType: 'some-mime-type',
  name: 'some-name',
  processingStatus: 'succeeded',
  size: 12345,
  artifacts: {
    'document.pdf': {href: `/file/${fileId}/artifact/document.pdf`},
    'presentation.ppt': {href: `/file/${fileId}/artifact/presentation.ppt`}
  }
};

const expect = chai.expect;
const assert = chai.assert;

describe('MediaFileService', () => {
  let tokenProvider: JwtTokenProvider;
  let fileService: MediaFileService;

  let xhr: any;
  let requests: Array<any>;

  const setupFakeXhr = () => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];

    xhr.onCreate = function (xhr: any) {
      requests.push(xhr);
    };
  };

  const respondFakeXhr = (fileDetails?: FileDetails) => {
    setTimeout(() => {
      const mockedResponse = {
        data: fileDetails || defaultFileDetails
      };
      if (requests[0]) {
        requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(mockedResponse));
      }
    });
  };

  beforeEach(() => {
    setupFakeXhr();
    tokenProvider = sinon.stub().returns(Promise.resolve(token));
    const cache = new LRUCache<string, MediaItem>(0);
    fileService = new MediaFileService({ serviceHost, tokenProvider }, cache);
  });

  afterEach(function () {
    xhr.restore();
  });

  it('should resolve file item from collection given or not', () => {
    const response = fileService.getFileItem(fileId, clientId, collection)
      .then(fileItem => {
        expect(fileItem.type).to.equal('file');
        expect(fileItem.details).to.deep.equal(defaultFileDetails);
      })
      .then(() => {
        // Validate call to token provider
        expect((tokenProvider as any).calledWith(collection));
      })
      .then(() => {
        expect(requests[0].url).to.equal(`some-host/file/some-file-id?collection=some-collection&${authParams}`);
      });

    respondFakeXhr();

    return response;
  });

  it('should resolve file item from collection given', () => {
    const response = fileService.getFileItem(fileId, clientId)
      .then(fileItem => {
        expect(fileItem.type).to.equal('file');
        expect(fileItem.details).to.deep.equal(defaultFileDetails);
      })
      .then(() => {
        // Validate call to token provider
        expect((tokenProvider as any).calledWith(undefined));
      })
      .then(() => {
        expect(requests[0].url).to.equal(`some-host/file/some-file-id?${authParams}`);
      });

    respondFakeXhr();

    return response;
  });

  it('should reject server responded with 500', () => {
    const response = fileService.getFileItem('some-dodgy-file-id', clientId, collection)
      .then(
        () => assert.fail('The function getFileItem should fail'),
        error => expect(error).to.exist
      );

    setTimeout(() => { requests[0].respond(500, { }, ''); });
    return response;
  });

  describe('cache', () => {
    const shouldReturnFileFromService = (id: string, cache: LRUCache<string, MediaItem>, fileDetails?: FileDetails) => {
      tokenProvider = sinon.stub().returns(Promise.resolve(token));
      fileService = new MediaFileService({ serviceHost, tokenProvider }, cache);
      const response = fileService.getFileItem(id, clientId, collection).then(() => {
        assert((tokenProvider as any).calledOnce);
      });

      respondFakeXhr(fileDetails);

      return response;
    };

    const shouldReturnFileFromCache = (id: string, cache: LRUCache<string, MediaItem>) => {
      tokenProvider = sinon.stub().returns(Promise.resolve(token));
      fileService = new MediaFileService({ serviceHost, tokenProvider }, cache);
      return fileService.getFileItem(id, clientId, collection).then(() => {
       assert((tokenProvider as any).notCalled);
      });
    };

    it('should cache processed files', () => {
      const cache = new LRUCache<string, MediaItem>(1);
      return shouldReturnFileFromService(fileId, cache).then(() => shouldReturnFileFromCache(fileId, cache));
    });

    it('should not cache processed files if caching is disabled', () => {
      const cache = new LRUCache<string, MediaItem>(0);
      return shouldReturnFileFromService(fileId, cache).then(() => {
        xhr.restore();
        setupFakeXhr();
        shouldReturnFileFromService(fileId, cache);
      });
    });

    it('should not cache unprocessed files', () => {
      const unprocessedFileDetails: FileDetails = {
        id: 'some-file-id',
        mediaType: 'image',
        mimeType: 'some-mime-type',
        name: 'some-name',
        processingStatus: 'pending',
        size: 12345,
        artifacts: {
          'document.pdf': { href: `/file/${fileId}/artifact/document.pdf` },
          'presentation.ppt': { href: `/file/${fileId}/artifact/presentation.ppt` }
        }
      };
      const cache = new LRUCache<string, MediaItem>(1);
      return shouldReturnFileFromService(unprocessedFileId, cache, unprocessedFileDetails).then(() => {
        xhr.restore();
        setupFakeXhr();
        shouldReturnFileFromService(unprocessedFileId, cache, unprocessedFileDetails);
      });
    });
  });
});
