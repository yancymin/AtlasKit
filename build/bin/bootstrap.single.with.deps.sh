#!/usr/bin/env bash
set -e

# This wrapper script just exists to pass the --include-filtered-dependencies flag to the
# bootstrap.single script because adding args from the package.json scripts adds them to the front
# instead of the back

BASEDIR=$(dirname $0)
$BASEDIR/bootstrap.single.sh "$1" --include-filtered-dependencies
