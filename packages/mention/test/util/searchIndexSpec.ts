import { expect } from 'chai';
import {Highlighter, SearchIndex} from '../../src/util/searchIndex';

describe('SearchIndex', () => {

  let searchIndex: SearchIndex;

  beforeEach(() => {
    searchIndex = new SearchIndex();
  });

  it('should search by first name', (done) => {
    searchIndex.indexResults([
      { id: 'id', name: 'Homer Simpson', mentionName: 'mentionName' }
    ]);

    searchIndex.search('homer').then(result => {
      expect(result.mentions).to.have.lengthOf(1);
      done();
    });
  });

  it('should search by last name', (done) => {
    searchIndex.indexResults([
      { id: 'id', name: 'Homer Simpson', mentionName: 'mentionName' }
    ]);

    searchIndex.search('simpson').then(result => {
      expect(result.mentions).to.have.lengthOf(1);
      done();
    });
  });

  it('should search by mention name', (done) => {
    searchIndex.indexResults([
      { id: 'id', name: 'Homer Simpson', mentionName: 'mentionName' }
    ]);

    searchIndex.search('mention').then(result => {
      expect(result.mentions).to.have.lengthOf(1);
      done();
    });
  });

  it('should search by nickname', (done) => {
    searchIndex.indexResults([
      { id: 'id', name: 'Homer Simpson', mentionName: 'mentionName', nickname: 'donut' }
    ]);

    searchIndex.search('donut').then(result => {
      expect(result.mentions).to.have.lengthOf(1);
      done();
    });
  });

  it('should search chinese characters', (done) => {
    searchIndex.indexResults([
      { id: 'id', name: '我是法国人', mentionName: '法国人' }
    ]);

    searchIndex.search('国').then(result => {
      expect(result.mentions).to.have.lengthOf(1);
      done();
    });
  });

  it('should search by token in name', (done) => {
    searchIndex.indexResults([
      { id: 'id', name: 'Homer Simpson [Atlassian]', mentionName: 'mentionName' }
    ]);

    searchIndex.search('atlas').then(result => {
      expect(result.mentions).to.have.lengthOf(1);
      done();
    });
  });

  it('should search by multiple terms in name', (done) => {
    searchIndex.indexResults([
      { id: 'id', name: 'Homer Simpson', mentionName: 'mentionName' }
    ]);

    searchIndex.search('h s').then(result => {
      expect(result.mentions).to.have.lengthOf(1);
      done();
    });
  });

  it('should not search special mention on name', (done) => {
    searchIndex.indexResults([
      { id: 'all', name: 'All room members', mentionName: 'all', nickname: 'all', userType: 'SPECIAL' },
    ]);

    searchIndex.search('m').then(result => {
      expect(result.mentions).to.have.lengthOf(0);
      done();
    });
  });

  it('should search special mention on nickname', (done) => {
    searchIndex.indexResults([
      { id: 'all', name: 'All room members', mentionName: 'all', nickname: 'all', userType: 'SPECIAL' },
    ]);

    searchIndex.search('a').then(result => {
      expect(result.mentions).to.have.lengthOf(1);
      done();
    });
  });
});

describe('Highlighter', () => {

  const rules = [
    { description: 'no match', value: 'Very, very frightening me', query: 'nothing', results: [] },
    { description: 'empty query', value: 'Very, very frightening me', query: '', results: [] },
    { description: 'empty field', value: '', query: 'nothing', results: [] },
    { description: 'one match', value: 'Easy come, easy go, will you let me go?', query: 'com', results: [{ start: 5, end: 7 }] },
    { description: 'multiple matches', value: 'scaramouche, scaramouche, will you do the fandango', query: 'scaramouche', results: [{ start: 0, end: 10 }, { start: 13, end: 23 }] },
    { description: 'consecutive matches', value: 'ab ab ab', query: 'ab', results: [{ start: 0, end: 1 }, { start: 3, end: 4 }, { start: 6, end: 7 }] },
    { description: 'lowercase', value: 'Galileo Figaro', query: 'figaro', results: [{ start: 8, end: 13 }] },
    { description: 'unicode', value: '我是法国人', query: '我', results: [{ start: 0, end: 0 }] },
    { description: 'diacritics', value: 'orč pžs íáýd', query: 'orč', results: [{ start: 0, end: 2 }] },
    { description: 'multiple terms', value: 'scaramouche, scaramouche, will you do the fandango', query: 'wi fan', results: [{ start: 26, end: 27 }, { start: 42, end: 44 }] },
    { description: 'multiple identical terms', value: 'tim tam', query: 't t', results: [{ start: 0, end: 0 }, { start: 4, end: 4 }] },
    { description: 'multiple identical terms with subterms', value: 'tim tam', query: 'ti t', results: [{ start: 0, end: 1 }, { start: 4, end: 4 }] },
    { description: 'apostrophe', value: 'Homer D\'Simpson', query: 'D\'S', results: [{ start: 6, end: 8 }] },
    { description: 'no highlight if not every term matches', value: 'scaramouche, scaramouche, will you', query: 'wi fan', results: [] },
    { description: 'multiple identical terms with subterms 2', value: 'tim tam', query: 't ti', results: [{ start: 0, end: 1 }, { start: 4, end: 4 }] },
    { description: 'combining character', value: 'ញុំ', query: 'ញ', results: [{ start: 0, end: 2 }] },
  ];

  it('should match rules', () => {
    for (let key in rules) {
      if (rules.hasOwnProperty(key)) {
        const rule = rules[key];
        const highlights = Highlighter.find(rule.value, rule.query);
        expect(highlights).to.have.lengthOf(rule.results.length);

        for (let index = 0; index < rule.results.length; index++) {
          expect(highlights).to.include(rule.results[index], 'Rule <' + rule.description + '> failed');
        }

      }
    }
  });

});
