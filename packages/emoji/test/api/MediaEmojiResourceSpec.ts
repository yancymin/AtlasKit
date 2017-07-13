import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';
import * as fetchMock from 'fetch-mock';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { waitUntil } from '@atlaskit/util-common-test';

import MediaEmojiResource, { EmojiProgress, EmojiProgessCallback, EmojiUploadResponse, mediaProportionOfProgress, TokenManager } from '../../src/api/MediaEmojiResource';
import { EmojiDescription, EmojiServiceResponse, EmojiUpload, ImageRepresentation, MediaApiToken, MediaApiRepresentation } from '../../src/types';
import { MediaUploadStatusUpdate, MediaUploadEnd, MediaUploadError } from '../../src/media-types';

import {
    blobResponse,
    defaultMediaApiToken,
    expiresAt,
    evilburnsEmoji,
    fetchSiteEmojiUrl,
    mediaEmoji,
    missingMediaEmoji,
    missingMediaEmojiId,
    missingMediaServiceEmoji,
    siteServiceConfig,
    siteUrl
} from '../TestData';

const createMediaEmojiResource = (mediaApiToken?: MediaApiToken) => {
  mediaApiToken = mediaApiToken || defaultMediaApiToken();
  return new MediaEmojiResource(siteServiceConfig, mediaApiToken);
};

const getMediaPath = (emoji: EmojiDescription): string => (
  (emoji.representation as MediaApiRepresentation).mediaPath
);

const tokenReadUrl = `${siteUrl}/token/read`;
const tokenUploadUrl = `${siteUrl}/token/upload`;

interface MediaCallback {
  (result: any): void;
}

interface MediaUpload {
  dataURL: string;
  filename: string;
}

/**
 * Basic mock implementation of a MediaPicker
 */
class MockMediaPicker {
  private eventHandlers: Map<string, MediaCallback> = new Map();
  private uploads: MediaUpload[] = [];

  on(event: string, callback: (result: any) => void) {
    this.eventHandlers.set(event, callback);
    return this;
  }

  event(event, result: any) {
    const callback = this.eventHandlers.get(event);
    if (callback) {
      callback(result);
    }
  }

  upload(dataURL: string, filename: string) {
    this.uploads.push({ dataURL, filename });
  }

  getUploads() {
    return this.uploads;
  }
}

class TestMediaEmojiResource extends MediaEmojiResource {
  private mockMediaPicker?: MockMediaPicker;

  constructor(tokenManager: TokenManager, mockMediaPicker?: MockMediaPicker) {
    super(siteServiceConfig, defaultMediaApiToken());
    this.tokenManager = tokenManager;
    this.mockMediaPicker = mockMediaPicker;
  }

  protected createMediaPicker(type, mpConfig) {
    return this.mockMediaPicker;
  }
}

