const browserStackBrowsers = {
  // One old one
  internet_explorer_11: {
    browser: 'ie',
    os: 'WINDOWS',
    os_version: '8.1',
    browser_version: '11',
  },
  // TODO re-enable once BS has 55.0 beta out.
  // Look here: https://www.browserstack.com/list-of-browsers-and-platforms?product=automate
  /*
  chrome_beta_osx: {
    browser: 'Chrome',
    browser_version: '55.0 beta',
    os: 'OS X',
    os_version: 'El Capitan',
  },
  */

  // TODO re-enable when BS fixes browser version validation error
  /*
  firefox_beta_osx: {
    browser: 'Firefox',
    browser_version: '50.0 beta',
    os: 'OS X',
    os_version: 'El Capitan',
  },
  */
  // One with native WC support
  chrome_latest_osx: {
    browser: 'chrome',
    os: 'OS X',
    os_version: 'El Capitan',
  },
};

module.exports = browserStackBrowsers;
