module.exports = {
  "name": "@atlaskit/eslint-config-base",
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
  },
  "plugins": [
    "react",
    "prefer-object-spread",
    "compat",
  ],
  "rules": {
    // http://eslint.org/docs/rules/comma-dangle
    // Custom rules for when trailing comma's are required
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "ignore",
    }],

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    // When importing files you do not need to add file extensions for the following extensions
    "import/extensions": ["error", "always", {
      "js": "never",
      "jsx": "never",
      "ts": "never",
      "tsx": "never",
    }],

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md
    // Allow webpack loader syntax in imports.
    "import/no-webpack-loader-syntax": "off",

    // http://eslint.org/docs/rules/no-plusplus
    // Allowing ++ on numbers
    "no-plusplus": "off",

    // http://eslint.org/docs/rules/no-param-reassign
    // Cannot reassign function parameters but allowing modification
    "no-param-reassign": ["error", { "props": false }],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    // Allowing jsx in files with any file extension (old components have jsx but not the extension)
    "react/jsx-filename-extension": "off",

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
    // JSX props must be in alphabetical order
    // Disabled as this is creating too much noise in logs and is not being actively addressed
    "react/jsx-sort-props": "off",

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
    // This was turned off for wc - but should be re-enabled eventually
    "react/no-unknown-property": ["off"],

    // http://eslint.org/docs/rules/no-multiple-empty-lines
    // Disallow more than 1 empty lines
    "no-multiple-empty-lines": ["error", { "max": 1 }],

    // http://eslint.org/docs/rules/padded-blocks
    // Enforce no padding within blocks
    "padded-blocks": ["error", "never"],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
    // Adding 'skipShapeProps' as the rule has issues with correctly handling PropTypes.shape
    "react/no-unused-prop-types": ["error", { "skipShapeProps": true }],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    // Opt out of preferring stateless functions
    // Rationale: https://extranet.atlassian.com/display/AtlasKit/React+component+conventions
    "react/prefer-stateless-function": "off",

    // https://github.com/bryanrsmith/eslint-plugin-prefer-object-spread
    // Prefer spread {...} over Object.assign except for object modifications
    "prefer-object-spread/prefer-object-spread": "error",

    // http://eslint.org/docs/rules/no-restricted-properties
    "no-restricted-properties": ["error", {
        // Disabling the use of React.Component
        // Rationale: https://extranet.atlassian.com/display/AtlasKit/React+component+conventions
        "object": "React",
        "property": "Component",
        "message": "Please use PureComponent instead."
    }],

    // https://github.com/amilajack/eslint-plugin-compat
    // Error when violating browser compatibility
    "compat/compat": "error",

    // Disallowing the use of variables starting with `_` unless it called on `this`.
    // Allowed: `this._secret = Symbol()`
    // Not allowed: `const _secret = Symbol()`
    "no-underscore-dangle": ["error", { "allowAfterThis": true }],
  },
};
