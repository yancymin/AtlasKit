module.exports = {
  "name": "@atlaskit/eslint-config-tests",
  "extends": "@atlaskit/eslint-config-base",
  "env": {
    "mocha": true,
  },
  "globals": {
    "expect": false,  // will be defined globally, false prevents overriding them
    "sinon": false,
  },
  "plugins": [
    "mocha",
    "chai-expect",
  ],
  "rules": {
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/master/docs/rules/no-exclusive-tests.md
    // Disallow describe.only and it.only
    "mocha/no-exclusive-tests": "error",

    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/master/docs/rules/handle-done-callback.md
    // Disallow describe.skip and it.skip
    "mocha/no-skipped-tests": "error",

    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/master/docs/rules/handle-done-callback.md
    // Enforces handling of callbacks for async tests
    "mocha/handle-done-callback": "error",

    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/master/docs/rules/no-pending-tests.md
    // Disallow pending/unimplemented mocha tests
    "mocha/no-pending-tests": "error",

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    // Allowing the use of dependencies that are not defined in package.json
    // We do this because packages can use dependencies from the root as well
    // as from other rolled up packages such eslint-config-base.
    "import/no-extraneous-dependencies": "off",

    // https://github.com/Turbo87/eslint-plugin-chai-expect
    // Disallow `expect` calls without assertions.
    // Allow: expect(true).to.be.ok;
    // Disallow: expect(true);
    "chai-expect/missing-assertion": "error",

    // https://github.com/Turbo87/eslint-plugin-chai-expect
    // Disallow calling chai properties as functions
    // Allow supported syntax: `expect(true).to.be.ok;`
    // Disallow calling properties as functions: `expect(true).to.be.ok();`
    "chai-expect/terminating-properties": "error",
  },
};
