#!/usr/bin/env bash
set -e

function build_status() {
  if [[ -n "$BITBUCKET_COMMIT" ]]; then
    GITHEAD_SHORT=$(git rev-parse --short HEAD)
    BUILD_KEY="$1-$GITHEAD_SHORT"
    BUILD_NAME="$2"
    BUILD_DESCRIPTION="$3"
    STATE="$4"
    BUILD_URL="$5"
    URL_PARAM=""
    if [[ -n "$BUILD_URL" ]]; then
      URL_PARAM="--url $BUILD_URL"
    fi

    CHALK="`yarn bin`/chalk"
    $CHALK --no-stdin -t "{blue Post build in '$STATE' status}"

    bbuild \
    --commit "$BITBUCKET_COMMIT" \
    --repo "$BITBUCKET_REPO_SLUG" \
    --owner "$BITBUCKET_REPO_OWNER" \
    --username "$BITBUCKET_USER" \
    --password "$BITBUCKET_PASSWORD" \
    --key "$BUILD_KEY" \
    --name "$BUILD_NAME" \
    --description "$BUILD_DESCRIPTION" \
    $URL_PARAM \
    --state "$STATE" 1> /dev/null

    if [[ "$STATE" == "FAILED" ]]; then
      exit 1
    fi
  fi
}
