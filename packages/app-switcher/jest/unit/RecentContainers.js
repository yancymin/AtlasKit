import getRecentContainers from '../../src/items/recent-containers';
import { name } from '../../package.json';

const container = {
  name: 'Recent container',
  url: 'https://www.atlassian.com/#1',
  iconUrl: '',
  type: 'confluence-space',
};

describe(name, () => {
  it('should return null if there are no containers provided', () => {
    const items = getRecentContainers({}, false, []);

    expect(items).toBe(null);
  });

  it('should return null if there are no containers provided', () => {
    const items = getRecentContainers({}, true, [container]);

    expect(items).toBe(null);
  });
});
