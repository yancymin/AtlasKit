import getSuggestedApplication from '../../src/items/suggested-application';
import { name } from '../../package.json';

const exampleApp = {
  show: true,
  application: 'confluence',
  url: 'https://www.atlassian.com',
};

describe(name, () => {
  it('should return null if show is set to false', () => {
    const item = getSuggestedApplication({}, false, exampleApp, true);

    expect(item).toBe(null);
  });

  it('should return null if the user is anonymous', () => {
    const item = getSuggestedApplication({}, true, exampleApp, false);

    expect(item).toBe(null);
  });
});
