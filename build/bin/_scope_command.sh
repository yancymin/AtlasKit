#!/usr/bin/env bash
set -e

LERNA_LOC="`yarn bin`/lerna"
CHALK="`yarn bin`/chalk"

if [[ $# -eq 0 || "$1" == "" ]]
  then
    $CHALK --no-stdin -t "{red No scope given}"
    exit 1
fi

if [[ $# -eq 1 || "$1" == "" ]]
  then
    $CHALK --no-stdin -t "{red No command given}"
    exit 1
fi
package=$1
command=$2

$LERNA_LOC exec --scope $package -- $command
