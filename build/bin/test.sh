#!/usr/bin/env bash
set -e

node --max-old-space-size=4096 \
node_modules/.bin/karma \
start \
./build/karma/wc/all.js \
$@
