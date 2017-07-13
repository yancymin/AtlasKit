/* eslint-disable no-console, no-multi-spaces */
const spawn = require('child_process').spawn;
const czLernaChangelog = require('cz-lerna-changelog');

const stdin = process.openStdin();
const updateChangelog = require('./src/updateChangelog');

function check(script, shouldShowStderr, cb, cbErr) {
  const spawned = spawn('npm', ['run', script, '--silent'], { stdio: 'inherit' });
  spawned.on('exit', (code) => {
    if (code === 0) {
      cb(code);
    } else {
      cbErr(code);
    }
  });
}

function getYN(yes = () => null, no = () => null) {
  const doYN = (d) => {
    const response = d.toString().trim();
    if (response.toLowerCase() === 'y') {
      yes();
    } else {
      no();
    }
    stdin.removeListener('data', doYN);
  };
  stdin.addListener('data', doYN);
}

const makeCustomQuestions = () => [
  {
    type: 'autocomplete',
    name: 'scope',
    message: 'Denote the scope of this change:',
    choices: [
      { value: 'component', name: 'component:   🔘 Changes that affect component code and behaviour' },
      { value: 'package',   name: 'package:     📦 Updated dependencies or changed package.json files' },
      { value: 'merge',     name: 'merge:       🔀 Commits related to a merge conflict resolution' },
      { value: 'refactor',  name: 'refactor:    🏡 Refactor a component' },
      { value: 'stories',   name: 'stories:     📙 Additions, removals or changes to a story' },
      { value: 'build',     name: 'build:       👷 Changes that affect the build – component or AtlasKit' },
      { value: 'docs',      name: 'docs:        📖 Changes related to component documentation' },
      { value: 'dummy',     name: 'dummy:       🔧 A placeholder commit with no real changes - usually to re-release a package' },
      { value: 'typings',   name: 'typings:     ✅ TypeScript definition changes' },
    ],
  },
];

module.exports = {
  prompter(cz, commit) {
    check('validate/lint-changed', false, () => {
      console.log('✓ Linting ok!');
      czLernaChangelog.makePrompter(makeCustomQuestions)(
        cz, responses => updateChangelog(responses, commit)
      );
    }, () => {
      console.log('✗ Linting failed');
      console.log('Do you want to try fixing automatically? (y/n): ');
      getYN(() => {
        check('validate/lint-changed/fix', true, () => {
          console.log('✓ Autofix ok');
          console.log('Try again by adding the changes and recommitting');
          process.exit(0);
        }, () => {
          console.log('✗ Autofix failed');
          console.log('Please resolve the linting problems manually');
          process.exit(1);
        });
      }, () => process.exit(0));
    });
  },
};
