import { hasClass } from '../../src';

// eslint-disable-next-line mocha/no-skipped-tests
describe('hasClass', () => {
  let component;
  beforeEach(() => {
    component = document.createElement('div');
    document.body.appendChild(component);
  });
  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should return false with no arguments at all', () => {
    expect(hasClass()).toBe(false);
    expect(hasClass(false)).toBe(false);
    expect(hasClass(null)).toBe(false);
  });

  it('should return false if first argument is not a DOM Element', () => {
    expect(hasClass({})).toBe(false);
    expect(hasClass([])).toBe(false);
    expect(hasClass('')).toBe(false);
    expect(hasClass(1)).toBe(false);
  });

  describe('when component has no class', () => {
    it('should return true if no class provided', () =>
      expect(hasClass(component)).toBe(true)
    );

    it('should return false for any class provided', () =>
      expect(hasClass(component, 'foo')).toBe(false)
    );
  });

  describe('when component has one class', () => {
    beforeEach(() => component.classList.add('foo'));

    it('should return true if no class provided', () =>
      expect(hasClass(component)).toBe(true)
    );

    it('should return true for a known class', () =>
      expect(hasClass(component, 'foo')).toBe(true)
    );

    it('should return false for an unknown class', () =>
      expect(hasClass(component, 'test')).toBe(false)
    );
  });

  describe('when component has multiple classes', () => {
    beforeEach(() =>
      ['foo', 'bar', 'zee'].forEach(className =>
        component.classList.add(className)
      )
    );

    it('should return true for known class', () =>
      expect(hasClass(component, 'bar')).toBe(true)
    );

    it('should return true for multiple known classes', () =>
      expect(hasClass(component, 'bar', 'foo', 'zee')).toBe(true)
    );

    it('should return false for unknown classes', () =>
      expect(hasClass(component, 'bar', 'foo', 'wat')).toBe(false)
    );
  });
});
