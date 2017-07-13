require('./lessLoaderProxy');
require('jsdom-global')();
require('babel-register')({
  retainLines: true,
});

// Stubbing of requestAnimationFrame and cancelAnimationFrame
require('raf-stub').replaceRaf([window, global]);

const chai = require('chai');

global.expect = chai.expect;
