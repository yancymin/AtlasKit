#!/usr/bin/env bash
set -e

node \
./node_modules/.bin/karma \
start \
./build/karma/react/all.watch.js \
$@
