import { expect } from 'chai';
import {
  getCardMinHeight,
  minSmallCardDimensions,
  minImageCardDimensions,
  defaultHorizontalCardDimensions,
  defaultSquareCardDimensions
} from '../../../src/utils';

describe('cardDimensions.ts', () => {
  describe('getCardMinHeight', () => {
    it('should return small min height if no appearance passed', () => {
      expect(getCardMinHeight()).to.be.equal(minSmallCardDimensions.height);
    });

    it('should return right height for each appearance', () => {
      expect(getCardMinHeight('auto')).to.be.equal(minSmallCardDimensions.height);
      expect(getCardMinHeight('small')).to.be.equal(minSmallCardDimensions.height);
      expect(getCardMinHeight('image')).to.be.equal(minImageCardDimensions.height);
      expect(getCardMinHeight('horizontal')).to.be.equal(defaultHorizontalCardDimensions.height);
      expect(getCardMinHeight('square')).to.be.equal(defaultSquareCardDimensions.height);
    });
  });
});
