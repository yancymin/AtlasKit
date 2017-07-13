import rgba from 'rgba-convert';

import * as allExports from '../../src';
import Prism from './_Prism';

const tintBase = 'akColorN900';

describe('exports', () => {
  it('should have well-defined exports', () => {
    // If you find yourself here and wonder why this list is not auto-generated, then bear in
    // mind that tests are supposed to tell you when a piece of software breaks.
    // As the sole purpose of this component is providing shared style variables:
    //
    // * changing a variable is a patch
    // * adding a variable is a feature
    // * removing a variable is breaking change
    // * renaming a variable is a breaking change
    //
    // If we were to auto-generate this list, then renaming, adding or removing would NOT
    // break any tests and thus not hint the developer at what kind of change he/she is making
    expect(Object.keys(allExports).sort()).toEqual([
      'akAnimationMixins',
      'akBorderRadius',
      'akCodeFontFamily',
      'akColorB100',
      'akColorB200',
      'akColorB300',
      'akColorB400',
      'akColorB50',
      'akColorB500',
      'akColorB75',
      'akColorG100',
      'akColorG200',
      'akColorG300',
      'akColorG400',
      'akColorG50',
      'akColorG500',
      'akColorG75',
      'akColorN0',
      'akColorN10',
      'akColorN100',
      'akColorN100A',
      'akColorN10A',
      'akColorN20',
      'akColorN200',
      'akColorN200A',
      'akColorN20A',
      'akColorN30',
      'akColorN300',
      'akColorN300A',
      'akColorN30A',
      'akColorN40',
      'akColorN400',
      'akColorN400A',
      'akColorN40A',
      'akColorN50',
      'akColorN500',
      'akColorN500A',
      'akColorN50A',
      'akColorN60',
      'akColorN600',
      'akColorN600A',
      'akColorN60A',
      'akColorN70',
      'akColorN700',
      'akColorN700A',
      'akColorN70A',
      'akColorN80',
      'akColorN800',
      'akColorN800A',
      'akColorN80A',
      'akColorN90',
      'akColorN900',
      'akColorN90A',
      'akColorP100',
      'akColorP200',
      'akColorP300',
      'akColorP400',
      'akColorP50',
      'akColorP500',
      'akColorP75',
      'akColorPrimary1',
      'akColorPrimary2',
      'akColorPrimary3',
      'akColorR100',
      'akColorR200',
      'akColorR300',
      'akColorR400',
      'akColorR50',
      'akColorR500',
      'akColorR75',
      'akColorSecondary1',
      'akColorSecondary2',
      'akColorSecondary3',
      'akColorSecondary4',
      'akColorSecondary5',
      'akColorT100',
      'akColorT200',
      'akColorT300',
      'akColorT400',
      'akColorT50',
      'akColorT500',
      'akColorT75',
      'akColorY100',
      'akColorY200',
      'akColorY300',
      'akColorY400',
      'akColorY50',
      'akColorY500',
      'akColorY75',
      'akElevationMixins',
      'akFontFamily',
      'akFontSizeDefault',
      'akGridSize',
      'akGridSizeUnitless',
      'akHelperMixins',
      'akTypographyMixins',
      'akZIndexBlanket',
      'akZIndexCard',
      'akZIndexDialog',
      'akZIndexFlag',
      'akZIndexLayer',
      'akZIndexModal',
      'akZIndexNavigation',
      'default',
    ]);
  });

  it('akTypographyMixins should have well-defined exports', () => {
    expect(Object.keys(allExports.akTypographyMixins).sort()).toEqual([
      'h100',
      'h200',
      'h300',
      'h400',
      'h500',
      'h600',
      'h700',
      'h800',
      'h900',
    ]);
  });

  it(`tints should be made of ${tintBase}`, () => {
    const prism = new Prism(allExports);
    const colors = prism.getColors();
    const neutralBase = rgba(colors[tintBase]).splice(0, 3);
    Object
      .entries(colors)
      .filter(([colorName]) => Prism.isTint(colorName))
      .forEach(([colorName, colorValue]) => {
        expect(rgba(colorValue).splice(0, 3)).toEqual(
          neutralBase,
          `${colorName} is not a tint of ${tintBase}`
        );
      });
  });

  it('should have some exports as numbers', () => {
    expect(typeof allExports.akGridSizeUnitless).toBe('number');
    expect(typeof allExports.akZIndexNavigation).toBe('number');
    expect(typeof allExports.akZIndexLayer).toBe('number');
    expect(typeof allExports.akZIndexBlanket).toBe('number');
    expect(typeof allExports.akZIndexFlag).toBe('number');
    expect(typeof allExports.akZIndexCard).toBe('number');
    expect(typeof allExports.akZIndexDialog).toBe('number');
    expect(typeof allExports.akZIndexModal).toBe('number');
  });
});
