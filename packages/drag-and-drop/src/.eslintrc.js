module.exports = {
  "extends": "@atlaskit/eslint-config-base",
  "rules": {
    // Allowing warning and error console logging
    "no-console": ["error", { allow: ["warn", "error"] }]
  }
};