describe('MediaEmojiResource', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  describe('#getMediaEmojiAsImageEmoji', () => {
    it('not media emoji', () => {
      const mediaEmojiResource = createMediaEmojiResource();
      return mediaEmojiResource.getMediaEmojiAsImageEmoji(evilburnsEmoji).then(emoji => {
        expect(emoji).to.deep.equal(evilburnsEmoji);
      });
    });

    it('media emoji', () => {
      const mediaEmojiResource = createMediaEmojiResource();
      const blob = new Blob();
      fetchMock.mock({
        matcher: `begin:${getMediaPath(mediaEmoji)}`,
        response: blobResponse(blob),
        name: 'media-emoji'
      });
      return mediaEmojiResource.getMediaEmojiAsImageEmoji(mediaEmoji).then(emoji => {
        const { width, height } = mediaEmoji.representation as MediaApiRepresentation;
        const { imagePath } = emoji.representation as ImageRepresentation;

        const expectedEmoji = {
          ...mediaEmoji,
          representation: {
            width,
            height,
            imagePath, // check this separately
          }
        };
        expect(imagePath.indexOf('data:')).to.equal(0);
        expect(emoji).to.deep.equal(expectedEmoji);

        // Confirm headers
        const token = defaultMediaApiToken();
        const calls = fetchMock.calls('media-emoji');
        expect(calls.length, 'One call').to.equal(1);
        const headers = calls[0][0].headers;
        expect(headers.get('Authorization'), 'Authorization header').to.equal(`Bearer ${token.jwt}`);
        expect(headers.get('X-Client-Id'), 'X-Client-Id header').to.equal(token.clientId);
        expect(headers.get('Accept').indexOf('image/'), 'Accept header to start with image/').to.equal(0);
      });
    });

    it('media emoji expired token', () => {
      const mediaApiToken = {
        ...defaultMediaApiToken(),
        expiresAt: Math.floor(Date.now() / 1000) - 60, // seconds since Epoch UTC
      };

      const mediaEmojiResource = createMediaEmojiResource(mediaApiToken);
      const blob = new Blob();
      fetchMock.mock({
        matcher: `begin:${getMediaPath(mediaEmoji)}`,
        response: blobResponse(blob),
      }).mock({
        matcher: tokenReadUrl,
        response: defaultMediaApiToken(),
        name: 'token-refresh',
      });
      return mediaEmojiResource.getMediaEmojiAsImageEmoji(mediaEmoji).then(emoji => {
        const { width, height } = mediaEmoji.representation as MediaApiRepresentation;
        const { imagePath } = emoji.representation as ImageRepresentation;
        const expectedEmoji = {
          ...mediaEmoji,
          representation: {
            width,
            height,
            imagePath, // check this separately
          }
        };

        expect(fetchMock.called('token-refresh'), 'token refresh called').to.equal(true);
        expect(imagePath.indexOf('data:')).to.equal(0);
        expect(emoji).to.deep.equal(expectedEmoji);
      });
    });

    it('media emoji bad token', () => {
      const mediaEmojiResource = createMediaEmojiResource();
      const blob = new Blob();
      fetchMock.mock({
        matcher: `begin:${getMediaPath(mediaEmoji)}`,
        response: 403,
        times: 1,
      }).mock({
        matcher: `begin:${getMediaPath(mediaEmoji)}`,
        response: blobResponse(blob),
      }).mock({
        matcher: tokenReadUrl,
        response: defaultMediaApiToken(),
        name: 'token-refresh',
      });
      return mediaEmojiResource.getMediaEmojiAsImageEmoji(mediaEmoji).then(emoji => {
        const { width, height } = mediaEmoji.representation as MediaApiRepresentation;
        const { imagePath } = emoji.representation as ImageRepresentation;
        const expectedEmoji = {
          ...mediaEmoji,
          representation: {
            width,
            height,
            imagePath, // check this separately
          }
        };

        expect(fetchMock.called('token-refresh'), 'token refresh called').to.equal(true);
        expect(imagePath && imagePath.indexOf('data:')).to.equal(0);
        expect(emoji).to.deep.equal(expectedEmoji);
      });
    });

    it('media fails to load', () => {
      const mediaEmojiResource = createMediaEmojiResource();
      fetchMock.mock({
        matcher: `begin:${getMediaPath(mediaEmoji)}`,
        response: 404,
      });
      return mediaEmojiResource.getMediaEmojiAsImageEmoji(mediaEmoji).then(emoji => {
        // returns original
        expect(emoji).to.deep.equal(mediaEmoji);
      });
    });

    it('media fails to load (rejection)', () => {
      const mediaEmojiResource = createMediaEmojiResource();
      fetchMock.mock({
        matcher: `begin:${getMediaPath(mediaEmoji)}`,
        response: {
          throws: new Error(),
        },
      });
      return mediaEmojiResource.getMediaEmojiAsImageEmoji(mediaEmoji).then(emoji => {
        // returns original
        expect(emoji).to.deep.equal(mediaEmoji);
      });
    });
  });

  describe('#uploadEmoji', () => {

    const upload: EmojiUpload = {
      name: 'Cheese',
      shortName: ':cheese:',
      filename: 'cheese.png',
      dataURL: 'data:cheese',
      width: 20,
      height: 30,
    };

    const mediaUploadEnd: MediaUploadEnd = {
      file: {
        id: 'abc-123',
        name: upload.name,
        size: 12345,
        creationDate: Date.now(),
        type: 'blah',
      },
      public: {
        id: 'abc-123',
        processingStatus: 'whatever',
      }
    };

    const serviceResponse: EmojiUploadResponse = {
      emojis: [
        {
          id: 'emoji-id-234',
          shortName: upload.shortName,
          name: upload.name,
          fallback: upload.shortName,
          order: -1,
          type: 'SITE',
          category: 'CUSTOM',
          representation: {
            imagePath: 'http://media/123.png',
            width: 20,
            height: 30,
          }
        }
      ]
    };

    it('successful upload', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const mockMediaPicker = new MockMediaPicker();
      const mediaEmojiResource = new TestMediaEmojiResource(tokenManagerStub, mockMediaPicker);

      fetchMock.post({
        matcher: siteServiceConfig.url,
        response: {
          body: serviceResponse,
        },
        name: 'emoji-upload'
      });

      tokenManagerStub.getToken.returns(Promise.resolve(defaultMediaApiToken()));

      const uploadPromise = mediaEmojiResource.uploadEmoji(upload).then(emoji => {
        expect(emoji).to.deep.equal({
          ...serviceResponse.emojis[0],
          representation: {
            mediaPath: 'http://media/123.png',
            width: 20,
            height: 30,
          }
        });

        const mediaUploads = mockMediaPicker.getUploads();
        expect(mediaUploads.length, '1 media upload').to.equal(1);
        expect(mediaUploads[0], 'upload params').to.deep.equal({
          dataURL: upload.dataURL,
          filename: upload.filename,
        });

        const uploadEmojiCalls = fetchMock.calls('emoji-upload');
        expect(uploadEmojiCalls.length, 'Emoji service upload emoji called').to.equal(1);
        const uploadRequest = uploadEmojiCalls[0][0];
        return uploadRequest.json().then(json => {
          const { shortName, name, width, height } = upload;
          expect(json, 'Emoji service upload request').to.deep.equal({
            shortName,
            name,
            width,
            height,
            fileId: mediaUploadEnd.file.id,
          });
        });
      });

      // simulate MediaAPI done - after getToken resolved
      setTimeout(() => {
        mockMediaPicker.event('upload-end', mediaUploadEnd);
      }, 0);

      return uploadPromise;
    });

    it('upload error to media', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const mockMediaPicker = new MockMediaPicker();
      const mediaEmojiResource = new TestMediaEmojiResource(tokenManagerStub, mockMediaPicker);

      fetchMock.post({
        matcher: siteServiceConfig.url,
        response: {
          body: serviceResponse,
        },
        name: 'emoji-upload'
      });

      tokenManagerStub.getToken.returns(Promise.resolve(defaultMediaApiToken()));

      const uploadPromise = mediaEmojiResource.uploadEmoji(upload).catch(error => {
        const mediaUploads = mockMediaPicker.getUploads();
        expect(mediaUploads.length, '1 media upload').to.equal(1);
        expect(mediaUploads[0], 'upload params').to.deep.equal({
          dataURL: upload.dataURL,
          filename: upload.filename,
        });

        const uploadEmojiCalls = fetchMock.calls('emoji-upload');
        expect(uploadEmojiCalls.length, 'Emoji service upload emoji called').to.equal(0);
        expect(error, 'Error message').to.equal('oh crap');
      });

      // simulate MediaAPI done - after getToken resolved
      setTimeout(() => {
        const error: MediaUploadError = {
          file: mediaUploadEnd.file,
          error: 'oh crap',
        };
        mockMediaPicker.event('upload-error', error);
      }, 0);

      return uploadPromise;
    });

    it('upload error to emoji service', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const mockMediaPicker = new MockMediaPicker();
      const mediaEmojiResource = new TestMediaEmojiResource(tokenManagerStub, mockMediaPicker);

      fetchMock.post({
        matcher: siteServiceConfig.url,
        response: 400,
        name: 'emoji-upload'
      });

      tokenManagerStub.getToken.returns(Promise.resolve(defaultMediaApiToken()));

      const uploadPromise = mediaEmojiResource.uploadEmoji(upload).catch(error => {
        const mediaUploads = mockMediaPicker.getUploads();
        expect(mediaUploads.length, '1 media upload').to.equal(1);
        expect(mediaUploads[0], 'upload params').to.deep.equal({
          dataURL: upload.dataURL,
          filename: upload.filename,
        });

        const uploadEmojiCalls = fetchMock.calls('emoji-upload');
        expect(uploadEmojiCalls.length, 'Emoji service upload emoji called').to.equal(1);
        const uploadRequest = uploadEmojiCalls[0][0];

        expect(error, 'Error message').to.equal('Bad Request');

        return uploadRequest.json().then(json => {
          const { shortName, name, width, height } = upload;
          expect(json, 'Emoji service upload request').to.deep.equal({
            shortName,
            name,
            width,
            height,
            fileId: mediaUploadEnd.file.id,
          });
        });
      });

      // simulate MediaAPI done - after getToken resolved
      setTimeout(() => {
        mockMediaPicker.event('upload-end', mediaUploadEnd);
      }, 0);

      return uploadPromise;
    });

    it('media progress events', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const mockMediaPicker = new MockMediaPicker();
      const mediaEmojiResource = new TestMediaEmojiResource(tokenManagerStub, mockMediaPicker);

      tokenManagerStub.getToken.returns(Promise.resolve(defaultMediaApiToken()));

      let progress: EmojiProgress;
      const progressCallback: EmojiProgessCallback = (progressUpdate) => {
        progress = progressUpdate;
      };

      mediaEmojiResource.uploadEmoji(upload, progressCallback);

      const portion = 0.5;

      const donePromise = waitUntil(() => progress).then(() => {
        expect(progress.percent < portion, 'progress percent less than media portion').to.equal(true);
        expect(progress.percent, 'progress percent').to.equal(portion * mediaProportionOfProgress);
      });

      // simulate MediaAPI done - after getToken resolved
      setTimeout(() => {
        const mediaProgress: MediaUploadStatusUpdate = {
          file: mediaUploadEnd.file,
          progress: {
            absolute: 5042,
            portion,
            max: 10666,
            overallTime: 1002,
            expectedFinishTime: 2000,
            timeLeft: 998,
          }
        };
        mockMediaPicker.event('upload-status-update', mediaProgress);
      }, 0);

      return donePromise;
    });
  });

  describe('#prepareForUpload', () => {
    it('prepareForUpload initiates request for new token from server', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const getTokenStub = tokenManagerStub.getToken;
      const mediaEmojiResource = new TestMediaEmojiResource(tokenManagerStub);
      mediaEmojiResource.prepareForUpload();
      expect(getTokenStub.called, 'getToken called').to.equal(true);
    });
  });


  describe('#findSiteEmoji', () => {
    it('Emoji found', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const mockMediaPicker = new MockMediaPicker();
      const mediaEmojiResource = new TestMediaEmojiResource(tokenManagerStub, mockMediaPicker);

      const serviceResponse: EmojiServiceResponse = {
        emojis: [ missingMediaServiceEmoji ],
        meta: {
          mediaApiToken: defaultMediaApiToken(),
        }
      };

      fetchMock.post({
        matcher: fetchSiteEmojiUrl(missingMediaEmojiId),
        response: {
          body: serviceResponse,
        },
        name: 'fetch-site-emoji'
      });

      return mediaEmojiResource.findSiteEmoji(missingMediaEmojiId).then(emoji => {
        expect(emoji, 'Emoji defined').to.not.equal(undefined);
        expect(emoji).to.deep.equal(missingMediaEmoji);
        const fetchSiteEmojiCalls = fetchMock.calls('fetch-site-emoji');
        expect(fetchSiteEmojiCalls.length, 'Fetch site emoji from emoji service called').to.equal(1);
      });
    });

    it('Emoji not found', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const mockMediaPicker = new MockMediaPicker();
      const mediaEmojiResource = new TestMediaEmojiResource(tokenManagerStub, mockMediaPicker);

      const serviceResponse: EmojiServiceResponse = {
        emojis: [],
        meta: {
          mediaApiToken: defaultMediaApiToken(),
        }
      };

      fetchMock.post({
        matcher: fetchSiteEmojiUrl(missingMediaEmojiId),
        response: {
          body: serviceResponse,
        },
        name: 'fetch-site-emoji'
      });

      return mediaEmojiResource.findSiteEmoji(missingMediaEmojiId).then(emoji => {
        expect(emoji, 'Emoji undefined').to.equal(undefined);
        const fetchSiteEmojiCalls = fetchMock.calls('fetch-site-emoji');
        expect(fetchSiteEmojiCalls.length, 'Fetch site emoji from emoji service called').to.equal(1);
      });
    });

    it('Request error', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const mockMediaPicker = new MockMediaPicker();
      const mediaEmojiResource = new TestMediaEmojiResource(tokenManagerStub, mockMediaPicker);

      fetchMock.post({
        matcher: fetchSiteEmojiUrl(missingMediaEmojiId),
        response: 403,
        name: 'fetch-site-emoji'
      });

      return mediaEmojiResource.findSiteEmoji(missingMediaEmojiId).then(emoji => {
        expect(emoji, 'Emoji undefined').to.equal(undefined);
        const fetchSiteEmojiCalls = fetchMock.calls('fetch-site-emoji');
        expect(fetchSiteEmojiCalls.length, 'Fetch site emoji from emoji service called').to.equal(1);
      });
    });
  });
});

