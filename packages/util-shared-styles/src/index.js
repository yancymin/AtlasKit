// We disable es-lint below because jsVars wont exist in the repo (it it .gitignore and generated)
const lessVarsAsJS = require('../build/jsVars'); // eslint-disable-line  import/no-unresolved

export { default as akAnimationMixins } from './mixins/animation';
export { default as akElevationMixins } from './mixins/elevation';
export { default as akHelperMixins } from './mixins/helpers';
export { default as akTypographyMixins } from './mixins/tyopgraphy';

const intVariableNames = [
  'akGridSizeUnitless',
  'akZIndexNavigation',
  'akZIndexLayer',
  'akZIndexBlanket',
  'akZIndexFlag',
  'akZIndexCard',
  'akZIndexDialog',
  'akZIndexModal',
];

Object.keys(lessVarsAsJS).forEach((varName) => {
  if (intVariableNames.indexOf(varName) > -1) {
    module.exports[varName] = parseInt(lessVarsAsJS[varName], 10);
  } else {
    module.exports[varName] = lessVarsAsJS[varName];
  }
});

export default lessVarsAsJS;

