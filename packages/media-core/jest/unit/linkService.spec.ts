import * as chai from 'chai';
import * as sinon from 'sinon';

import {MediaLinkService} from '../../src/services/linkService';
import {JwtTokenProvider} from '../../src';
import {UrlPreview} from '../../src/item';

const serviceHost = 'some-host';
const token = 'some-token';

const linkId = 'some-link-id';
const clientId = 'some-client-id';
const collection = 'some-collection';
const linkUrl = 'some-url';
const linkMetadata = <UrlPreview> {
  type: 'some-type',
  url: 'some-url',
  title: 'some-title',
  description: 'some-description',
  site: 'some-site',
  author: {url: 'some-author-url', name: 'some-author-name'},
  date: 12345678,
  resources: {
    icon: {url: 'some-icon-url'},
    thumbnail: {url: 'some-thumbnail-url'}
  }
};
const authParams = `token=${token}&client=${clientId}`;
const expect = chai.expect;
const assert = chai.assert;

describe('MediaLinkService', () => {
  let tokenProvider: JwtTokenProvider;
  let linkService: MediaLinkService;

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
    linkService = new MediaLinkService({serviceHost, tokenProvider});
  });

  afterEach(function () {
    xhr.restore();
  });

  it('should resolve link item', () => {
    const linkServerFakedResponse = {
      id: 'some-id',
      url: 'some-url',
      createdAt: 1488017465703,
      metadata: {
        title: 'some-title',
        description: 'some-description',
        site: 'some-site',
        author: {
          name: 'some-author'
        },
        date: 123456,
        resources: {
          thumbnail: { url: 'some-file-url', type: 'image/jpeg', width: 300, height: 200, length: 5012 }
        }
      }
    };

    const response = linkService.getLinkItem(linkId, clientId, collection)
      .then(linkItem => {
        expect(linkItem.type).to.equal('link');
        expect(linkItem.details.id).to.equal('some-id');
        expect(linkItem.details.url).to.equal('some-url');
        expect(linkItem.details.title).to.equal('some-title');
        expect(linkItem.details.description).to.equal('some-description');
        expect(linkItem.details.site).to.equal('some-site');
        expect(linkItem.details.author).to.deep.equal({name: 'some-author'});
        expect(linkItem.details.date).to.equal(123456);
      })
      .then(() => {
        // Validate call to token provider
        assert((tokenProvider as any).calledWith(collection));
      })
      .then(() => {
        expect(requests[0].url).to.equal(`some-host/link/some-link-id?collection=some-collection&${authParams}`);
      });
    setTimeout(() => {
      const mockedResponse = {
        data: linkServerFakedResponse
      };
      requests[0].respond(200, { 'Content-Type': 'application/json' },
          JSON.stringify(mockedResponse));
    });
    return response;
  });

  it('should reject get link when server responded with 500', () => {
    const response = linkService.getLinkItem('some-dodgy-link-id', clientId, collection)
      .then(
        () => assert.fail('The function getLinkItem should fail'),
        error => expect(error).to.exist
      );

    setTimeout(() => { requests[0].respond(500, { }, ''); });
    return response;
  });

  it('should add link', () => {
    const response = linkService.addLinkItem(linkUrl, clientId, collection, linkMetadata)
      .then(id => {
        expect(id).to.equal(linkId);
      })
      .then(() => {
        // Validate call to token provider
        assert((tokenProvider as any).calledWith(collection));
      })
      .then(() => {
        const headers = requests[0].requestHeaders;
        expect(headers['X-Client-Id']).to.equal(clientId);
        expect(headers['Authorization']).to.equal(`Bearer ${token}`);
        expect(requests[0].url).to.equal('some-host/link?collection=some-collection');
      });

    setTimeout(() => {
      const mockedResponse = {
        data: {id: linkId}
      };
      requests[0].respond(200, { 'Content-Type': 'application/json' },
        JSON.stringify(mockedResponse));
    });

    return response;
  });

  it('should reject add link when server responded with 500', () => {
    const response = linkService.addLinkItem(linkUrl, clientId, collection, linkMetadata)
      .then(
        () => assert.fail('The function addLinkItem should fail'),
        error => expect(error).to.exist
      );

    setTimeout(() => { requests[0].respond(500, { }, ''); });

    return response;
  });
});
