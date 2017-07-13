#!/usr/bin/env bash
set -e

CHALK="`yarn bin`/chalk"
CDN_PREFIX="registry"
BASEDIR=$(dirname $0)
OUTDIR=$(mktemp -d)
. $BASEDIR/_build_status.sh
. $BASEDIR/_cf_invalidate.sh
. $BASEDIR/_cdn_publish_folder.sh

function registry_build_status() {
  build_status \
    "REGISTRY" \
    "Registry" \
    "The component registry" \
    "$1" \
    "$CDN_URL_BASE/$CDN_URL_SCOPE/$CDN_PREFIX/"
}

function install_registry_pkg() {
  # Note: unfortunately @atlassian scope is used on the public and private
  # npm registries, which is why we need to disable the .npmrc file
  # temporarily here.
  $CHALK --no-stdin -t "{blue Installing atlaskit-registry from Atlassian private npm}"
  mv .npmrc ._npmrc
  npm config set progress false
  npm set loglevel warn
  npm set @atlassian:registry https://npm-private-proxy.atlassian.io/
  npm set //npm-private-proxy.atlassian.io/:_authToken $NPM_TOKEN_ATLASSIAN_PRIVATE
  npm install @atlassian/atlaskit-registry@^3.4.4
  mv ._npmrc .npmrc
}

function build_registry() {
  install_registry_pkg

  local TARGET_PATH="$1"
  local REGISTRY_BIN=`npm bin`/ak-registry
  local REGISTRY_PATH=`npm root`/@atlassian/atlaskit-registry

  $CHALK --no-stdin -t "{blue Building registry}"
  pushd $REGISTRY_PATH > /dev/null
  NODE_ENV=production \
  BITBUCKET_PASS=$BITBUCKET_PW_READONLY \
  AK_REG_BUILD_DIR=$TARGET_PATH \
  $REGISTRY_BIN
  popd > /dev/null
}

registry_build_status "INPROGRESS"
build_registry "$OUTDIR"
cdn_publish_folder "$OUTDIR" "$CDN_PREFIX"
cf_invalidate "/atlaskit/registry/*"
registry_build_status "SUCCESSFUL"
