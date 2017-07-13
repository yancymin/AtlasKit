#!/usr/bin/env bash
set -e

# Paths for binaries in our node_modules
BIN_PATH=$(yarn bin)
CHALK="$BIN_PATH/chalk"
LERNA_LOC="$BIN_PATH/lerna"

# Paths for our build scripts
BASEDIR=$(dirname $0)

# source build scripts to get functions from them
. $BASEDIR/_build_status.sh
. $BASEDIR/_cdn_publish_folder.sh

OUTDIR=$(mktemp -d)
BUILD_SPECIFIC_URL_PART="pr/$BITBUCKET_COMMIT/$CURRENT_BUILD_TIME/storybook"

# get list of changed packages which should have been outputted by generate.changed.packages.file.sh
CHANGED_PACKAGES=$(cat changed-packages)

$CHALK --no-stdin -t "{green -- Changed Packages --}"
echo "$CHANGED_PACKAGES"

function storybook_build_status() {
  build_status \
    "STORYBOOK" \
    "Storybook" \
    "The storybook for this pull request" \
    "$1" \
    "$CDN_URL_BASE/$CDN_URL_SCOPE/$BUILD_SPECIFIC_URL_PART/index.html"
}

function build_storybook() {
  local TARGET_PATH="$1"

  $CHALK --no-stdin -t "{blue Building storybook (PR)}"
  $LERNA_LOC exec --scope "$CHANGED_PACKAGES" --concurrency 2 -- ../../build/bin/storybook.static.pr.single.sh "$TARGET_PATH"
  $BASEDIR/generate.index.html.js $TARGET_PATH "PR storybook for ${BITBUCKET_COMMIT}" > "$TARGET_PATH/index.html"
}

storybook_build_status "INPROGRESS"
# if we had any changed packages (string is not empty)
if [ -n "$CHANGED_PACKAGES" ] ; then
  build_storybook "$OUTDIR"
  cdn_publish_folder "$OUTDIR" "$BUILD_SPECIFIC_URL_PART"
fi
storybook_build_status "SUCCESSFUL"
