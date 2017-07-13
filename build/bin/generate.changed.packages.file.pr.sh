#!/usr/bin/env bash
set -e

# This script creates a file with a list of all the packages that have changed between the current
# branch and origin/master. We write to a file so that commands running in parallel don't try to
# run git commands at the same time.

# We wrap this in a script so that we have an easy "kill switch" if we need to turn this off for
# whatever reason

BASEDIR=$(dirname $0)

# set this flag to true to prevent any scoping of changed packages (run all commands for all packages)
# You may also need to move the "pr/storybook" step out of the parallel step in bitbucket-pipelines.yml
# to prevent out of memory errors
KILL_SWITCH=false

if [ "$KILL_SWITCH" = true ] ; then
  # we echo "**," to make the glob match all packages. The comma is because the glob will be inside
  # a pair of curly braces `--scope="{$PACKAGES}"`
  echo "**" > changed-packages
else
  $BASEDIR/_get_changed_packages_pr.js > changed-packages
fi
