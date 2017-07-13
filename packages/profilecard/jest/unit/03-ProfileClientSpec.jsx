import * as sinon from 'sinon';
import fetchMock from 'fetch-mock';

import AkProfileClient, { modifyResponse } from '../../src/api/profile-client';

const clientUrl = 'https://foo/';
const clientCacheSize = 10;
const clientCacheMaxAge = 500;

describe('Profilecard', () => {
  describe('AkProfileClient', () => {
    it('config.url is available when set on instantiation', () => {
      const client = new AkProfileClient({
        url: clientUrl,
      });

      expect(client.config.url).toBe(clientUrl);
      expect(client.cache).toBe(null);
    });

    it('cache is available when cacheMaxAge is set on instantiation', () => {
      const client = new AkProfileClient({
        url: clientUrl,
        cacheSize: clientCacheSize,
        cacheMaxAge: clientCacheMaxAge,
      });

      expect(client.config.url).toBe(clientUrl);
      expect(client.cache).not.toBe(null);
      expect(client.cache.limit).toBe(clientCacheSize);
      expect(client.cacheMaxAge).toBe(clientCacheMaxAge);
    });

    describe('LRU Cache', () => {
      const client = new AkProfileClient({
        url: clientUrl,
        cacheSize: clientCacheSize,
        cacheMaxAge: clientCacheMaxAge,
      });

      let cache;
      let clock;

      beforeEach(() => {
        clock = sinon.useFakeTimers();
        fetchMock.post(
          '*',
          { data: 'foo' }
        );
      });

      afterEach(() => {
        clock.restore();
        fetchMock.restore();
      });

      describe('#getCachedProfile', () => {
        it('should return cached data within n milliseconds', (done) => {
          client.getProfile('DUMMY-CLOUD-ID', '1')
          .then((data) => {
            clock.tick(clientCacheMaxAge);
            cache = client.getCachedProfile('DUMMY-CLOUD-ID', '1');

            expect(cache).toBe(data);
            done();
          })
          .catch((err) => {
            done(err);
          });
        });

        it('should return `null` after n+1 milliseconds ', (done) => {
          client.getProfile('DUMMY-CLOUD-ID', '1')
          .then(() => {
            clock.tick(clientCacheMaxAge + 1);
            cache = client.getCachedProfile('DUMMY-CLOUD-ID', '1');

            expect(cache).toBe(null);
            done();
          })
          .catch((err) => {
            done(err);
          });
        });

        it('should reset expiry to n ms when cache item is used', (done) => {
          client.getProfile('DUMMY-CLOUD-ID', '1')
          .then((data) => {
            clock.tick(clientCacheMaxAge);
            cache = client.getCachedProfile('DUMMY-CLOUD-ID', '1');

            expect(cache).toBe(data);

            clock.tick(clientCacheMaxAge);
            cache = client.getCachedProfile('DUMMY-CLOUD-ID', '1');

            expect(cache).toBe(data);
            done();
          })
          .catch((err) => {
            done(err);
          });
        });
      });

      describe('#flushCache', () => {
        it('should purge all cached items', (done) => {
          client.getProfile('DUMMY-CLOUD-ID', '1')
          .then((data) => {
            cache = client.getCachedProfile('DUMMY-CLOUD-ID', '1');

            expect(cache).toBe(data);

            client.flushCache();
            cache = client.getCachedProfile('DUMMY-CLOUD-ID', '1');

            expect(cache).toBe(null);
            done();
          })
          .catch((err) => {
            done(err);
          });
        });
      });
    });

    describe('#modifyResponse', () => {
      it('should remove certain properties from the data object', () => {
        const data = {
          User: {
            remoteWeekdayIndex: 'shouldberemoved',
            remoteWeekdayString: 'shouldberemoved',
            remoteTimeString: 'shouldberemoved',
            id: 'shouldberemoved',
          },
        };

        const result = modifyResponse(data);

        expect(result.remoteWeekdayIndex).toBe(undefined);
        expect(result.remoteWeekdayString).toBe(undefined);
        expect(result.remoteTimeString).toBe(undefined);
        expect(result.id).toBe(undefined);
      });

      it('should rename "remoteTimeString" property to "timestring"', () => {
        const data = {
          User: {
            remoteTimeString: '10:23am',
          },
        };

        const result = modifyResponse(data);

        expect(result.timestring).toBe('10:23am');
      });

      it('should not modify "timestring" property if remote and local date share the same weekday index', () => {
        const data = {
          User: {
            remoteTimeString: '0:00pm',
            remoteWeekdayString: 'Mon',
            remoteWeekdayIndex: new Date().getDay().toString(),
          },
        };

        const result = modifyResponse(data);

        expect(result.timestring).toBe('0:00pm');
      });

      it('should prefix "timestring" property with weekday if local dates weekday index is different', () => {
        const data = {
          User: {
            remoteTimeString: '0:00pm',
            remoteWeekdayString: 'Mon',
            remoteWeekdayIndex: 12,
          },
        };

        const result = modifyResponse(data);

        expect(result.timestring).toBe('Mon 0:00pm');
      });
    });
  });
});
