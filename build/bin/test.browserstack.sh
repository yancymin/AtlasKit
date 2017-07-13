#!/usr/bin/env bash
set -e

MAX_RETRIES=2
GITHEAD_SHORT=$(git rev-parse --short HEAD)
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
CHALK="`yarn bin`/chalk"

# Run the Browserstack tests
echo
$CHALK --no-stdin -t "{blue Running browserstack test with all stages}"
echo
GITHEAD_SHORT="$GITHEAD_SHORT" \
CURRENT_BRANCH="$CURRENT_BRANCH" \
retry \
--retries=$MAX_RETRIES \
-- \
node --max-old-space-size=4096 node_modules/.bin/karma start \
./build/karma/browserstack/browserstackAll.js
