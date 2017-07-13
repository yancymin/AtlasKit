import Prism, {
  SWATCH_TEAL,
  SWATCH_PURPLE,
  InvalidSwatchError,
  InvalidColorError,
} from './_Prism';

describe('Prism', () => {
  describe('isColor', () => {
    it('should be possible to test whether a variable is actually a color', () => {
      expect(Prism.isColor('akColorSecondary1')).toBe(true);
      expect(Prism.isColor('someBla')).toBe(false);
      expect(Prism.isColor('akColor')).toBe(false);
    });
  });

  describe('getSwatchFromColorName', () => {
    it('should be possible to get a swatch from a color name', () => {
      expect(Prism.getSwatchFromColorName('akColorSecondary1')).toBe('Secondary');
      expect(Prism.getSwatchFromColorName('akColorT75')).toBe('T');
      expect(Prism.getSwatchFromColorName('akColorN100A')).toBe('N');
      expect(() => Prism.getSwatchFromColorName('xyz')).toThrow(InvalidColorError);
      expect(() => Prism.getSwatchFromColorName('akColorBLA200')).toThrow(InvalidSwatchError);
    });
  });

  describe('getColorNumberFromColorName', () => {
    it('should be possible to get a color number from a color name', () => {
      expect(Prism.getColorNumberFromColorName('akColorSecondary1')).toBe('1');
      expect(Prism.getColorNumberFromColorName('akColorT75')).toBe('75');
      expect(Prism.getColorNumberFromColorName('akColorN100A')).toBe('100A');
      expect(() => Prism.getColorNumberFromColorName('xyz')).toThrow(InvalidColorError);
    });
  });

  describe('getNameFromSwatch', () => {
    it('should be possible to get a name from a color swatch', () => {
      expect(Prism.getNameFromSwatch('Primary')).toBe('Primary');
      expect(Prism.getNameFromSwatch('Secondary')).toBe('Secondary');
      expect(Prism.getNameFromSwatch('N')).toBe('Neutral');
      expect(() => Prism.getNameFromSwatch('unknown')).toThrow(InvalidSwatchError);
    });
  });

  describe('getColors', () => {
    it('should be possible to filter out colors from a given less vars object', () => {
      const prism = new Prism({
        bla: 1,
        akColorX: 2,
        akColorY: 3,
        akColourZ: 4,
      });
      expect(Object.keys(prism.getColors())).toEqual(['akColorX', 'akColorY']);
    });
  });

  describe('getColorNames', () => {
    it('should be possible to get the name of a color from its value', () => {
      const prism = new Prism({
        akColorX: 2,
        akColorY: 3,
      });
      Object.entries(prism.getColors()).forEach(([name, value]) => {
        expect(prism.getColorNames(value)).toContain(name);
      });
    });
  });

  describe('getColorsBySwatch', () => {
    it('should yell at us if we pass an incorrect swatch', () => {
      expect(() => new Prism({}).getColorsBySwatch('incorrect')).toThrow(InvalidSwatchError);
    });

    it('should be possible to get a filtered color object by swatch', () => {
      const prism = new Prism({
        [`akColor${SWATCH_TEAL}1`]: 1,
        [`akColor${SWATCH_TEAL}2`]: 2,
        [`akColor${SWATCH_TEAL}3`]: 3,
        [`akColor${SWATCH_PURPLE}4`]: 4,
        [`akColor${SWATCH_PURPLE}5`]: 5,
      });

      expect(prism.getColorsBySwatch(SWATCH_TEAL)).toEqual({
        [`akColor${SWATCH_TEAL}1`]: 1,
        [`akColor${SWATCH_TEAL}2`]: 2,
        [`akColor${SWATCH_TEAL}3`]: 3,
      });
    });
  });

  describe('isTint', () => {
    it('should be possible to detect tints', () => {
      expect(Prism.isTint('akColorR75')).toBe(false);
      expect(Prism.isTint('akColorN100')).toBe(false);
      expect(Prism.isTint('akColorN100A')).toBe(true);
    });
  });
});
