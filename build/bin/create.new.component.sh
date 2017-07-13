#!/usr/bin/env bash
# Creates a new component under the packages directory using a template
# This is assumed to only be run from the `yarn run create` command from the root directory

set -e

CHALK="`yarn bin`/chalk"

if [[ $# -eq 0 || "$1" == "" ]]
  then
    $CHALK --no-stdin -t "{white Usage: yarn run create component_name}"
    exit 1
fi

COMP_NAME="$1"
PASCAL_CASE_NAME=$(./build/bin/pascal.case.js "$COMP_NAME" | sed "s/^Ak//")
CAMEL_CASE=$(./build/bin/camel.case.js "$COMP_NAME")

# TODO: Should we check the name to see if it looks namespaced? Hard code acceptable name spaces or
# base it on existing components?

# Check that a component of the same name doesn't exist
if [ -d "packages/$COMP_NAME" ]
  then
    $CHALK --no-stdin -t "{red Error: a component with that name already exists}"
    exit 1
fi

# Copy template files into packages directory
rm -rf packages/util-component-template/node_modules
cp -r "packages/util-component-template" "packages/$COMP_NAME"

# `find` is getting all the files under the new directory
# `xargs` is passing them to sed
# `sed` is replacing instances of 'util-component-template' and 'Toggle' with the new component name
# LC_CTYPE and LANG=C: http://stackoverflow.com/questions/19242275/re-error-illegal-byte-sequence-on-mac-os-x
LC_CTYPE=C && LANG=C && find "packages/$COMP_NAME/" -type f | xargs -I '{}' sed -i '' -e "s/util-component-template/${COMP_NAME}/g" -e "s/Toggle/${PASCAL_CASE_NAME}/g" -e "s/utilComponentTemplate/${CAMEL_CASE}/g" '{}'

pushd "packages/$COMP_NAME" > /dev/null

# Make sure our version for the new package is 1.0.0
sed -i '' 's/"version": "\([^"]*\)"/"version": "1.0.0"/' package.json

rm -f README.md
rm -f CHANGELOG.md

popd > /dev/null

# Install dependencies and link internal packages
yarn run bootstrap/single/with-deps "@atlaskit/$COMP_NAME"

$CHALK --no-stdin -t "{green New component '$COMP_NAME' created (v1.0.0)}"
$CHALK --no-stdin -t "{white.bold Hint: Please leave the version at 1.0.0+, as otherwise caret dependencies work differently}"
