import * as chai from 'chai';
import {isImageRemote} from '../../src';
const expect = chai.expect;

describe('isImageRemote', () => {
  it('should return false for local resource (true in IE)', () => {
    const localUrl = 'data:image/png;base64,iVBORw0KGgoAAHwAAAABJRU5ErkJggg==';

    if (hasNewURL()) {
      expect(isImageRemote(localUrl)).to.be.false;
    } else {
      expect(isImageRemote(localUrl)).to.be.true;
    }
  });

  it('should retun false for same host, port and protocol (true in IE)', () => {
    const windowOrigin = 'https://www.atlassian.com:1234';
    const url = 'https://www.atlassian.com:1234/assets/images/image.png';

    if (hasNewURL()) {
      expect(isImageRemote(url, windowOrigin)).to.be.false;
    } else {
      expect(isImageRemote(url, windowOrigin)).to.be.true;
    }
  });

  it('should return true for the same host, port, but different protocols', () => {
    const windowOrigin = 'https://www.atlassian.com:1234';
    const url = 'http://www.atlassian.com:1234/assets/images/image.png';
    expect(isImageRemote(url, windowOrigin)).to.be.true;
  });

  it('should return true for the same host, protocol, but different ports', () => {
    const windowOrigin = 'https://www.atlassian.com:1234';
    const url = 'https://www.atlassian.com:1254/assets/images/image.png';
    expect(isImageRemote(url, windowOrigin)).to.be.true;
  });

  it('should return true for the same port, protocol, but different hosts', () => {
    const windowOrigin = 'https://www.atlassian.com:1234';
    const url = 'https://www.atlassian.io:1234/assets/images/image.png';
    expect(isImageRemote(url, windowOrigin)).to.be.true;
  });

  const hasNewURL = () => {  // returns true if "new URL" is supported (IE doesn't support it)
    return URL && URL.prototype;
  };
});
