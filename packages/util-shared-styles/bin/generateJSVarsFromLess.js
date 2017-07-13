// Linting says that these packages should be in deps and not dev-deps, disabling
/* eslint-disable import/no-extraneous-dependencies */
const camelCase = require('camelcase');
const fs = require('fs-extra');
const glob = require('glob');
const lessVarsToJs = require('less-vars-to-js');
/* eslint-enable import/no-extraneous-dependencies */
const path = require('path');

const jsVars = {};
const jsOutputFilePath = path.join(__dirname, '..', 'build', 'jsVars.js');
const lessFiles = glob.sync(path.join(__dirname, '..', 'src', '*.less'));

// Returns the final value of a varible by following any variable asignments
// e.g @ak-color-primary1: @ak-color-N800 would return the value of ak-color-N800
function followVariable(lessVars, varName) {
  // check if the variables value is another variable
  if (/^@/.test(lessVars[varName])) {
    return followVariable(lessVars, lessVars[varName]);
  }
  return lessVars[varName];
}

// Transform variables from less names to JS names
// e.g @ak-color-primary1 -> akColorPrimary1
function transformVaribleName(varName) {
  return camelCase(varName.replace(/^@/, ''));
}

lessFiles.forEach((lessFilePath) => {
  const lessSrc = fs.readFileSync(lessFilePath, 'utf8');
  const lessVars = lessVarsToJs(lessSrc);
  Object.keys(lessVars).forEach((lessVarName) => {
    const finalVarValue = followVariable(lessVars, lessVarName);
    const sanitizedName = transformVaribleName(lessVarName);
    jsVars[sanitizedName] = finalVarValue;
  });
});

fs.ensureFileSync(jsOutputFilePath);
const outputFileContents = `
/** ***************************************************************************
 **  THIS FILE IS GENERATED - DO NOT MODIFY AND DO NOT CHECK INTO THE REPO   **
 *************************************************************************** **/

module.exports = ${JSON.stringify(jsVars, true, 2)};

`.replace(/"/g, '\'') // replace double quotes with single
.replace(/ {2}'(.+?)'/g, '  $1') // remove quotes around keys
.replace(/'[\n]/, '\',\n'); // add trailing comma to the last value

fs.writeFileSync(jsOutputFilePath, outputFileContents);

