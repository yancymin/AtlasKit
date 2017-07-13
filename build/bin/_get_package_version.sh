#!/usr/bin/env bash
set -e
node -e 'console.log(require("./package.json").version)'
