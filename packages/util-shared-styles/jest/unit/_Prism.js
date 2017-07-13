import createError from 'create-error';

export const InvalidSwatchError = createError('InvalidSwatchError');
export const InvalidColorError = createError('InvalidColorError');

export const SWATCH_PRIMARY = 'Primary';
export const SWATCH_SECONDARY = 'Secondary';
export const SWATCH_NEUTRAL = 'N';
export const SWATCH_RED = 'R';
export const SWATCH_TEAL = 'T';
export const SWATCH_PURPLE = 'P';
export const SWATCH_GREEN = 'G';
export const SWATCH_YELLOW = 'Y';
export const SWATCH_BLUE = 'B';

export const tintRgx = /A$/;

const swatchToName = {
  [SWATCH_PRIMARY]: 'Primary',
  [SWATCH_SECONDARY]: 'Secondary',
  [SWATCH_NEUTRAL]: 'Neutral',
  [SWATCH_RED]: 'Red',
  [SWATCH_TEAL]: 'Teal',
  [SWATCH_PURPLE]: 'Purple',
  [SWATCH_GREEN]: 'Green',
  [SWATCH_YELLOW]: 'Yellow',
  [SWATCH_BLUE]: 'Blue',
};

const validSwatches = Object.keys(swatchToName);

const colorRgx = /^akColor(.+)$/;
const colorRgxSwatchOnly = /^akColor([a-z]+)/i;
const colorRgxNumberOnly = /^akColor(?:[a-z]+?)(\d+.*)$/i;
const colorsSymbol = Symbol('lessVars');

/**
* This class provides a set of helpers around
* our colors defined in colors.less
* @private
*/
class Prism {

  /**
  * Constructs a new instance based on a given set of less variables
  * (will only take the colors)
  *
  * @param {!Object.<String, String>} lessVars A map with variable names mapping to values
  */
  constructor(lessVars) {
    this[colorsSymbol] = Object.freeze(Object
      .entries(lessVars)
      .filter(([key]) => Prism.isColor(key))
      .reduce((prev, [key, value]) => {
        prev[key] = value;
        return prev;
      }, {}));
  }

  /**
  * Checks whether a given variable name is a color.
  * Valid ones usually start with `akColor...`
  *
  * @param {String} variableName The variable name to test for.
  * @return {boolean} True if the given variable name corresponds to a color, false if not
  */
  static isColor(variableName) {
    return colorRgx.test(variableName);
  }

  /**
  * Checks whether a given color name is a tint
  *
  * @param {String} colorName To check whether the given colorName is a color tint
  * @return {boolean} True if the given color name corresponds to a tint or false if not.
  */
  static isTint(colorName) {
    return tintRgx.test(colorName);
  }

  /**
  * Returns all colors that are part of the given variables at instance creation time
  * @return {Object.<String,String>} A map holding color name/value pairs.
  *                                         The values can be any valid CSS color declaration, e.g.
  *                                         hex format, rgba, etc.
  */
  getColors() {
    return this[colorsSymbol];
  }

  /**
  * Returns a color value by its given name
  *
  * @param {String} colorName The color name to get the value for
  * @return {String} The color value. Can be any valid CSS color declaration.
  */
  getColorByName(colorName) {
    return this.getColors()[colorName];
  }

  /**
  * Gets all the colors of a given swatch (e.g. all Primary, Neutral, Purple, etc.)
  *
  * @param {String} swatch The defined swatch to get the colors for.
  *                        Valid swatches are available through named exports starting with SWATCH_
  * @return {Object.<String,String>} An object with color name/value pairs.
  * @throws {InvalidSwatchError} if the given swatch is not a valid one
  */
  getColorsBySwatch(swatch) {
    if (validSwatches.indexOf(swatch) === -1) {
      throw new InvalidSwatchError(`"${swatch}" is not a valid swatch`);
    }
    const swatchRgx = new RegExp(`^akColor${swatch}\\d+`, 'i');
    const colors = this.getColors();
    return Object
      .keys(colors)
      .filter(key => swatchRgx.test(key))
      .reduce((prev, key) => {
        prev[key] = colors[key];
        return prev;
      }, {});
  }

  /**
  * Gets the English name for a given swatch
  *
  * @param {String} swatch The defined swatch to get the colors for.
  *                        Valid swatches are available through named exports starting with SWATCH_
  * @throws {InvalidSwatchError} if the given swatch is not a valid one
  */
  static getNameFromSwatch(swatch) {
    if (validSwatches.indexOf(swatch) === -1) {
      throw new InvalidSwatchError(`"${swatch}" is not a valid swatch`);
    }
    return swatchToName[swatch];
  }

  /**
  * Gets the swatch from a given color name
  *
  * @param {String} colorName The color name to determine the swatch from
  * @return {String} The swatch derived from the color name
  * @throws {InvalidColorError} if the given color name is not valid
  * @throws {InvalidSwatchError} if the color contains an invalid/unknown swatch
  */
  static getSwatchFromColorName(colorName) {
    if (!Prism.isColor(colorName)) {
      throw new InvalidColorError(`"${colorName}" is not a valid color`);
    }

    const swatch = colorName.match(colorRgxSwatchOnly)[1];
    if (validSwatches.indexOf(swatch) === -1) {
      throw new InvalidSwatchError(`"Color ${colorName}" has an unknown swatch`);
    }
    return swatch;
  }

  /**
  * Gets the color number from a given color name. The number is the identifing characteristic used
  * by the ADG team.
  * Example: For akColorN800A, N800A would be the color number.
  *
  * @param {String} colorName The color name to determine the color number for
  * @return {String} The color number
  * @throws {InvalidColorError} if the given color name is not valid
  */
  static getColorNumberFromColorName(colorName) {
    if (!Prism.isColor(colorName)) {
      throw new InvalidColorError(`"${colorName}" is not a valid color`);
    }

    return colorName.match(colorRgxNumberOnly)[1];
  }

  /**
  * Gets all names for a given color value
  * Example: #FFFFFF is both akColorPrimary3 as well as akColorN0, so for #FFFFFF the resulting
  * array would have both of those names.
  * Attention: matching is done through equality, there is no conversion between rgb(...) and hex
  *
  * @param {String} color The color value to get the names for
  * @return {Array.<String>} An array of color names.
  *                          The array will be empty if the color is unknown.
  */
  getColorNames(color) {
    const colors = this.getColors();
    return Object
      .entries(colors)
      .filter(([, colorHex]) => (colorHex === color))
      .map(([key]) => key);
  }

}

export default Prism;
