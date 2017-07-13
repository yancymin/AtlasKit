#!/usr/bin/env bash
set -e

BIN_PATH=$(yarn bin)
LERNA_LOC="$BIN_PATH/lerna"
CHALK="$BIN_PATH/chalk"

# check that a scope was passed in (lerna supports globs for the --scope flag)
if [[ $# -eq 0 || "$1" == "" ]]
  then
    $CHALK --no-stdin -t "{red No scope given}"
    exit 1
fi

PKG="$1"

# shift removes first command line arg (the package name) so that we can pass the rest of the args
shift || true

# clean the package(s) first
$CHALK --no-stdin -t "{blue Cleaning package(s) for bootstraping}"
$LERNA_LOC exec --scope "$PKG" $@ -- git clean -Xdf .

# then bootstrap it (passing on extra args for things like --include-filtered-dependencies)
$CHALK --no-stdin -t "{blue bootstraping package(s)}"
$LERNA_LOC bootstrap --scope "$PKG" $@
