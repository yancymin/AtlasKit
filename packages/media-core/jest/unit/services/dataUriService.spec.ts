import { expect } from 'chai';
import { spy } from 'sinon';
import { MediaDataUriService } from '../../../src/services/dataUriService';

const clientId = 'some-client-id';
const collectionName = 'some-collection-name';
const token = 'some-token';
const serviceHost = 'some-service-host';
const tokenProvider = () => Promise.resolve(token);

describe('MediaDataUriService', () => {
  const service = new MediaDataUriService(clientId, serviceHost, tokenProvider, collectionName);

  describe('fetchImageDataUri()', () => {
    it('should use "crop" resize mode as default', () => {
      const fetchSomeDataUriSpy = spy();
      service.fetchSomeDataUri = fetchSomeDataUriSpy;

      service.fetchImageDataUri({type: 'file', details: {}}, 100, 100);

      expect(fetchSomeDataUriSpy.args[0][1].mode).to.equal('crop');
    });

    it('should allow consumers to specify a resize mode', () => {
      const fetchSomeDataUriSpy = spy();
      service.fetchSomeDataUri = fetchSomeDataUriSpy;

      service.fetchImageDataUri({type: 'file', details: {}}, 100, 100, 'full-fit');

      expect(fetchSomeDataUriSpy.args[0][1].mode).to.equal('full-fit');
    });
  });
});
