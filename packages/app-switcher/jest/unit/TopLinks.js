import getTopLinks from '../../src/items/top-links';
import { name } from '../../package.json';

describe(name, () => {
  it('should return null if the user is anonymous', () => {
    const result = getTopLinks({}, true, true, true);

    expect(result).toBe(null);
  });

  it('should return null if neither home link nor site admin link is enabled', () => {
    const result = getTopLinks({}, false, false, false);

    expect(result).toBe(null);
  });

  it('should return Home link item when it is enabled', () => {
    const result = getTopLinks({}, false, true, false);

    expect(result).not.toBe(null);
    expect(result.items).not.toBe(null);
    expect(result.items.length).toBe(1);
    expect(result.items[0].href).toBe('/home');
  });

  it('should return Site Admin link item when it is enabled', () => {
    const result = getTopLinks({}, false, false, true);

    expect(result).not.toBe(null);
    expect(result.items).not.toBe(null);
    expect(result.items.length).toBe(1);
    expect(result.items[0].href).toBe('/admin');
  });

  it('should return both Home and Site Admin links item when they are enabled', () => {
    const result = getTopLinks({}, false, true, true);

    expect(result).not.toBe(null);
    expect(result.items).not.toBe(null);
    expect(result.items.length).toBe(2);
    expect(result.items[0].href).toBe('/home');
    expect(result.items[1].href).toBe('/admin');
  });
});
