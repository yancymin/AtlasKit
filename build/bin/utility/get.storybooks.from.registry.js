const axios = require('axios');

/*
  This package ss used to collect responses from attempting to reach each storybook in the registry
  It will return an array of objects in the form:
    { name, version, exists, url } where name is the packageName, exists is true if the storybook
      exists andurl is the url of the storybook.
*/

const BASE_STORIES_URL = 'https://aui-cdn.atlassian.com/atlaskit/stories/';

function getPackageStorybook(packageName, packageVersion) {
  const storybookURL = `${BASE_STORIES_URL}${packageName}/${packageVersion}/`;
  return axios.head(storybookURL)
    // If the promise resolved, the storybook is there
    .then(() => Promise.resolve({
      name: packageName,
      version: packageVersion,
      exists: true,
      url: storybookURL,
    }))
    // If it errored, we still resolve the promise so we can pass the packageName back
    .catch(() => Promise.resolve({
      name: packageName,
      version: packageVersion,
      exists: false,
      url: storybookURL,
    }));
}

/* Returns an array of reponses for the storybooks requested.
     packages should be an array of objects in the form { name, version }
*/
function getStorybooksFromRegistry(packages) {
  // we return once all the promises are resolved
  return Promise.all(packages.map(pkg => getPackageStorybook(pkg.name, pkg.version)));
}

module.exports = getStorybooksFromRegistry;
