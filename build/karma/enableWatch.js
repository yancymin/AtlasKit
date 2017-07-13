module.exports = (config) => {
  config.set({
    singleRun: false,
    autoWatch: true,
    reporters: ['mocha'],
    mochaReporter: {
      output: 'autowatch',
      showDiff: true,
    },
  });
};
