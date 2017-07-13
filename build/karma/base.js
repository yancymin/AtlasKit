const webpackConfig = require('../webpack/karma');

module.exports = (config) => {
  Object.assign(config, {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    // setting to process.cwd will make all paths start in current component directory
    basePath: process.cwd(),

    frameworks: ['mocha', 'chai', 'sinon'],

    webpack: webpackConfig,

    webpackMiddleware: {
      // Reduces verbosity significantly by skipping the output of >1000 lines on
      // the terminal. This is helpful in IDEs that have a constrained console buffer.
      stats: {
        chunks: false,
      },
    },

    mime: {
      'application/javascript': ['ts', 'tsx'],
    },

    reporters: ['spec'],

    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE, LOG_ERROR, LOG_WARN, LOG_INFO, LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Chrome', 'Firefox'],

    reportSlowerThan: 500, // default animation duration is 250ms

    // The default 10s is not adequate to handle the bundle size when lerna *does not* link
    // all the packages together. When lerna linking is not applied (for whatever reason)
    // deduping is not implicit, and bundle sizes are huge, which can take a significant amount
    // of time in CI.
    browserNoActivityTimeout: 100000,

    singleRun: true,

    concurrency: 20,

    mochaReporter: {
      showDiff: true,
    },
  });

  config.set({
    client: {
      mocha: {
        timeout: 6000, // avoid timeout on tests in VMs
      },
    },
  });
};
