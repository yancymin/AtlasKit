#!/usr/bin/env node
const fs = require('fs');
const minilog = require('minilog');
const HipChatNotifier = require('hipchat-msg').HipChatNotifier;

const log = minilog('release/announce');
minilog.enable();

const RELEASED_PACKAGES_FILE = '.released-packages';

const {
  HIPCHAT_DESIGN_PLATFORM_AUTH_TOKEN: AUTH_TOKEN,
  HIPCHAT_DESIGN_PLATFORM_ROOM_ID: ROOM_ID,
  CDN_URL_SCOPE,
  CDN_URL_BASE,
  BITBUCKET_REPO_OWNER: REPO_OWNER,
  BITBUCKET_REPO_SLUG: REPO_SLUG,
  BITBUCKET_COMMIT: COMMIT,
  BITBUCKET_BRANCH: BRANCH,
} = process.env;

if (!AUTH_TOKEN || !ROOM_ID || !CDN_URL_SCOPE || !CDN_URL_BASE) {
  log.error('env variables missing!');
  process.exit(1);
}

/**
* Generates a URL to a package in the registry, such as:
* http://aui-cdn.atlassian.com/atlaskit/registry/ak-avatar/2.3.1/
*
* @param {String} pkg The package name
* @param {String} version The package version
* @return {String} the URL to the package with the given version in the registry
*/
function generatePackageUrl(pkg, version) {
  const simplePkg = pkg.replace('@atlaskit/', '');
  return `${CDN_URL_BASE}/${CDN_URL_SCOPE}/registry/${simplePkg}/${version}/`;
}

/**
* Generates a URL to a package in npm, such as:
* https://www.npmjs.com/package/ak-avatar
*
* @param {String} pkg The package name
* @return {String} the URL to the package on npmjs.com
*/
function generateNpmUrl(pkg) {
  return `https://www.npmjs.com/package/${pkg}`;
}

/**
* Generates a URL to a package on unpkg.com, such as:
* https://unpkg.com/@atlaskit/avatar
*
* @param {String} pkg The package name
* @return {String} the URL to the package on unpkg.com
*/
function generateUnpkgUrl(pkg) {
  return `https://unpkg.com/${pkg}/`;
}

/**
* Generates a URL to the storybook of a package at a specific version.
* https://aui-cdn.atlassian.com/atlaskit/stories/ak-avatar/2.3.1/
*
* @param {String} pkg The package name
* @param {String} version The package version
* @return {String} the URL to the storybook of the package on the registry
*/
function generateStorybookUrl(pkg, version) {
  return `${CDN_URL_BASE}/${CDN_URL_SCOPE}/stories/${pkg}/${version}/`;
}

let releasesFileContents = '';

function logReleasedFiles() {
  log.info(`
#########################################
# The following packages were released: #
#########################################

${releasesFileContents}
  `);
}

if (fs.existsSync(RELEASED_PACKAGES_FILE)) {
  releasesFileContents = fs.readFileSync(RELEASED_PACKAGES_FILE, { encoding: 'utf8' });
}

if (releasesFileContents.trim() === '') {
  log.info('No release happened, no need to bug the AtlasKit guys :)');
  process.exit(0);
}

/* The packages file has the following format:
ak-avatar@0.12.5
ak-inline-dialog@62.0.0
ak-layer@50.0.0
akutil-component-template@3.0.11
akutil-polyfills@0.0.9
akutil-shared-styles@33.0.0
eslint-config-ak-base@1.1.2
*/
const changedPackages = releasesFileContents
  .split('\n')
  .map((line) => {
    // if `package@version` starts with a "@" symbol
    // this is a scoped package
    // TODO: this can be easier with a proper regexp
    if (line.startsWith('@')) {
      const lineChunks = line.substr(1).split('@');
      lineChunks[0] = `@${lineChunks[0]}`;

      return lineChunks;
    }

    return line.split('@');
  });

const buildLink = `https://bitbucket.org/${REPO_OWNER}/${REPO_SLUG}/commits/${COMMIT}?at=${BRANCH}`;
const message = `
Commit <a href="${buildLink}">${COMMIT}</a> gave us some fresh components:<br/>
<table>
  <tr>
    <th>Component</th>
    <th>Version</th>
    <th>Storybook</th>
    <th>NPM</th>
    <th>Unpkg</th>
  </tr>
${changedPackages.map(([name, version]) => `
  <tr>
    <td><a href="${generatePackageUrl(name, version)}">${name}</a></td>
    <td>${version}</td>
    <td><a href="${generateStorybookUrl(name, version)}">storybook</a></td>
    <td><a href="${generateNpmUrl(name)}">npm</a></td>
    <td><a href="${generateUnpkgUrl(name)}">unpkg</a></td>
  </tr>`).join('')}
</table>`;

try {
  const client = new HipChatNotifier({
    room: ROOM_ID,
    auth_token: AUTH_TOKEN,
    // NOTE: disableLogger here simply disables the custom logger that hipchat-msg uses
    // (which appears to have a bug in it).  It will fall back to console.error() in this case
    disableLogger: true,
  });

  // This will NOT throw an error to the surrounding try/catch block if the message does not get
  // sent correctly, so the message below should always be logged.
  client.message(message, {
    color: 'green',
  });

  logReleasedFiles();
} catch (e) {
  // Note that the client.message() call above does not throw an error if the message does not get
  // sent correctly, so this error will not be logged in that case.
  log.error(e.message);
  logReleasedFiles();
  process.exit(1);
}
