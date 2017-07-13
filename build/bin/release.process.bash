#!/usr/bin/env bash
LSR="./node_modules/.bin/lerna-semantic-release"

node ./build/bin/changelogs/markAllRelevantAsReleased.js && $LSR pre && yarn run docs && $LSR post && $LSR perform && echo "Released packages:" && touch .released-packages && cat .released-packages || exit 1
