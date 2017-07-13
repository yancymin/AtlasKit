#!/usr/bin/env bash
set -e

# If we're commit a merge conflict, commit it directly, else use commitizen.
[[ -f .git/MERGE_HEAD ]] && git commit --file .git/MERGE_MSG || git-cz -n
