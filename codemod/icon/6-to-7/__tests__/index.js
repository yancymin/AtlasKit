/* global jest, describe, it */

jest.autoMockOff();
const runTest = require('jscodeshift/dist/testUtils').runTest;

const testFixtures = {
  IgnoresCorrectImports: 'ignores correct imports',
  IgnoresNotIcon: 'ignores imports which don\'t import icon',
  TransformsImportsFromLib: 'transforms imports from /lib',
  TransformsNamedImportsFromRoot: 'transforms named imports from the root component',
  HandlesDefaultAndNamedImports: 'handles combined default and named imports from the root component',
  HandlesRenamedNamedImports: 'handles named imports which are renamed locally',
  RetainsComments: 'retains comments',
  ResolvesAllIconsCorrectly: 'resolves all existing icons in our library correctly and guesses any it doesn\'t know',
};

describe('codemod/icon/7', () => {
  Object.keys(testFixtures).forEach(key => (
    it(testFixtures[key], () => runTest(__dirname, 'index', null, key))
  ));
});
