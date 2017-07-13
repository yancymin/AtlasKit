#!/usr/bin/env bash
set -e

# Find all tsconfig.json files.
#
# The premise is that we want to test compilation use *all* tsconfig.json files, as different
# configs are used for ES5 vs ES2015.
#
# Example output:
#
#     ./build/es2015/tsconfig.json
#     ./build/es5/tsconfig.json
#     ./tsconfig.json
#
TSCONFIGS=`find . -path ./node_modules -prune -o -maxdepth 3 -name tsconfig.json -print`

for TSCONFIG in $TSCONFIGS; do
  # The first part is for Linux. This command will fail on Darwin (Mac OS X) with error status code
  # 1 responding with "usage: ...". That's why we ignore stderr and instead then execute the Mac
  # variant.
  #
  # See https://unix.stackexchange.com/a/84980
  OUTDIR=`mktemp -d 2>/dev/null || mktemp -d -t 'outDir'`

  # Ensure that the output directory is cleaned up in both graceful and non-graceful termination.
  function cleanup {
    rm -rf "$OUTDIR"
  }
  trap cleanup EXIT

  # Compile the project, specifically dumping the output in $OUTDIR.
  ../../node_modules/.bin/tsc -p "$TSCONFIG" --outDir "$OUTDIR"
  cleanup
done
