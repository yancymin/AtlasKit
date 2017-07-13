module.exports = {
  "name": "@atlaskit/eslint-config-stories",
  "extends": "@atlaskit/eslint-config-base",
  "rules": {
    // http://eslint.org/docs/rules/no-console
    // Allowing the use of `console.*` in stories
    "no-console": "off",
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    // Allowing the use of dependencies that are not defined in package.json
    // We do this because packages can use dependencies from the root as well
    // as from other rolled up packages such eslint-config-base.
    "import/no-extraneous-dependencies": "off",
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
    // Allowing this so we can import file source using the !raw! loader as well
    // as the export of the module itself
    "import/no-duplicates": "off",
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
    // Allowing this lets us order the imports, including !raw! imports, in a way
    // that makes more sense for the examples
    "import/first": "off",
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
    // Disabling this so we don't have to add propTypes to everything in our
    // sample code; they're not always helpful to demonstrate component usage
    "react/prop-types": "off",
  }
};
