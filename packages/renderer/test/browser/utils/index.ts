import { expect } from 'chai';
import {
  isTextWrapper,
  isText,
  isSafeUrl
} from '../../../src/utils';

describe('Utils', () => {

  describe('isTextWrapper', () => {
    it('should return true if type equals "textWrapper"', () => {
      expect(isTextWrapper('textWrapper')).to.equal(true);
    });

    it('should return false if type does not equal "textWrapper"', () => {
      expect(isTextWrapper('mention')).to.equal(false);
    });
  });

  describe('isText', () => {
    it('should return true if type equals "text"', () => {
      expect(isText('text')).to.equal(true);
    });

    it('should return false if type does not equal "text"', () => {
      expect(isText('mention')).to.equal(false);
    });
  });

  describe('isSafeUrl', () => {
    const safeURLs = [
      'http:///www.atlassian.com',
      'https://www.atlassian.com',
      'ftp://some.site.com',
      'ftps://some.site.com',
      '//www.atlassian.com',
      '//hipchat.com',
      '//subdomain.somedomain.com',
      '//www.atlassian.com/somepage',
      'mailto:user@mail.com'
    ];

    const unsafeURLs = [
      'javascript:alert("Hello World!")',
      ' javascript:alert("Hello World!")',
      '\njavascript:alert("Hello World!")',
    ];

    it('should return true if URL starts with http://, https://, ftp://, ftps:// etc', () => {
      safeURLs.forEach(url => {
        expect(isSafeUrl(url)).to.equal(true);
      });
    });

    it ('should return false for "unsafe" URLs', () => {
      unsafeURLs.forEach(url => {
        expect(isSafeUrl(url)).to.equal(false);
      });
    });
  });

});
