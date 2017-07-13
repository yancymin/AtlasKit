import { checkVisibility, checkInvisibility } from '../../src';

// eslint-disable-next-line mocha/no-skipped-tests
describe('visible elements', () => {
  let div;

  beforeEach(() => {
    div = document.createElement('div');
    Object.defineProperties(div, {
      getBoundingClientRect: {
        value: () => ({ width: 1, height: 1 }),
      },
      offsetParent: {
        value: 1,
      },
    });
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.removeChild(div);
  });

  it('checkVisibility returns true', () => {
    expect(checkVisibility(div)).toBe(true);
  });

  it('checkInvisibility returns false', () => {
    expect(checkInvisibility(div)).toBe(false);
  });
});

// eslint-disable-next-line mocha/no-skipped-tests
describe('invisible elements', () => {
  let div;

  beforeEach(() => {
    div = document.createElement('div');
    Object.defineProperties(div, {
      getBoundingClientRect: {
        value: () => ({ width: 0, height: 0 }),
      },
      offsetParent: {
        value: null,
      },
    });
    document.body.appendChild(div);
  });

  it('checkVisibility returns false', () => {
    expect(checkVisibility(div)).toBe(false);
  });

  it('checkInvisibility returns true', () => {
    expect(checkInvisibility(div)).toBe(true);
  });
});
