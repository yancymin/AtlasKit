import * as chai from 'chai';
import * as fetchMock from 'fetch-mock';
import * as sinon from 'sinon';

import { ReactionsResource } from '../src';
import { equalEmojiId } from '../src/internal/helpers';
import { grinId, grinningId, laughingId, smileyId, thumbsupId } from './test-data';

const { expect } = chai;

const baseUrl = 'https://reactions';
const ari = 'ari:cloud:owner:demo-cloud-id:item/1';
const containerAri = 'ari:cloud:owner:demo-cloud-id:container/1';

const detailedReaction = {
  ari: ari,
  containerAri: containerAri,
  emojiId: grinningId.id!,
  count: 1,
  reacted: true,
  users: [
    {
      id: 'oscar',
      displayName: 'Oscar Wallhult'
    }
  ]
};

const reaction = {
  ari: ari,
  containerAri: containerAri,
  emojiId: grinningId.id!,
  count: 1,
  reacted: true
};

const fetchDetailedReaction = () => {
  return detailedReaction;
};

const fetchGetReactions = () => {
  return {
    [ari]: [
      {
        ari: ari,
        containerAri: containerAri,
        emojiId: grinningId.id!,
        count: 1,
        reacted: true
      },
      {
        ari: ari,
        containerAri: containerAri,
        emojiId: laughingId.id!,
        count: 2,
        reacted: true
      },
      {
        ari: ari,
        containerAri: containerAri,
        emojiId: thumbsupId.id!,
        count: 5,
        reacted: false
      },
      {
        ari: ari,
        containerAri: containerAri,
        emojiId: grinId.id!,
        count: 100,
        reacted: false
      }
    ]
  };
};

const fetchAddReaction = () => {
  return {
    ari: ari,
    containerAri: containerAri,
    reactions: [...fetchGetReactions()[ari], {
      ari: ari,
      containerAri: containerAri,
      emojiId: smileyId.id,
      count: 1,
      reacted: true
    }]
  };
};

const fetchDeleteReaction = () => {
  return {
    ari: ari,
    containerAri: containerAri,
    reactions: fetchGetReactions()[ari].filter(r => !equalEmojiId(r.emojiId, grinningId.id!))
  };
};

const populateCache = (reactionsProvider: ReactionsResource) => {
  const cachedReactions = {};
  const response = fetchGetReactions();
  Object.keys(response).forEach(ari => {
    const key = `${response[ari][0].containerAri}|${response[ari][0].ari}`;
    cachedReactions[key] = response[ari];
  });
  (reactionsProvider as any).cachedReactions = cachedReactions;
};

