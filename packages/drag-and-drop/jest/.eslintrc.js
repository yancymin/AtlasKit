module.exports = {
  "extends": "@atlaskit/eslint-config-tests",
  "rules": {
    // Allowing warning and error console logging
    "no-console": ["error", { allow: ["warn", "error"] }]
  }
};
