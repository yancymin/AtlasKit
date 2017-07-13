#!/usr/bin/env node
/* eslint-disable no-console */
const findReleaseDetails = require('./findReleaseDetails');
const markAsReleased = require('./markAsReleased');

function markAllAsReleased() {
  findReleaseDetails()
  .then(releaseDetails => releaseDetails.map(markAsReleased))
  .then(() => console.log('Completed Updating of readme files'))
  .catch(e => console.error('Error in changelog release process', e));
}

markAllAsReleased();
