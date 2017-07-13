#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
BASEDIR=$(dirname $0)
popd > /dev/null

PKG=$($BASEDIR/_get_package_name.sh)

yarn link
pushd ../.. > /dev/null
yarn link $PKG
popd > /dev/null
