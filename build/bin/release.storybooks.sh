#!/usr/bin/env bash
set -e

BIN_PATH=$(yarn bin)
LERNA="$BIN_PATH/lerna"
CHALK="$BIN_PATH/chalk"
CDN_PREFIX="stories"
BASEDIR=$(dirname $0)
. $BASEDIR/_build_status.sh
. $BASEDIR/_cf_invalidate.sh
. $BASEDIR/_cdn_publish_folder.sh

function storybooks_build_status() {
  build_status \
    "SBOOKS" \
    "Storybooks" \
    "The component storybooks" \
    "$1" \
    "$CDN_URL_BASE/$CDN_URL_SCOPE/registry/"
}

function build_storybooks() {
  $CHALK --no-stdin -t "{blue getting released packages}"
  # The .released-packages file is created by `lerna-semantic-release perform` and contains a list of all the released packages
  RELEASED_PACKAGES_RAW=$(cat ./.released-packages)
  # we pass that to get_released_packages_glob.js to get a glob we can pass to lerna
  RELEASED_PACKAGES_GLOB=$($BASEDIR/get_released_packages_glob.js "$RELEASED_PACKAGES_RAW")

  $CHALK --no-stdin -t "{blue Building storybooks}"
  rm -rf ./stories
  $LERNA exec --concurrency=1 --scope="$RELEASED_PACKAGES_GLOB" -- ../../build/bin/storybook.static.registry.sh
}

storybooks_build_status "INPROGRESS"
build_storybooks

if [ -d "stories" ]; then
    cdn_publish_folder "./stories" "$CDN_PREFIX"
    cf_invalidate "/atlaskit/stories/*"
else
    $CHALK --no-stdin -t "{blue Skipping storybook publishing since no stories/ dir}"
fi

storybooks_build_status "SUCCESSFUL"
