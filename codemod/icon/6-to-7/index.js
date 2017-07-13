const iconMap = require('./iconMap');

// Check whether an ImportDeclaration contains a certain type of import (i.e. default or named).
const importDeclarationIncludesSpecifier = (type, path) => Boolean(
  path.value.specifiers.map(specifier => (specifier.type === type ? 1 : 0))
    .reduce((totalImportsOfType, isImportOfType) => totalImportsOfType + isImportOfType)
);

// Check whether an ImportDeclaration includes a default import.
const importIncludesDefault = path => importDeclarationIncludesSpecifier('ImportDefaultSpecifier', path);

// Check whether an ImportDeclaration includes a named import.
const importIncludesNamed = path => importDeclarationIncludesSpecifier('ImportSpecifier', path);

// Guess a glyph's package name based on its component name. e.g. 'ArrowLeftIcon' -> 'arrow-left'.
// Note: this will fail for glyphs in sub-directories (i.e. editor/ media-services/ etc.).
const guessPackageName = glyphName => glyphName
  .replace(/Icon$/, '')
  .replace(/([A-Z])/g, '-$1')
  .replace(/^-/, '')
  .toLowerCase();

// Map a known glyph to its package name, or have a guess.
const resolvePackageName = glyphName => (
  iconMap[glyphName] || `@atlaskit/icon/glyph/${guessPackageName(glyphName)}`
);

// Creates an ImportDeclaration AST node.
const buildImportDeclaration = (localName, sourcePath, builders) => {
  const local = builders.identifier(localName);
  const specifiers = [builders.importDefaultSpecifier(local)];
  const source = builders.literal(sourcePath);
  const declaration = builders.importDeclaration(specifiers, source, 'value');

  return declaration;
};

// Creates an ImportDeclaration for importing the generic Icon component.
const buildDefaultImport = ({
  builders,
  localName,
  path,
}) => {
  const declaration = buildImportDeclaration(localName, '@atlaskit/icon', builders);
  declaration.comments = path.value.comments;
  return declaration;
};

// Creates an ImportDeclaration for importing a specific glyph.
const buildGlyphImport = ({
  builders,
  glyphName,
  isFirst,
  localName,
  path,
}) => {
  const declaration = buildImportDeclaration(localName, resolvePackageName(glyphName), builders);
  if (isFirst) declaration.comments = path.value.comments;
  return declaration;
};

// This function gets called by jscodeshift.
// It gets passed the file info and a reference to the jscodeshift API.
module.exports = (fileInfo, api) => api.jscodeshift(fileInfo.source)
  // Find all the ImportDeclaration statements.
  .find(api.jscodeshift.ImportDeclaration)
  .map((path) => {
    const isNotImportingIcon = !/@atlaskit\/icon/.test(path.value.source.value);
    const isImportingGlyphCorrectly = /@atlaskit\/icon\/glyph/.test(path.value.source.value) && importIncludesDefault(path);

    // Let through any which aren't importing icon or are importing a glyph directly.
    if (isNotImportingIcon || isImportingGlyphCorrectly) {
      return path;
    }

    const builders = api.jscodeshift.types.builders;

    // Fix importing the Icon component from /lib/Icon
    if (importIncludesDefault(path) && /\/lib\/Icon/.test(path.value.source.value)) {
      const localName = path.value.specifiers[0].local.name;
      const declaration = buildDefaultImport({ builders, localName, path });
      path.replace(declaration);
    }

    // Fix importing named glyphs from the package root
    if (importIncludesNamed(path)) {
      path.value.specifiers.map((specifier, index) => {
        const localName = specifier.local.name;

        if (specifier.type === 'ImportDefaultSpecifier') {
          return buildDefaultImport({ builders, localName, path });
        }

        const glyphName = specifier.imported ? specifier.imported.name : localName;
        const isFirst = index === 0;
        return buildGlyphImport({ builders, glyphName, isFirst, localName, path });
      })
      .forEach((declaration, index) => {
        if (index === 0) {
          path.replace(declaration);
        } else {
          path.insertAfter(declaration);
        }
      });
    }

    return path;
  })
  .toSource({ quote: 'single' });
