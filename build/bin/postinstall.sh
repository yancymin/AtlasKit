#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
BIN_PATH=$(yarn bin)
LERNA_LOC="$BIN_PATH/lerna"
PSA="$BIN_PATH/psa"
CHALK="$BIN_PATH/chalk"
VALIDATE_LOC="$BIN_PATH/validate-commit-msg"

$CHALK --no-stdin -t "{blue Linking local eslint-configs...}"
node $BASEDIR/link.eslint.configs.js

if [[ -z "$BITBUCKET_COMMIT" ]]; then
  $CHALK --no-stdin -t "{blue Installing hooks...}"
  node $BASEDIR/pre-commit.install.js
  $VALIDATE_LOC
fi

# check if we are running in CI (BITBUCKET_COMMIT will exist in CI)
if [[ "$BITBUCKET_COMMIT" != "" ]]; then
  # piping to cat is used to put stdout in a non-TTY mode (hides the progress bar)
  $LERNA_LOC bootstrap | cat
  # we test PIPESTATUS here to know if they previous command failed
  test ${PIPESTATUS[0]} -eq 0
else
  # Need to bootstrap @atlaskit/util-cz-atlaskit-changelog so that we can run commitizen (hide the output as it's pretty noisy)
  $CHALK --no-stdin -t "{blue Bootstrapping @atlaskit/util-cz-lerna-changelog for commitizen}"
  yarn run bootstrap/single @atlaskit/util-cz-atlaskit-changelog > /dev/null

  # Also need to bootstrap icons because bootstrap/single/with-deps wont pick it up
  $CHALK --no-stdin -t "{blue Bootstrapping @atlaskit/icon...}"
  # $LERNA_LOC bootstrap --scope=@atlaskit/icon > /dev/null
  yarn run bootstrap/single @atlaskit/icon > /dev/null


  $CHALK --no-stdin -t "{green ~~~~~~~~~~~~~~~~~~~~~~~~~~~~}"
  $CHALK --no-stdin -t "{green ~~ SUCCESSFULLY INSTALLED ~~}"
  $CHALK --no-stdin -t "{green ~~~~~~~~~~~~~~~~~~~~~~~~~~~~}"
  echo ""
  $CHALK --no-stdin -t "{green You can now bootstrap the packages using one of the following commands}"
  echo ""
  $CHALK --no-stdin -t "{green \`yarn run bootstrap\` - Installs and links all packages}"
  $CHALK --no-stdin -t "{green \`yarn run bootstrap/single @atlaskit/packageName\` - Installs and links a single package}"
  $CHALK --no-stdin -t "{green \`yarn run bootstrap/single/with-deps @atlaskit/packageName\` - Installs and links a single package and all depdendencies of that package}"

  $PSA
fi
