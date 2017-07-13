#!/usr/bin/env bash
set -e

# DEBUG=echo
$DEBUG rm -rf .git
$DEBUG git init
$DEBUG git clean -dfx --exclude=node_modules
$DEBUG git config credential.helper store
$DEBUG echo "https://$BITBUCKET_USER:$BITBUCKET_PASSWORD@bitbucket.org" > ~/.git-credentials
$DEBUG git remote add origin "https://bitbucket.org/atlassian/atlaskit.git"
$DEBUG git fetch origin
$DEBUG git reset $BITBUCKET_COMMIT --hard
$DEBUG git branch --set-upstream-to origin/$BITBUCKET_BRANCH
$DEBUG git config --global user.email "$BOT_ACCOUNT_EMAIL"
$DEBUG git config --global user.name "$BOT_ACCOUNT_NAME"
$DEBUG git config --global push.default simple
$DEBUG git fetch --tags
$DEBUG git fsck --full

$DEBUG npm set //registry.npmjs.org/:_authToken=$NPM_ATLASKIT_TOKEN