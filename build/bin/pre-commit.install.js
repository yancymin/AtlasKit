#!/usr/bin/env node
const log = require('minilog')('pre-commit');
require('minilog').enable();
const Validate = require('git-validate');

Validate.installHooks('pre-commit');
log.info('hook installed successfully');
