#!/usr/bin/env bash
set -e
CHALK="`yarn bin`/chalk"
BASEDIR=$(dirname $0)
ROOT=$BASEDIR/../..

diff=$($BASEDIR/_get_changed_ts.sh)
if [ "" == "$diff" ]; then
  $CHALK --no-stdin -t "{blue ...no changes found. Done.}"
  exit 0
fi
FILE_COUNT=$(echo $diff | wc -w | sed -e s/[^0-9]//g)
$CHALK --no-stdin -t "{blue TSLinting $FILE_COUNT files…}"
tslint -c $ROOT/build/tslint/base.json $@ $diff
