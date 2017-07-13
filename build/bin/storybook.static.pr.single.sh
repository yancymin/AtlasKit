#!/usr/bin/env bash
set -e

# This script is run from inside each package using `lerna exec` (see the "storybook/static/pr") script
# It will put each storybook in a subfolder of @atlaskit/component
# (this will end up as two folders `@atlaskit` and `component` if scopes are used)
TARGET_PATH="$1"
PKG=$(../../build/bin/_get_package_name.sh)
SAFE_PKG=$(echo "$PKG" | sed -e "s/^@atlaskit\///")

cd ../..
yarn run storybook/static/single "$PKG" -- -o "$TARGET_PATH/$SAFE_PKG"
