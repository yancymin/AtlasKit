import { getPropertyAppearance } from '../../src/styled/getButtonStyles';

const themeDefinitions = {
  fallbacks: {
    propertyA: 'fallback-propertyA',
    propertyB: 'fallback-propertyB',
  },

  themes: {
    default: {
      default: {
        propertyA: {
          default: 'defaultTheme-defaultAppearance-propertyA-defaultValue',
          hover: 'defaultTheme-defaultAppearance-propertyA-hoverValue',
          active: 'defaultTheme-defaultAppearance-propertyA-activeValue',
          selected: 'defaultTheme-defaultAppearance-propertyA-selectedValue',
          disabled: 'defaultTheme-defaultAppearance-propertyA-disabledValue',
        },
      },
      appearanceB: {
        propertyA: {
          default: 'defaultTheme-appearanceB-propertyA-defaultValue',
        },
      },
    },
    themeB: {
      default: {
        propertyA: {
          default: 'themeB-defaultAppearance-propertyA-defaultValue',
        },
      },
    },
  },
};

const { fallbacks, themes } = themeDefinitions;

describe('getPropertyAppearance', () => {
  it('should return \'initial\' if the property is not defined.', () =>
    expect(getPropertyAppearance('not-a-property', {}, themeDefinitions)).toBe('initial')
  );

  it('should return the fallback value if there is no default value.', () =>
    expect(getPropertyAppearance('propertyB', {}, themeDefinitions)).toBe(fallbacks.propertyB)
  );

  it('should use the default theme if the theme is not defined.', () =>
    expect(getPropertyAppearance('propertyA', { theme: 'not-a-theme', appearance: 'appearanceB' }, themeDefinitions)).toBe(themes.default.appearanceB.propertyA.default)
  );

  it('should use the default appearance if the appearance is not defined.', () =>
    expect(getPropertyAppearance('propertyA', { theme: 'themeB', appearance: 'not-an-appearance' }, themeDefinitions)).toBe(themes.themeB.default.propertyA.default)
  );

  it('should return the \'hover\' value when in the hover state.', () =>
    expect(getPropertyAppearance('propertyA', { isHover: true }, themeDefinitions)).toBe(themes.default.default.propertyA.hover)
  );

  it('should prioritise \'active\' state over \'hover\' state.', () =>
    expect(getPropertyAppearance('propertyA', { isActive: true, isHover: true }, themeDefinitions)).toBe(themes.default.default.propertyA.active)
  );

  it('should prioritise \'selected\' state over \'active\' and \'hover\' states.', () =>
    expect(getPropertyAppearance('propertyA', { isActive: true, isHover: true, isSelected: true }, themeDefinitions)).toBe(themes.default.default.propertyA.selected)
  );

  it('should prioritise \'disabled\' state over all other states.', () =>
    expect(getPropertyAppearance('propertyA', { disabled: true, isActive: true, isHover: true, isSelected: true }, themeDefinitions)).toBe(themes.default.default.propertyA.disabled)
  );

  it('should use the default value if the state value is not defined.', () =>
    expect(getPropertyAppearance('propertyA', { appearance: 'appearanceB', isSelected: true }, themeDefinitions)).toBe(themes.default.appearanceB.propertyA.default)
  );
});
