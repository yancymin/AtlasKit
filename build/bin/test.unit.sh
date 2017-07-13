#!/usr/bin/env bash
set -e

###################################################################################
## The first command line argument to this script will be used as a package name to run in
## Any others passed after that will be passed to mocha itself
##  example: yarn run test/unit avatar --watch
###################################################################################

echo $1
echo $2

# if a packagename is passed in, we'll use that, otherwise use the * to run in all packages
if [[ -z "$1" ]]; then
  PKG='*'
else
  PKG="$1"
  # shift removes the first CL argument so we can pass the rest to mocha
  shift || true
fi

export NODE_ENV="test"
mocha --colors --require test-setup "packages/$PKG/test/unit/**/*.js"  --timeout 10000 $@
