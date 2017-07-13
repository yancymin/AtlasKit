const axios = require('axios');
const semver = require('semver');

function getNpmMetadata(name) {
  const url = `http://registry.npmjs.org/${name.replace('/', '%2F')}`;
  return axios.get(url)
    .then(response => ({
      isPublished: true,
      versions: Object.keys(response.data.versions),
      publishedOn: response.data.time[semver.maxSatisfying(Object.keys(response.data.versions), '*')],
    }))
    .catch((error) => {
      if (!error || !error.response || error.response.status !== 404) {
        throw error;
      }

      return {
        isPublished: false,
        versions: [],
      };
    });
}

function getStorybooksMetadata(name, versions) {
  function storybookValid(version) {
    const url = `https://aui-cdn.atlassian.com/atlaskit/stories/${name}/${version}/`;

    return axios.get(url)
      .then(() => ({ version, valid: true }))
      .catch(() => ({ version, valid: false }));
  }

  return Promise.all(versions.map(storybookValid))
    .then(storybooks => ({
      validVersions: storybooks.filter(x => x.valid).map(x => x.version),
    })
  );
}

function getExternalMetadata(name) {
  const npm = getNpmMetadata(name);
  const storybook = npm.then(({ versions }) => getStorybooksMetadata(name, versions));
  return Promise.all([npm, storybook])
    .then(([npmMetadata, storybookMetadata]) => ({
      versions: npmMetadata.versions,
      storybooks: storybookMetadata.validVersions,
      isPublished: npmMetadata.versions.length > 0,
      lastPublishedOn: npmMetadata.publishedOn,
    }));
}

module.exports = getExternalMetadata;