describe('TokenManager', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  describe('#addToken', () => {
    it('added token immediately available from getToken read', () => {
      const tokenManager = new TokenManager({
        url: siteServiceConfig.url,
      });
      const addedToken = defaultMediaApiToken();
      tokenManager.addToken('read', addedToken);
      return tokenManager.getToken('read').then(token => {
        expect(token, 'Returned token equals added token').to.deep.equal(addedToken);
      });
    });
  });

  describe('#getToken', () => {
    it('get initial read token refreshed from server', () => {
      const expectedToken = defaultMediaApiToken();
      fetchMock.mock({
        matcher: tokenReadUrl,
        response: {
          body: expectedToken,
        },
        name: 'token-read',
      });
      const tokenManager = new TokenManager({
        url: siteServiceConfig.url,
      });
      return tokenManager.getToken('read').then(token => {
        expect(token, 'Returned token equals added token').to.deep.equal(expectedToken);
        expect(fetchMock.calls('token-read').length, 'Called server once').to.equal(1);
      });
    });

    it('second get read returns current token', () => {
      const expectedToken = defaultMediaApiToken();
      fetchMock.mock({
        matcher: tokenReadUrl,
        response: {
          body: expectedToken,
        },
        name: 'token-read',
      });
      const tokenManager = new TokenManager({
        url: siteServiceConfig.url,
      });
      return tokenManager.getToken('read').then(token => {
        expect(token, 'Returned token equals new token').to.deep.equal(expectedToken);
        expect(fetchMock.calls('token-read').length, 'Called server once').to.equal(1);
        return tokenManager.getToken('read');
      }).then(token => {
        expect(token, 'Returned token equals same token').to.deep.equal(expectedToken);
        expect(fetchMock.calls('token-read').length, 'Called server once (i.e. not again)').to.equal(1);
      });
    });

    it('second get with force read returns new token', () => {
      const expectedToken1 = defaultMediaApiToken();
      const expectedToken2 = {
        ...defaultMediaApiToken(),
        expiresAt: expiresAt(500),
        clientId: 'forced-refresh',
      };
      fetchMock.mock({
        matcher: tokenReadUrl,
        response: {
          body: expectedToken1,
        },
        name: 'token-read-1',
        times: 1,
      }).mock({
        matcher: tokenReadUrl,
        response: {
          body: expectedToken2,
        },
        name: 'token-read-2',
      });

      const tokenManager = new TokenManager({
        url: siteServiceConfig.url,
      });

      return tokenManager.getToken('read').then(token => {
        expect(token, 'Returned token equals new token').to.deep.equal(expectedToken1);
        expect(fetchMock.calls('token-read-1').length, 'Called server once').to.equal(1);
        return tokenManager.getToken('read', true);
      }).then(token => {
        expect(token, 'Returned token equals new token').to.deep.equal(expectedToken2);
        expect(fetchMock.calls('token-read-2').length, 'Called server again').to.equal(1);
      });
    });

    it('get expired read token refreshes from server', () => {
      const tokenManager = new TokenManager({
        url: siteServiceConfig.url,
      });

      const addedToken = {
        ...defaultMediaApiToken(),
        expiresAt: expiresAt(-60),
      };

      const expectedToken = defaultMediaApiToken();
      fetchMock.mock({
        matcher: tokenReadUrl,
        response: {
          body: expectedToken,
        },
        name: 'token-read',
      });

      tokenManager.addToken('read', addedToken);
      return tokenManager.getToken('read').then(token => {
        expect(token, 'Returned token equals added token').to.deep.equal(expectedToken);
        expect(fetchMock.calls('token-read').length, 'Called server once').to.equal(1);
      });
    });

    it('read / upload tokens are separate tokens', () => {
      const expectedReadToken = {
        ...defaultMediaApiToken(),
        clientId: 'read',
      };
      const expectedUploadToken = {
        ...defaultMediaApiToken(),
        clientId: 'upload',
      };

      fetchMock.mock({
        matcher: tokenReadUrl,
        response: {
          body: expectedReadToken,
        },
        name: 'token-read',
      }).mock({
        matcher: tokenUploadUrl,
        response: {
          body: expectedUploadToken,
        },
        name: 'token-upload',
      });

      const tokenManager = new TokenManager({
        url: siteServiceConfig.url,
      });
      return tokenManager.getToken('read').then(token => {
        expect(token, 'Returned read token equals new read token').to.deep.equal(expectedReadToken);
        expect(fetchMock.calls('token-read').length, 'Called server once for read token').to.equal(1);
        return tokenManager.getToken('upload');
      }).then(token => {
        expect(token, 'Returned upload token equals upload token').to.deep.equal(expectedUploadToken);
        expect(fetchMock.calls('token-upload').length, 'Called server once for upload token').to.equal(1);
      });
    });
  });
});
