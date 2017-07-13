module.exports = (config, pattern, excludePattern) => {
  config.set({
    files: [pattern],
    preprocessors: {
      [pattern]: ['webpack', 'sourcemap'],
    },
  });
  if (excludePattern) {
    config.set({
      exclude: [excludePattern],
    });
  }
};
