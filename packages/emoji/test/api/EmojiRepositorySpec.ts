import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import { expect } from 'chai';

import { customCategory, customType } from '../../src/constants';
import { EmojiDescription } from '../../src/types';
import { containsEmojiId, toEmojiId } from '../../src/type-helpers';
import EmojiRepository from '../../src/api/EmojiRepository';

import { emojis as allEmojis, newEmojiRepository, thumbsupEmoji, thumbsdownEmoji, smileyEmoji, openMouthEmoji } from '../TestData';

function checkOrder(expected, actual) {
  expect(actual.length, `${actual.length} emojis`).to.equal(expected.length);
  expected.forEach((emoji, idx) => {
    expect(emoji.id, `emoji #${idx}`).to.equal(actual[idx].id);
  });
}

const cowboy: EmojiDescription = {
  id: '1f920',
  name: 'face with cowboy hat',
  shortName: ':cowboy:',
  type: 'STANDARD',
  category: 'PEOPLE',
  order: 10103,
  representation: {
    sprite: {
      url: 'https://pf-emoji-service--cdn.domain.dev.atlassian.io/standard/6ba7377a-fbd4-4efe-8dbc-f025cfb40c2b/32x32/people.png',
      row: 23,
      column: 25,
      height: 782,
      width: 850
    },
    x: 646,
    y: 714,
    height: 32,
    width: 32,
    xIndex: 19,
    yIndex: 21,
  },
};

const siteTest: EmojiDescription = {
  id: '1f921',
  name: 'collision symbol',
  shortName: ':test:',
  type: customType,
  category: customCategory,
  representation: {
    sprite: {
      url: 'https://pf-emoji-service--cdn.domain.dev.atlassian.io/standard/6ba7377a-fbd4-4efe-8dbc-f025cfb40c2b/32x32/people.png',
      row: 23,
      column: 25,
      height: 782,
      width: 850
    },
    x: 646,
    y: 714,
    height: 32,
    width: 32,
    xIndex: 19,
    yIndex: 21,
  },
};

const atlassianTest: EmojiDescription = {
  id: '1f922',
  name: 'boom',
  shortName: ':test:',
  type: 'ATLASSIAN',
  category: 'SYMBOL',
  representation: {
    sprite: {
      url: 'https://pf-emoji-service--cdn.domain.dev.atlassian.io/standard/6ba7377a-fbd4-4efe-8dbc-f025cfb40c2b/32x32/people.png',
      row: 23,
      column: 25,
      height: 782,
      width: 850
    },
    x: 646,
    y: 714,
    height: 32,
    width: 32,
    xIndex: 19,
    yIndex: 21,
  },
};

const standardTest: EmojiDescription = {
  id: '1f923',
  name: 'BOOM',
  shortName: ':test1:',
  type: 'STANDARD',
  category: 'SYMBOL',
  representation: {
    sprite: {
      url: 'https://pf-emoji-service--cdn.domain.dev.atlassian.io/standard/6ba7377a-fbd4-4efe-8dbc-f025cfb40c2b/32x32/people.png',
      row: 23,
      column: 25,
      height: 782,
      width: 850
    },
    x: 646,
    y: 714,
    height: 32,
    width: 32,
    xIndex: 19,
    yIndex: 21,
  },
};

const allNumberTest: EmojiDescription = {
  id: '1f43c',
  name: 'panda face',
  shortName: ':420:',
  type: 'STANDARD',
  category: 'NATURE',
  representation: {
    sprite: {
      url: 'https://pf-emoji-service--cdn.domain.dev.atlassian.io/standard/551c9814-1d37-4573-819d-afab3afeaf32/32x32/nature.png',
      row: 23,
      column: 25,
      height: 782,
      width: 850
    },
    x: 238,
    y: 0,
    height: 32,
    width: 32,
    xIndex: 7,
    yIndex: 0,
  },
};


