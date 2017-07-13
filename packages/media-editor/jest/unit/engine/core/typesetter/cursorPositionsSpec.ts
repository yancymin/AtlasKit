import {expect} from 'chai';
import {stub} from 'sinon';
import {isWhiteSpace, isClose, getDirection, getGroupStartIndices, createSpansForCharacters, createSpansForGroups,
        calculateTotalLength, putInternalPositions} from '../../../../../src/engine/core/typesetter/cursorPositions';

describe('MediaEditor cursor positions', () => {
  const getBoundingClientRectMethod = 'getBoundingClientRect';

  describe('isWhiteSpace', () => {
    it('should return true for space', () => {
      expect(isWhiteSpace(' ')).to.be.true;
    });

    it('should return true for tab character', () => {
      expect(isWhiteSpace('\t')).to.be.true;
    });

    it('should return false for letter character', () => {
      expect(isWhiteSpace('a')).to.be.false;
    });
  });

  describe('isClose', () => {
    it('should return true for same values', () => {
      expect(isClose(4.5, 4.5)).to.be.true;
    });

    it('should return true for values that are closer that 1 screen unit', () => {
      expect(isClose(5.1, 5.75)).to.be.true;
    });

    it('should return false for values that differ in 1 screen unit', () => {
      expect(isClose(5, 6)).to.be.false;
    });

    it('should return false for values that differ in more thatn 1 unit', () => {
      expect(isClose(-1, 1)).to.be.false;
    });
  });

  describe('getDirection', () => {
    let first: HTMLSpanElement;
    let second: HTMLSpanElement;

    beforeEach(() => {
      first = document.createElement('span');
      second = document.createElement('span');
    });

    it('should return undefined for index below zero', () => {
      expect(getDirection(-1, [first, second])).to.be.undefined;
    });

    it('should return undefined for index larger than length', () => {
      expect(getDirection(4, [first, second])).to.be.undefined;
    });

    it('should return undefined for index equal to length', () => {
      expect(getDirection(2, [first, second])).to.be.undefined;
    });

    it('should return undefined for index equal to 0', () => {
      expect(getDirection(0, [first, second])).to.be.undefined;
    });

    it('should return ltr if previous character is to the left and close', () => {
      stub(first, getBoundingClientRectMethod).returns({left: 10, right: 12.3});
      stub(second, getBoundingClientRectMethod).returns({left: 12.4, right: 20});

      expect(getDirection(1, [first, second])).to.be.equal('ltr');
    });

    it('should return undefined if previous character is to the left but far', () => {
      stub(first, getBoundingClientRectMethod).returns({left: 10, right: 11.3});
      stub(second, getBoundingClientRectMethod).returns({left: 12.4, right: 20});

      expect(getDirection(1, [first, second])).to.be.undefined;
    });

    it('should return rtl if previous character is to the right and close', () => {
      stub(first, getBoundingClientRectMethod).returns({left: 30, right: 32.3});
      stub(second, getBoundingClientRectMethod).returns({left: 21.5, right: 29.4});

      expect(getDirection(1, [first, second])).to.be.equal('rtl');
    });

    it('should return undefined if previous character is to the right but far', () => {
      stub(first, getBoundingClientRectMethod).returns({left: 30, right: 32.3});
      stub(second, getBoundingClientRectMethod).returns({left: 21.5, right: 23.4});

      expect(getDirection(1, [first, second])).to.be.undefined;
    });
  });

  describe('getGroupStartIndices', () => {
    it('should return empty array for empty array of groups', () => {
      const inds = getGroupStartIndices([]);

      expect(inds).to.deep.equal([]);
    });

    it('should return zero for one group', () => {
      const inds = getGroupStartIndices([{text: ['a']}]);

      expect(inds).to.deep.equal([0]);
    });

    it('should return correct indices for multiple groups', () => {
      const inds = getGroupStartIndices([
        {text: ['a', 'b']},
        {text: ['c', 'd', 'e', 'f']},
        {text: ['g', 'h', 'i']},
        {text: ['k']}
      ]);

      expect(inds).to.deep.equal([0, 2, 6, 9]);
    });
  });

  describe('createSpansForCharacters', () => {
    let parentSpan: HTMLSpanElement;

    beforeEach(() => {
      parentSpan = document.createElement('span');
    });

    it('should return empty array for empty text', () => {
      const spans = createSpansForCharacters([], parentSpan);

      expect(spans).to.deep.equal([]);
    });

    it('should return spans for each character in text', () => {
      const spans = createSpansForCharacters(['a', 'b', 'c', 'd'], parentSpan);

      expect(spans[0].innerText).to.equal('a');
      expect(spans[1].innerText).to.equal('b');
      expect(spans[2].innerText).to.equal('c');
      expect(spans[3].innerText).to.equal('d');
      expect(spans.every(span => span.parentElement === parentSpan)).to.be.true;
    });
  });

  describe('createSpansForGroups', () => {
    let parentSpan: HTMLSpanElement;

    beforeEach(() => {
      parentSpan = document.createElement('span');
    });

    it('should return empty array for empty array of groups', () => {
      const spans = createSpansForGroups([], parentSpan);

      expect(spans).to.deep.equal([]);
    });

    it('should return spans for each group', () => {
      const spans = createSpansForGroups([
        {text: ['a', 'b', 'c', 'd']},
        {text: ['e']},
        {text: ['f', 'g']}
      ], parentSpan);

      expect(spans[0].innerText).to.equal('abcd');
      expect(spans[1].innerText).to.equal('e');
      expect(spans[2].innerText).to.equal('fg');
      expect(spans.every(span => span.parentElement === parentSpan)).to.be.true;
    });
  });

  describe('calculateTotalLength', () => {
    it('should return 0 for empty group array', () => {
      expect(calculateTotalLength([])).to.be.equal(0);
    });

    it('should return length of group for one group', () => {
      expect(calculateTotalLength([
        {text: [], direction: 'ltr', startIndex: 0, xmin: -1, xmax: 4}
      ])).to.be.equal(5);
    });

    it('should return total length of groups', () => {
      expect(calculateTotalLength([
        {text: [], direction: 'ltr', startIndex: 0, xmin: -1, xmax: 4},
        {text: [], direction: 'rtl', startIndex: 0, xmin: 4, xmax: 25},
        {text: [], direction: 'ltr', startIndex: 0, xmin: 25, xmax: 34},
        {text: [], direction: 'rtl', startIndex: 0, xmin: 34, xmax: 48}
      ])).to.be.equal(49);
    });
  });

  describe('putInternalPositions', () => {
    const identicalPos = (pos: number) => pos;
    let span: HTMLSpanElement;

    beforeEach(() => {
      span = document.createElement('span');
    });

    it('should do nothing if the text is empty', () => {
      const cursorPositions = [-10, -10, -10];
      putInternalPositions([], span, cursorPositions, 0, identicalPos, identicalPos);

      expect(cursorPositions).to.deep.equal([-10, -10, -10]);
    });

    it('should do nothing if the text contains one character', () => {
      const cursorPositions = [-10, -10, -10];
      putInternalPositions(['a'], span, cursorPositions, 0, identicalPos, identicalPos);

      expect(cursorPositions).to.deep.equal([-10, -10, -10]);
    });

    it('should add one position if the text contains two characters', () => {
      const cursorPositions = [-10, -10, -10];
      putInternalPositions(['a', 'b'], span, cursorPositions, 0, pos => pos + 15, identicalPos);

      expect(cursorPositions).to.deep.equal([-10, 15, -10]);
    });

    it('should add multiple positions if the the text contains multiple characters', () => {
      const cursorPositions = [-10, -10, -10, -10, -10, -10, -10];
      const getRectStub = stub(span, getBoundingClientRectMethod);
      getRectStub.onCall(0).returns({left: 10, right: 20});
      getRectStub.onCall(1).returns({left: 10, right: 30});
      getRectStub.onCall(2).returns({left: 10, right: 40});
      getRectStub.onCall(3).returns({left: 10, right: 50});
      getRectStub.onCall(4).returns({left: 10, right: 60});

      putInternalPositions(['a', 'b', 'c', 'd', 'e', 'f'], span, cursorPositions, 0,
        pos => pos + 15, identicalPos);

      expect(cursorPositions).to.deep.equal([-10, 25, 35, 45, 55, 65, -10]);
    });

    it('should add multiple positions if the the text contains multiple characters and apply limiter', () => {
      const cursorPositions = [-10, -10, -10, -10, -10, -10, -10];
      const getRectStub = stub(span, getBoundingClientRectMethod);
      getRectStub.onCall(0).returns({left: 10, right: 20});
      getRectStub.onCall(1).returns({left: 10, right: 30});
      getRectStub.onCall(2).returns({left: 10, right: 40});
      getRectStub.onCall(3).returns({left: 10, right: 50});
      getRectStub.onCall(4).returns({left: 10, right: 60});

      putInternalPositions(['a', 'b', 'c', 'd', 'e', 'f'], span, cursorPositions, 0,
        pos => pos + 15, pos => Math.min(pos, 53));

      expect(cursorPositions).to.deep.equal([-10, 25, 35, 45, 53, 53, -10]);
    });
  });
});
