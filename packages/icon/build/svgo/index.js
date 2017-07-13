const SVGO = require('svgo');

const removeNamespacedAttributes = require('./plugins/removeNamespacedAttributes');
const preventFocusing = require('./plugins/preventFocusing');
const addPresentationAttribute = require('./plugins/addPresentationAttribute');
const callbackOnDefinedFill = require('./plugins/callbackOnDefinedFill');
const callbackOnStyleElement = require('./plugins/callbackOnStyleElement');
const addAriaLabels = require('./plugins/addAriaLabels');
const convertAttributesToCamelcase = require('./plugins/convertAttributesToCamelcase');

module.exports = (config) => {
  const initialiseDefaultSVGO = () => new SVGO({
    multipass: true,
    plugins: [
      { removeTitle: true },
      { removeDesc: { removeAny: true } },
      { cleanupIDs: true },
      { collapseGroups: true },
      { removeXMLNS: true },
      { removeNamespacedAttributes },
    ],
  });

  const initialiseCustomSVGO = (filename) => {
    const addAriaLabelsPlugin = Object.assign({}, addAriaLabels, {
      params: { title: '{title}' },
    });

    const callbackOnDefinedFillPlugin = Object.assign({}, callbackOnDefinedFill, {
      params: Object.assign({}, callbackOnDefinedFill.params, {
        callback: fill => console.warn(`"${filename}": has a fill of "${fill}"`),
      }),
    });

    return new SVGO({
      full: true,
      plugins: [
        { preventFocusing },
        { convertAttributesToCamelcase },
        { addAttributesToSVGElement: { attributes: ['{...svgProps}'] } },
        { addPresentationAttribute },
        { callbackOnDefinedFillPlugin },
        { callbackOnStyleElement },
        { removeStyleElement: true },
        { addAriaLabelsPlugin },
      ],
    });
  };

  const defaultSVGO = initialiseDefaultSVGO();

  return (filename, rawSVG) => {
    const customSVGO = initialiseCustomSVGO(filename);

    // Run the default optimiser on the SVG
    return new Promise(resolve => defaultSVGO.optimize(rawSVG, resolve))
      // Check width and height
      .then(({ info, data }) => {
        if (info.width > config.maxWidth) {
          console.warn(`"${filename}" too wide: ${info.width} > ${config.maxWidth}`);
        }
        if (info.height > config.maxHeight) {
          console.warn(`"${filename}" too wide: ${info.height} > ${config.maxHeight}`);
        }

        return data;
      })
      // Run the custom optimiser
      .then(data => new Promise(resolve => customSVGO.optimize(data, resolve)));
  };
};
