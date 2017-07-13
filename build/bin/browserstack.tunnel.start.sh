#!/usr/bin/env bash
set -e

/BrowserStackLocal --key $BROWSERSTACK_KEY --localIdentifier $BITBUCKET_COMMIT --force --force-local --only-automate --parallel-runs 5 --daemon start
