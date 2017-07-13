#!/usr/bin/env bash
set -e

/BrowserStackLocal --key $BROWSERSTACK_KEY --localIdentifier $BITBUCKET_COMMIT --daemon stop
