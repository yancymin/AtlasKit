const babel = require('babel-core');
const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

const config = require('./config');
const optimiseSVG = require('./svgo')(config);
const glyphTemplate = require('./glyph.template');
const tsTemplate = require('./typescript.template');
const createIconsDocs = require('./createIconsDocs');

console.log('Processing icon glyphs.');

// Ensure the destination directory exists and empty it
fs.emptyDir(path.join(__dirname, config.destDir))
  // Read the contents of the source directory
  .then(() => glob.sync('**/*.svg', { cwd: path.join(__dirname, config.srcDir, 'src') }))
  // Map over all the files
  .then(files => Promise.all(files.map((filepath) => {
    const fileKey = filepath.replace(/\.svg$/, '');
    const displayName = fileKey
      .split(/\W/)
      .map(part => `${part[0].toUpperCase()}${part.slice(1)}`)
      .join('')
      .concat('Icon');

    // Read the contents of the SVG file
    return fs.readFile(path.join(__dirname, config.srcDir, 'src', filepath))
      // Optimise the SVG
      .then(rawSVG => optimiseSVG(filepath, rawSVG))
      // Construct the component
      .then(({ data: optimisedSVG }) => glyphTemplate(optimisedSVG, displayName))
      // Transpile the component code
      .then(componentCode => babel.transform(componentCode, { presets: ['es2015', 'react', 'stage-0'] }))
      // Write the component file
      .then(({ code }) => fs.outputFile(path.join(__dirname, config.destDir, `${fileKey}.js`), code))
      // Write the TypeScript file
      .then(() => fs.outputFile(path.join(__dirname, config.destDir, `${fileKey}.d.ts`), tsTemplate))
      // Return the filename and display name
      .then(() => ({ fileKey, displayName }))
      .catch(err => console.error(err));
  })))
  // Generate icon documentation data
  .then((icons) => {
    const iconDocs = createIconsDocs(icons);
    return fs.outputFile('./docs/icons.js', iconDocs);
  })
  // Job done 🤙
  .then(() => console.log('\n 📦  Icons sorted.'))
  .catch(err => console.error(err));
