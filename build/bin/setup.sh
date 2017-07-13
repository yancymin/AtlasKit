#!/usr/bin/env bash
set -e

# We don't wan the old version of yarn from Docker image
npm uninstall -g yarn

# Notes:
# - Reinstalling globally won't work because of cross-FS linking issue.
# - Installing locally (in ./node_modules) won't work for scripts, that call "yarn" from path (node_modules is not in $PATH)
# - Linking a local node_modules/.bin/yarn to /usr/local/bin doesn't work, because node and yarn gets confused with path resolution (it crashes at install)
# - Installing through APK doesn't work because there's some Alpine repository config problem (package not found)
#
# TODO: We should upgrade Yarn in the Docker image or remove it from there, and install through build script every time.

# Install through the bash script (which is the second recommended method after using APK)
curl -o- -L https://yarnpkg.com/install.sh | bash

# Link so that subsequent scripts can just call "yarn" from path
ln -s "$HOME/.yarn/bin/yarn" /usr/bin/yarn

yarn config set progress false
yarn config set color always
yarn config set loglevel warn