describe('@atlaskit/reactions/reactions-provider', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  describe('test data defined', () => {
    expect(grinningId, 'grinning').to.not.eq(undefined);
    expect(laughingId, 'laughing').to.not.eq(undefined);
    expect(thumbsupId, 'thumbsup').to.not.eq(undefined);
    expect(grinId, 'grin').to.not.eq(undefined);
    expect(smileyId, 'smiley').to.not.eq(undefined);
  });

  describe('getReactions', () => {
    beforeEach(() => {
      fetchMock.mock({
        options: {
          method: 'POST'
        },
        matcher: 'end:reactions/view',
        response: fetchGetReactions()
      });
    });

    const reactionsProvider = new ReactionsResource({baseUrl});
    it('should return reaction data', () => {
      return reactionsProvider.getReactions([{ari, containerAri}])
        .then(reactions => {
          expect(reactions).to.deep.equal(fetchGetReactions());
        });
    });

    it('should set cached reactions', () => {
      return reactionsProvider.getReactions([{ari, containerAri}])
        .then(reactions => {
          expect(Object.keys((reactionsProvider as any).cachedReactions).length).to.equal(1);
        });
    });

    it('should not overwrite cache for excluded aris', () => {
      populateCache(reactionsProvider);
      const anotherAri = 'another:ari:123';
      const anotherAriData = [
        {
          ari: anotherAri,
          containerAri: containerAri,
          emojiId: 'grinning',
          count: 1,
          reacted: false
        }
      ];

      const anotherCacheKey = reactionsProvider.objectReactionKey(containerAri, anotherAri);
      (reactionsProvider as any).cachedReactions[anotherCacheKey] = anotherAriData;

      return reactionsProvider.getReactions([{ari, containerAri}])
        .then(reactions => {
          expect((reactionsProvider as any).cachedReactions).not.to.deep.equal(reactions);
          expect((reactionsProvider as any).cachedReactions[reactionsProvider.objectReactionKey(containerAri, ari)]).to.deep.equal(reactions[ari]);
          expect((reactionsProvider as any).cachedReactions[anotherCacheKey]).to.deep.equal(anotherAriData);
        });
    });
  });

  describe('addReaction', () => {
    const reactionsProvider = new ReactionsResource({baseUrl});
    populateCache(reactionsProvider);

    it('should optimistically add reaction', () => {
      fetchMock.mock({
        options: {
          method: 'POST'
        },
        matcher: 'end:reactions',
        response: fetchAddReaction()
      });
      const spy = sinon.spy(reactionsProvider, 'notifyUpdated');

      return reactionsProvider.addReaction(containerAri, ari, smileyId.id!)
        .then(state => {
          expect(spy.called).to.equal(true);
          expect((reactionsProvider as any).cachedReactions[reactionsProvider.objectReactionKey(containerAri, ari)]).to.deep.equal(state);
          expect(state.length).to.equal(fetchGetReactions()[ari].length + 1);
        });
    });
  });

  describe('deleteReaction', () => {
    const reactionsProvider = new ReactionsResource({baseUrl});
    populateCache(reactionsProvider);

    it('should optimistically delete reaction', () => {
      fetchMock.mock({
        options: {
          method: 'DELETE'
        },
        matcher: `begin:${baseUrl}/reactions?ari=${ari}`,
        response: fetchDeleteReaction()
      });
      const spy = sinon.spy(reactionsProvider, 'notifyUpdated');

      return reactionsProvider.deleteReaction(containerAri, ari, grinningId.id!)
        .then(state => {
          expect(spy.called).to.equal(true);
          expect((reactionsProvider as any).cachedReactions[reactionsProvider.objectReactionKey(containerAri, ari)]).to.deep.equal(state);
          expect(state.length).to.equal(fetchGetReactions()[ari].length - 1);
        });
    });
  });

  describe('toggleReaction', () => {
    it('should optimistically add reaction if not in cache or if user have not reacted and call service', () => {
      const reactionsProvider = new ReactionsResource({baseUrl});
      populateCache(reactionsProvider);

      const optimisticSpy = sinon.spy(reactionsProvider, 'optimisticAddReaction');
      const addSpy = sinon.spy(reactionsProvider, 'addReaction');

      reactionsProvider.toggleReaction(containerAri, ari, smileyId.id!);
      expect(optimisticSpy.called).to.equal(true);
      expect(addSpy.called).to.equal(true);
    });

    it('should optimistically delete reaction if in cache and call service', () => {
      const reactionsProvider = new ReactionsResource({baseUrl});
      populateCache(reactionsProvider);

      const optimisticSpy = sinon.spy(reactionsProvider, 'optimisticDeleteReaction');
      const deleteSpy = sinon.spy(reactionsProvider, 'deleteReaction');

      reactionsProvider.toggleReaction(containerAri, ari, grinningId.id!);
      expect(optimisticSpy.called).to.equal(true);
      expect(deleteSpy.called).to.equal(true);
    });

    it('should optimistically increase counter on reaction if user have not already reacted', () => {
      const reactionsProvider = new ReactionsResource({baseUrl});
      populateCache(reactionsProvider);

      const addSpy = sinon.spy(reactionsProvider, 'addReaction');
      reactionsProvider.toggleReaction(containerAri, ari, thumbsupId.id!);
      expect(addSpy.called).to.equal(true);

      const reaction = (reactionsProvider as any).cachedReactions[reactionsProvider.objectReactionKey(containerAri, ari)].filter(r => equalEmojiId(r.emojiId, thumbsupId.id!))[0];
      expect(reaction.count).to.equal(6);
      expect(reaction.reacted).to.equal(true);
    });

    it('should optimistically decrease counter on reaction if user have already reacted', () => {
      const reactionsProvider = new ReactionsResource({baseUrl});
      populateCache(reactionsProvider);

      const deleteSpy = sinon.spy(reactionsProvider, 'deleteReaction');
      reactionsProvider.toggleReaction(containerAri, ari, laughingId.id!);
      expect(deleteSpy.called).to.equal(true);

      const reaction = (reactionsProvider as any).cachedReactions[reactionsProvider.objectReactionKey(containerAri, ari)].filter(r => equalEmojiId(r.emojiId, laughingId.id!))[0];
      expect(reaction.count).to.equal(1);
      expect(reaction.reacted).to.equal(false);
    });

    it('should delete reaction if count is less than 1', () => {
      const reactionsProvider = new ReactionsResource({baseUrl});
      populateCache(reactionsProvider);

      const deleteSpy = sinon.spy(reactionsProvider, 'deleteReaction');
      reactionsProvider.toggleReaction(containerAri, ari, grinningId.id!);
      expect(deleteSpy.called).to.equal(true);

      const objectReactionKey = reactionsProvider.objectReactionKey(containerAri, ari);
      expect((reactionsProvider as any).cachedReactions[objectReactionKey].filter(r => equalEmojiId(r.emojiId, grinningId.id!)).length).to.equal(0);
      expect((reactionsProvider as any).cachedReactions[objectReactionKey].length).to.equal(fetchGetReactions()[ari].length - 1);
    });
  });

  describe('getDetailedReaction', () => {
    const reactionId = `${containerAri}|${ari}|${grinningId!.id}`;
    const reactionsProvider = new ReactionsResource({baseUrl});

    beforeEach(() => {
      fetchMock.mock({
        options: {
          method: 'GET'
        },
        matcher: `end:reactions?reactionId=${encodeURIComponent(reactionId)}`,
        response: fetchDetailedReaction()
      });
    });

    it('should fetch details for reaction', () => {
      return reactionsProvider.getDetailedReaction(reaction)
        .then(detail => {
          expect(detail).to.deep.equal(detailedReaction);
        });
    });
  });

  describe('fetchReactionDetails', () => {
    const reactionId = `${containerAri}|${ari}|${grinningId!.id}`;
    const reactionsProvider = new ReactionsResource({baseUrl});

    beforeEach(() => {
      fetchMock.mock({
        options: {
          method: 'GET'
        },
        matcher: `end:reactions?reactionId=${encodeURIComponent(reactionId)}`,
        response: fetchDetailedReaction()
      });
    });

    it('should fetch reaction details for reaction', () => {
      const spy = sinon.spy(reactionsProvider, 'getDetailedReaction');
      reactionsProvider.fetchReactionDetails(reaction);
      expect(spy.called).to.equal(true);
      expect(spy.calledWith(reaction)).to.equal(true);
      spy.restore();
    });

    it('should call notifyUpdated if cached', () => {
      const key = `${reaction.containerAri}|${reaction.ari}`;
      (reactionsProvider as any).cachedReactions = {
        [key]: [reaction]
      };
      const spy = sinon.spy(reactionsProvider, 'notifyUpdated');
      return reactionsProvider.fetchReactionDetails(reaction)
          .then(() => {
            expect(spy.called).to.equal(true);
            expect(spy.calledWith(reaction.containerAri, reaction.ari, [detailedReaction])).to.equal(true);
            spy.restore();
          });
    });

    it('should not query if request already in flight', () => {
      const firstCall = reactionsProvider.fetchReactionDetails(reaction);

      const spy = sinon.spy(reactionsProvider, 'getDetailedReaction');
      const secondCall = reactionsProvider.fetchReactionDetails(reaction);
      expect(spy.called).to.equal(false);
      expect(secondCall).to.equal(firstCall);
      spy.restore();
    });

  });
});