describe('EmojiRepository', () => {
  const emojiRepository = newEmojiRepository();

  describe('#search', () => {
    it('all', () => {
      const expectedEmojis = [
        ...allEmojis.slice(0, 10), // upto flag,
        cowboy,
        ...allEmojis.slice(10), // rest...
      ];
      const repository = new EmojiRepository(expectedEmojis);
      const emojis = repository.all().emojis;
      checkOrder(expectedEmojis, emojis);
    });

    it('search all - colon style', () => {
      const expectedEmojis = [
        ...allEmojis.slice(0, 10), // upto flag,
        cowboy,
        ...allEmojis.slice(10), // rest...
      ];
      const repository = new EmojiRepository(expectedEmojis);
      const emojis = repository.search(':').emojis;
      checkOrder(expectedEmojis, emojis);
    });

    it('no categories repeat', () => {
      const emojis = emojiRepository.all().emojis;
      const foundCategories = new Set<string>();
      let lastCategory: string;

      emojis.forEach(emoji => {
        if (emoji.category !== lastCategory) {
          expect(foundCategories.has(emoji.category), 'New category not found before').to.equal(false);
          lastCategory = emoji.category;
        }
      });
    });

    it('returns exact matches first', () => {
      const emojis = emojiRepository.search(':grin').emojis;
      const grinEmojis = allEmojis.filter(emoji => emoji.shortName.indexOf(':grin') === 0).sort((e1, e2) => {
        // If second emoji matches query exactly, bring forward
        if (e2.shortName === ':grin:' && e1.shortName !== ':grin:') {
          return 1;
        }
        // Leave emojis in current order
        return -1;
      });
      checkOrder(grinEmojis, emojis);
    });

    it('conflicting shortName matches show in type order Site -> Atlassian -> Standard', () => {
      const splitCategoryEmojis = [
        ...allEmojis.slice(0, 10), // upto flag,
        atlassianTest,
        standardTest,
        siteTest,
        ...allEmojis.slice(10), // rest...
      ];
      const repository = new EmojiRepository(splitCategoryEmojis);
      const emojis = repository.search(':test').emojis;
      const expectedEmoji = [
        siteTest,
        atlassianTest,
        standardTest,
      ];
      checkOrder(expectedEmoji, emojis);
    });

    it('thumbsup emojis appears before thumbs down', () => {
      const emojis = emojiRepository.search(':thumbs').emojis;
      const expectedEmoji = [
        thumbsupEmoji,
        thumbsdownEmoji,
      ];
      checkOrder(expectedEmoji, emojis);
    });

    it('options - limit ignored if missing', () => {
      const emojis = emojiRepository.search('').emojis;
      checkOrder(allEmojis, emojis);
    });

    it('options - limit results', () => {
      const emojis = emojiRepository.search('', { limit: 10 }).emojis;
      checkOrder(allEmojis.slice(0, 10), emojis);
    });

    it('includes ascii match at the top', () => {
      const emojis = emojiRepository.search(':O').emojis;
      expect(emojis[0]).to.equal(openMouthEmoji);
    });

    it('de-dupes ascii match from other matches', () => {
      const emojis = emojiRepository.search(':O').emojis;
      const openMouthEmojiCount = emojis.filter(e => e.id === openMouthEmoji.id).length;
      expect(openMouthEmojiCount, 'emoji matching ascii representation is only returned once in the search results').to.equal(1);
    });

    it('minus not indexed', () => {
      const emojis = emojiRepository.search(':congo').emojis;
      expect(emojis.length, 'One emoji').to.equal(1);
      expect(emojis[0].name).to.equal('Congo - Brazzaville');
      const noEmojis = emojiRepository.search(':-').emojis;
      expect(noEmojis.length, 'No emoji').to.equal(0);
    });

    it('returns emojis whose shortName starts with a number', () => {
      const expectedEmojis = [
        ...allEmojis,
        allNumberTest,
      ];
      const repository = new EmojiRepository(expectedEmojis);
      const emojis = repository.search(':4').emojis;
      expect(emojis.length, 'One emoji').to.equal(1);
      expect(emojis[0].name).to.equal('panda face');
    });

    it('should include numbers as a part of the query', () => {
      const expectedEmojis = [
        ...allEmojis,
        atlassianTest,
        standardTest,
      ];
      const repository = new EmojiRepository(expectedEmojis);
      const emojis = repository.search(':test1').emojis;
      expect(emojis.length, 'One emoji').to.equal(1);
      expect(emojis[0].name).to.equal('BOOM');
    });
  });

  describe('#addCustomEmoji', () => {
    it('add custom emoji', () => {
      const siteEmojiId = toEmojiId(siteTest);
      const repository = new EmojiRepository(allEmojis);
      repository.addCustomEmoji(siteTest);
      const searchEmojis = repository.search('').emojis;
      expect(searchEmojis.length, 'Extra emoji in results').to.equal(allEmojis.length + 1);
      expect(containsEmojiId(searchEmojis, siteEmojiId), 'Contains site emoji').to.equal(true);

      expect(repository.findById(siteEmojiId.id as string)).to.be.deep.equal(siteTest);
      expect(repository.findByShortName(siteEmojiId.shortName)).to.be.deep.equal(siteTest);
    });

    it('add non-custom emoji rejected', () => {
      try {
        const repository = new EmojiRepository(allEmojis);
        repository.addCustomEmoji(standardTest);
        expect(false, 'Should throw exception').to.equal(true);
      } catch (e) {
        expect(true, 'Exception should be thrown').to.equal(true);
      }
    });
  });

  describe('#findByAsciiRepresentation', () => {
    it('returns the correct emoji for a matching ascii representation', () => {
      const emoji = emojiRepository.findByAsciiRepresentation(':D');
      expect(emoji).to.be.deep.equal(smileyEmoji);
    });

    it('returns the correct emoji for alternative ascii representation', () => {
      const emoji = emojiRepository.findByAsciiRepresentation('=D');
      expect(emoji).to.be.deep.equal(smileyEmoji);
    });

    it('returns undefined when there is no matching ascii representation', () => {
      const emoji = emojiRepository.findByAsciiRepresentation('not-ascii');
      expect(emoji).to.equal(undefined);
    });
  });
});
