import * as fetchMock from 'fetch-mock';
import { expect } from 'chai';

import PresenceResource, {
  DefaultPresenceCache, DefaultPresenceParser, PresenceMap
} from '../../src/api/PresenceResource';
import { validPresenceData, invalidPresenceData } from '../_presence-data';

const baseUrl = 'https://bogus/presence';
const dummyId = 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5';

const apiConfig = {
  url: baseUrl,
  cloudId: dummyId,
};

const testIds = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

describe('PresenceParser', () => {
  it('should parse valid responses to presence updates', (done) => {
    const parser = new DefaultPresenceParser();
    const update = parser.parse(validPresenceData);
    let count = 0;
    validPresenceData['data'].PresenceBulk.forEach((response) => {
      if (response.state) {
        expect(update[response.userId].status).to.equal(parser.mapState(response.state));
        count++;
      }
    });
    if (count === 6) {
      done();
    }
  });

  it('should generate update despite invalid presence data', (done) => {
    const parser = new DefaultPresenceParser();
    const update = parser.parse(invalidPresenceData);
    let count = 0;
    invalidPresenceData['data'].PresenceBulk.forEach((response) => {
      if (response.userId && response.state) {
        expect(update[response.userId].status).to.equal(parser.mapState(response.state));
        count++;
      }
    });
    if (count === 2) {
      done();
    }
  });
});

describe('PresenceCache', () => {
  let cache: DefaultPresenceCache;
  let parser: DefaultPresenceParser;
  let testPresenceMap: PresenceMap;
  let extraPresences: PresenceMap;

  before(() => {
    const beforeParser = new DefaultPresenceParser();
    testPresenceMap = beforeParser.parse(validPresenceData);
    extraPresences = {
      '13-thirteen-13': {'status': 'available'},
      'Roger-rolo-the-steam-roller-Lo': {'status': 'busy'}
    };
  });

  beforeEach(() => {
    // Setup presence resource and cache
    cache = new DefaultPresenceCache();
    parser = new DefaultPresenceParser();
  });

  it('should know whether it contains a user by ID', () => {
    cache.update(testPresenceMap);
    const userId = Object.keys(testPresenceMap)[0];
    expect(cache.contains(userId)).to.be.equal(true);
   });

  it('should not contain IDs that not have been manually added to the cache', () => {
    cache.update(testPresenceMap);
    expect(cache.contains('DEFINITELY-N0T-A-TEST-US3R-1D'), 'Claimed to contain a user ID it shouldn\'t have').to.be.equal(false);
  });

  it('should retrieve a user given their ID', () => {
    cache.update(testPresenceMap);
    const userId = Object.keys(testPresenceMap)[0];
    const expectedPresence = testPresenceMap[userId];
    expect(cache.get(userId)).to.deep.equal(expectedPresence);
  });

  it('should return no presence if queried for users not present in the cache', () => {
    cache.update(testPresenceMap);

    // tslint:disable-next-line:no-unused-expression
    expect(cache.get('DEFINITELY-N0T-A-TEST-US3R-1D')).to.be.empty;
  });

  it('should retrieve a set of users given an array of their IDs', () => {
    cache.update(testPresenceMap);
    const userIds = Object.keys(testPresenceMap);
    const actual = cache.getBulk(userIds);
    expect(actual).to.deep.equal(testPresenceMap);
  });

  it('should update its entries when given a PresenceMap', () => {
    cache.update(testPresenceMap);
    cache.update(extraPresences);
    const combinedPresences = {
      ...testPresenceMap,
      ...extraPresences
    };
    expect(cache.getBulk(Object.keys(combinedPresences))).to.deep.equal(combinedPresences);
  });

  it('should retrieve a set of missing users given an array of their IDs', () => {
    const extraIds: string[] = ['13-thirteen-13', 'Roger-rolo-the-steam-roller-Lo'];
    cache.update(testPresenceMap);
    expect(cache.getMissingUserIds(testIds.concat(extraIds))).to.deep.equal(testIds.slice(6, 9).concat(extraIds));
  });

  it('should insert and store user ids on demand', (done) => {
    // Check cache only adds entries when hit by presence service
    expect(cache.contains(testIds[0])).to.equal(false);
    cache.update(testPresenceMap);
    let cacheHits = 0;
    testIds.forEach((id) => {
      if (cache.contains(id) === true) {
        cacheHits++;
      }
    });
    if (cacheHits === 6) {
      done();
    }
  });

  it('should store correctly parsed responses from presence service', () => {
    cache.update(testPresenceMap);
    // Check cache stores correct mapping
    validPresenceData['data'].PresenceBulk.forEach((response) => {
      if (response.state) {
        expect(cache.get(response.userId).status).to.equal(parser.mapState(response.state));
      }
    });
  });

  it('should store correctly parsed responses from presence service', () => {
    cache.update(testPresenceMap);
    // Check cache stores correct mapping
    validPresenceData['data'].PresenceBulk.forEach((response) => {
      if (response.state) {
        expect(cache.get(response.userId).status).to.equal(parser.mapState(response.state));
      }
    });
  });

  it('should delete the entry if the user presence it gets has expired', () => {
    const expiredCache = new DefaultPresenceCache(-1);
    expiredCache.update(testPresenceMap);
    expiredCache.get(testIds[0]);
    expect(expiredCache.contains(testIds[0])).to.be.equal(false);
  });

  it('should remove all expired users if the cache hits its trigger point', () => {
    const limitedCache = new DefaultPresenceCache(-1, 5);
    limitedCache.update(testPresenceMap);
    limitedCache.update(extraPresences);
    validPresenceData['data'].PresenceBulk.forEach((response) => {
      expect(limitedCache.contains(response.userId)).to.be.equal(false);
    });
  });
});

describe('PresenceResource', () => {
  const mockName: string = 'query';
  beforeEach(() => {
    const matcher = {
      name: `${mockName}`,
      matcher: `begin:${baseUrl}`,
    };

    fetchMock
      .mock({ ...matcher,
        response: {
          body: validPresenceData
        },
      });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('#refreshPresence', () => {
    it('should result in fewer listener callbacks and service requests with cache', (done) => {
      const resource = new PresenceResource(apiConfig);
      try {
        // notifyListeners called twice as no cache hits so must call again after service query
        resource.refreshPresence(testIds);
        let calls = fetchMock.calls(mockName);
        expect(calls.length, 'First presence query made').to.equal(1);
        setTimeout(() => {
            resource.refreshPresence(testIds.slice(0, 6));
          }, 5);
        calls = fetchMock.calls(mockName);
        expect(calls.length, 'Cache should return all data').to.equal(1);
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should result in one callback after injecting a cache and only hitting existing ids', (done) => {
      try {
        // Setup parser and cache with data
        const parser = new DefaultPresenceParser();
        const populatedCache = new DefaultPresenceCache();
        const update = parser.parse(validPresenceData);
        populatedCache.update(update);

        // Initialise resource with cache
        const resource = new PresenceResource({...apiConfig, cache: populatedCache});
        resource.refreshPresence(testIds.slice(0, 6));
        const calls = fetchMock.calls(mockName);
        // One call since only needs to render info from cache
        expect(calls.length).to.equal(0);
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
