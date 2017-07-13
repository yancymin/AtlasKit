#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
CHALK="`yarn bin`/chalk"
popd > /dev/null

$CHALK --no-stdin -t "{blue Generating UMD bundle...}"
webpack --config ../../build/webpack/production-umd.js $@

$CHALK --no-stdin -t "{blue Generating CJS bundle...}"
webpack --config ../../build/webpack/production-cjs.js $@
