#!/usr/bin/env node
//
// Overlays one JSON file on top of the other.
//
// This utility was written to allow package.json modifications during prepublish
// to strip out 'ak:webpack:raw' and point 'types' to built declaration files.
//
// Fields can be deleted during the overlay by using the value `null`, e.g.
//
//     {"ak:webpack:raw": null}
//
const fs = require('fs');

const [overlayPath, destinationPath] = process.argv.slice(2);
const merged = JSON.parse(fs.readFileSync(destinationPath));
Object.assign(merged, JSON.parse(fs.readFileSync(overlayPath)));
Object.keys(merged).forEach((key) => {
  if (merged[key] === null) delete merged[key];
});

fs.writeFileSync(destinationPath, JSON.stringify(merged, null, 2));
