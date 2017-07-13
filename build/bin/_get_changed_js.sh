#!/usr/bin/env bash

function get_changed_js () {
  diff=$(git diff --cached --name-only --diff-filter=ACM | grep -E '(\.jsx?)$')
  echo $diff
}
get_changed_js
