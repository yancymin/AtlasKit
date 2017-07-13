const path = require('path');

const { rootDir, tsConfigFile, testSetupDir } = (() => {
  const cwd = process.cwd();

  if (cwd.match(/packages/)) {
    const repoRoot = path.join(cwd.split('packages')[0]);

    return {
      rootDir: cwd,
      tsConfigFile: path.join(cwd, 'tsconfig.json'),
      testSetupDir: path.join(repoRoot, 'test-setup'),
    };
  }

  return {
    rootDir: cwd,
    tsConfigFile: path.join(cwd, 'build/types/tsconfig.base.json'),
    testSetupDir: path.join(cwd, 'test-setup'),
  };
})();

module.exports = {
  rootDir,

  testRegex: '\\/jest\\/unit\\/[^_].*\\.(j|t)sx?$',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFiles: [`${testSetupDir}/jestSetup.js`],

  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest/preprocessor',
  },

  moduleNameMapper: {
    '\\.(less|css)$': 'identity-obj-proxy',
    '\\.svg$': `${testSetupDir}/EmptyJsxMock.js`,
  },

  // let Jest transform Typescript files inside ./node_modules/@atlaskit/* since our packages are
  // only built on CI (if we changed this this it would dramatically increase the speed of our test
  // runs)
  transformIgnorePatterns: ['\\/node_modules\\/(?!@atlaskit)'],

  globals: {
    'ts-jest': {
      tsConfigFile,
      // we can safely disable babel for perf improvements since we don't use synthetic imports
      // @see https://github.com/kulshekhar/ts-jest#supports-synthetic-modules
      skipBabel: true,
    },
  },
};
