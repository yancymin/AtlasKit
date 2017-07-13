#!/usr/bin/env bash
set -e

karma \
start \
./build/karma/wc/all.watch.js \
$@
