import { expect } from 'chai';
import { breakpointSize } from '../../../src/utils';

describe('breakpointSize', () => {
  const sizes = {
    small: 173,
    large: 300,
    xlarge: Infinity
  };

  it('should return right breakpoint name based on passed width', () => {
    expect(breakpointSize(200, sizes)).to.be.equal('large');
  });

  it('should return the first key as default value', () => {
    expect(breakpointSize(100, sizes)).to.be.equal('small');
  });

  it('should work with css pixel values', () => {
    expect(breakpointSize('175px', sizes)).to.be.equal('large');
    expect(breakpointSize('500px', sizes)).to.be.equal('xlarge');
  });
});
