import {expect} from 'chai';
import {UrlPreview, LinkDetails, FileDetails} from '@atlaskit/media-core';
import {isLinkDetails} from '../../../src/utils/isLinkDetails';

describe('isLinkDetails()', () => {

  it('should return false for undefined', () => {
    expect(isLinkDetails(undefined)).to.be.false;
  });

  it('should return false for something random', () => {
    expect(isLinkDetails('test')).to.be.false;
    expect(isLinkDetails(2.2)).to.be.false;
  });

  it('should return true for a UrlPreview', () => {
    const link: UrlPreview = {
      type: 'foobar',
      url: 'https://example.com',
      title: 'Example link preview'
    };
    expect(isLinkDetails(link)).to.be.true;
  });

  it('should return true for a LinkDetails', () => {
    const link: LinkDetails = {
      id: 'foo',
      type: 'foobar',
      url: 'https://example.com',
      title: 'Example link item'
    };
    expect(isLinkDetails(link)).to.be.true;
  });

  it('should return true for a FileDetails', () => {
    const file: FileDetails = {
      name: 'foobar.jpg',
      size: 14000
    };
    expect(isLinkDetails(file)).to.be.false;
  });

});
