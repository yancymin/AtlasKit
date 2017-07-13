import { expect } from 'chai';
import { fetchToken } from '../../../src/domain/fetch-token';
import { MediaFile } from '../../../src/mediaviewer';
import { extract, parse } from 'query-string';

const clientId = 'some-client';
const token = 'some-token';
const collectionName = 'some-collection';
const tokenProvider = () => Promise.resolve(token);

describe('fetchToken', () => {
  const authQueryString = `client=${clientId}&collection=${collectionName}&token=${token}`;

  const assertUrl = (expected: string, actual?: string) => {
    const index = expected.indexOf('?');
    if (!actual) {
      expect.fail('actual should not be undefined.');
    }
    else if (index > 0) {
      expect(expected.substring(0, index)).to.equal(actual.substring(0, index));
      expect(parse(extract(expected))).to.deep.equal(parse(extract(actual)));
    } else {
      expect(expected).to.equal(actual);
    }
  };

  it('should add token and client query parameters', () =>
    new Promise<void>((resolve, reject) => {
      fetchToken(clientId, tokenProvider, collectionName)(Mocks.file)
        .then(result => {
          if (result) {
            assertUrl(`https://some-host.com/file?${authQueryString}`, result.src);
            assertUrl(`https://some-host.com/file/binary?dl=1&${authQueryString}`, result.srcDownload);
            assertUrl(`https://some-host.com/file/artifact/hd.mp4/binary?${authQueryString}`, result.src_hd);
            assertUrl(`https://some-host.com/file/artifact/poster.mp4/binary?${authQueryString}`, result.poster);
          } else {
            expect.fail('fetchToken did no return anything');
          }
        })
        .then(resolve, reject);
    }));

  it('should refresh token of pre authenticated file', () =>
    new Promise<void>((resolve, reject) => {
      fetchToken(clientId, tokenProvider, collectionName)(Mocks.authenticatedFile)
        .then(result => {
          if (result) {
            assertUrl(`https://some-host.com/file?${authQueryString}`, result.src);
            assertUrl(`https://some-host.com/file/binary?dl=1&${authQueryString}`, result.srcDownload);
            assertUrl(`https://some-host.com/file/artifact/hd.mp4/binary?${authQueryString}`, result.src_hd);
            assertUrl(`https://some-host.com/file/artifact/poster.mp4/binary?${authQueryString}`, result.poster);
          } else {
            expect.fail('fetchToken did no return anything');
          }
        })
        .then(resolve, reject);
    }));
});

class Mocks {
  static file = {
    attributes: {
      id: 'some-file',
      src: 'https://some-host.com/file',
      srcDownload: 'https://some-host.com/file/binary?dl=1',
      type: 'video/mp4',
      title: 'Some File',
      src_hd: 'https://some-host.com/file/artifact/hd.mp4/binary',
      poster: 'https://some-host.com/file/artifact/poster.mp4/binary'
    }
  } as MediaFile;

  static readonly oldToken = 'old-token';
  static readonly oldAuth = `token=${Mocks.oldToken}&client=${clientId}&collection=${collectionName}`;
  static authenticatedFile = {
    attributes: {
      id: 'some-file',
      src: `https://some-host.com/file?${Mocks.oldAuth}`,
      srcDownload: `https://some-host.com/file/binary?dl=1&${Mocks.oldAuth}`,
      type: 'video/mp4',
      title: 'Some File',
      src_hd: `https://some-host.com/file/artifact/hd.mp4/binary?${Mocks.oldAuth}`,
      poster: `https://some-host.com/file/artifact/poster.mp4/binary?${Mocks.oldAuth}`
    }
  } as MediaFile;
}
