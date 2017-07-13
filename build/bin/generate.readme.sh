#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
CHALK="`yarn bin`/chalk"
popd > /dev/null

NAME=$(node -e 'console.log(require("./package.json").name)')
VERSION=$(node -e 'console.log(require("./package.json").version)')
PREFIX="{white.bold [$NAME]}"

if [ -z "$BITBUCKET_COMMIT" ]; then
  BITBUCKET_COMMIT="master"
fi

$CHALK --no-stdin -t "{blue $PREFIX Generating README.md...}"

replacevars () {
    echo "$1" | \
    sed "s~@VERSION@~$VERSION~g" | \
    sed "s~@NAME@~$NAME~g" | \
    sed "s~@BITBUCKET_COMMIT@~$BITBUCKET_COMMIT~g"
}

# Get usage docs
if [ -f "docs/USAGE.md" ]; then
  USAGE=$(cat ./docs/USAGE.md)
  USAGE=$(replacevars "$USAGE")
else
  USAGE="# $NAME"
fi

# Create the buttons header
BUTTONS=$(cat ../../build/docs/templates/BUTTONS.md)
BUTTONS=$(replacevars "$BUTTONS")
# Create the support footer
SUPPORT=$(cat ../../build/docs/templates/SUPPORT.md)
SUPPORT=$(replacevars "$SUPPORT")

(
  echo "$BUTTONS"
  echo
  echo "$USAGE"
  echo
  echo "$SUPPORT"
  echo
) > README.md
