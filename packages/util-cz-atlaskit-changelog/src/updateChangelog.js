/* eslint-disable no-console, no-multi-spaces */
const spawn = require('child_process').spawn;
const path = require('path');
const fs = require('fs');

// So special lines: First line is commit message core
// `affects:` for line telling you which package you need to add this to
// It looks like extra lines are included here
// `BREAKING CHANGE` line following will have the details
// ISSUES CLOSED: We could link the related issue but I'm voting now

const gitAddChangelogs = (pathNames) => {
  // we add all the changelogs in one `git add` command to prevent running multiple git operations
  // at once (very bad idea).
  console.log(`Adding changelogs to current commit by running \n\`git add ${pathNames.join(' ')}\``);

  return new Promise((resolve, reject) => {
    const spawned = spawn('git', ['add', ...pathNames]);
    spawned.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(code);
      }
    });
  });
};

const updateChangelog = (pathName, text, dirPath, packageName) => {
  let currentChangelog;
  try {
    currentChangelog = fs.readFileSync(pathName).toString();
  } catch (e) {
    try {
      fs.readdirSync(dirPath);
    } catch (er) {
      fs.mkdirSync(dirPath);
    }
    currentChangelog = `# ${packageName}\n\n## Unreleased\n\n`;
  }
  // find whether it has an unreleased section
  let splitOn = '\n*';
  let addBack = '\n## Unreleased\n\n';
  let post = '*';
  if (currentChangelog.indexOf('## Unreleased\n') > -1) {
    splitOn = '## Unreleased\n\n';
    addBack = '## Unreleased\n\n';
    post = '';
  }

  const newText = `${addBack}${text}${post}`;
  const splitReadme = currentChangelog.replace(splitOn, newText);

  return new Promise((resolve, reject) => {
    fs.writeFile(pathName, splitReadme, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
  // Find Unreleased or add it
  // Add text as dot point to at the top of unreleased notes OR make new dotpoint
  // at the top of notes
};

const getPackageNames = string => string.split(', ')
.map(t => t.split('@atlaskit/').filter(a => (a && a !== 'affects: ')))
.reduce((a, b) => a.concat(b), []);

const createPaths = packageName => getPackageNames(packageName)
// We can assume that we are in the correct directory when running this script.
.map(t => path.join(process.cwd(), `./packages/${t}/docs/`));

const getChangeType = (text) => {
  if (text.includes('BREAKING CHANGE:')) return 'breaking';
  if (text.includes('feat(')) return 'feature';
  if (text.includes('fix(')) return 'bug fix';
  return null;
};
// All the splitting text we are doing is busywork from setup
const splitText = (commitMessage) => {
  // Only changes that cause releases will be added to changelog
  const changeType = getChangeType(commitMessage);
  if (!changeType) return null;

  const parts = commitMessage.split(/\n/);
  // We know that the array will need at least three items, so we escape if this
  // expectation is not met. The third line is always the affected packages.
  if (!parts[2]) return null;
  // Breaking changes are denoted by a line of "BREAKING CHANGE:" then the actual change on the next
  // lines.
  const breakingIndex = parts.indexOf('BREAKING CHANGE:');

  const issuesClosed = parts.find(e => e.includes('ISSUES CLOSED: '))
    ? ` (${parts.find(e => e.includes('ISSUES CLOSED: ')).toLowerCase()})`
    : '';

  // The information about a breaking change is provided on the next line
  const breakingChange = breakingIndex >= 0 ? `* ${changeType}; ${parts[breakingIndex + 1]}\n` : '';
  const change = `* ${changeType}; ${parts[0].replace(/^.*?: /, '')}${issuesClosed}\n`;
  const dirPaths = createPaths(parts[2]);
  return {
    dirPaths,
    packageNames: getPackageNames(parts[2]),
    readmePaths: dirPaths.map(p => `${p}CHANGELOG.md`),
    text: breakingChange + change,
  };
};

const updateChangelogs = (commitMessage, commit) => {
  const readmeInfo = splitText(commitMessage);
  if (!readmeInfo) {
    console.log('No Changelog was generated for this commit.');
    return commit(commitMessage);
  }
  const updatedFiles = readmeInfo.readmePaths.map((pathName, i) => (
    updateChangelog(pathName, readmeInfo.text, readmeInfo.dirPaths[i], readmeInfo.packageNames[i])
  ));
  return Promise.all(updatedFiles)
    .then(() => gitAddChangelogs(readmeInfo.readmePaths))
    .then(() => commit(commitMessage))
    .catch((e) => {
      console.log('failed to write changelog. Change description will need to be manually added.', e);
      return commit(commitMessage);
    });
};

module.exports = updateChangelogs;
