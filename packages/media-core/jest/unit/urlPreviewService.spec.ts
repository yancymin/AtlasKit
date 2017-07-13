import * as chai from 'chai';
import * as sinon from 'sinon';

import {MediaUrlPreviewService} from '../../src/services/urlPreviewService';
import {JwtTokenProvider} from '../../src';

const serviceHost = 'some-host';
const token = 'some-token';
const clientId = 'some-client-id';

const expect = chai.expect;
const assert = chai.assert;

describe('UrlPreviewService', () => {
  let tokenProvider: JwtTokenProvider;
  let urlPreviewService: MediaUrlPreviewService;

  let xhr: any;
  let requests: Array<any>;

  const setupFakeXhr = () => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];

    xhr.onCreate = function (xhr: any) {
      requests.push(xhr);
    };
  };

  beforeEach(() => {
    setupFakeXhr();
    tokenProvider = sinon.stub().returns(Promise.resolve(token));
    urlPreviewService = new MediaUrlPreviewService({serviceHost, tokenProvider});
  });

  afterEach(function () {
    xhr.restore();
  });

  it('should resolve a preview', () => {
    const linkPreviewResponse = {
      url: 'some-url',
      type: 'link',
      title: 'some-title',
      description: 'some-description',
      site: 'some-site',
      author: {
        name: 'some-author'
      },
      date: 123456,
      resources: {
        thumbnail: { url: 'some-file-url', type: 'image/jpeg', width: 300, height: 200, length: 5012 },
      }
    };

    const response = urlPreviewService.getUrlPreview('http://atlassian.com', clientId)
      .then(preview => {
        expect(preview).to.deep.equal(linkPreviewResponse);
      })
      .then(() => {
        // Validate call to token provider with no parameters
        assert((tokenProvider as any).calledOnce);
      })
      .then(() => {
        const headers = requests[0].requestHeaders;
        expect(headers['X-Client-Id']).to.equal(clientId);
        expect(headers['Authorization']).to.equal(`Bearer ${token}`);
        expect(requests[0].url).to.equal('some-host/link/preview?url=http:%2F%2Fatlassian.com');
      });

    setTimeout(() => {
      const mockedResponse = {
        data: {
          preview: linkPreviewResponse
        }
      };
      requests[0].respond(200, { 'Content-Type': 'application/json' },
          JSON.stringify(mockedResponse));
    });

    return response;
  });

  it('should resolve an error when iFramely fails to process provided link', () => {
    const expectedError = '417: Some cray cray error occured';

    const response = urlPreviewService.getUrlPreview('http://atlassian.com', clientId)
      .catch((actualError) => {
        expect(actualError.message).to.deep.equal(expectedError);
      })
      .then(() => {
        // Validate call to token provider with no parameters
        assert((tokenProvider as any).calledOnce);
      })
      .then(() => {
        const headers = requests[0].requestHeaders;
        expect(headers['X-Client-Id']).to.equal(clientId);
        expect(headers['Authorization']).to.equal(`Bearer ${token}`);
        expect(requests[0].url).to.equal('some-host/link/preview?url=http:%2F%2Fatlassian.com');
      });

    setTimeout(() => {
      const mockedResponse = {
        data: {
          previewError: {
            code: '417',
            name: 'Some cray cray error occured'
          }
        }
      };
      requests[0].respond(200, { 'Content-Type': 'application/json' },
          JSON.stringify(mockedResponse));
    });

    return response;
  });

});
