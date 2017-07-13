/**
 * Like el.hasAttribute(attr) but designed for use within a skate attribute
 * change handler where you only have access to change.oldValue.
 */
function computeBooleanValue(attrValue) {
  return attrValue !== null;
}

function setBooleanAttribute(el, attr, newValue) {
  if (newValue) {
    el.setAttribute(attr, '');
  } else {
    el.removeAttribute(attr);
  }
}

function computeEnumValue(enumOptions, value) {
  const matchesEnumValue = enumValue => enumValue.toLowerCase() === value.toLowerCase();

  const isMissing = (value === null) || (typeof value === 'undefined');
  const isInvalid = !isMissing && !enumOptions.values.filter(matchesEnumValue).length;

  if (isMissing) {
    if ({}.hasOwnProperty.call(enumOptions, 'missingDefault')) {
      return enumOptions.missingDefault;
    }
    return null;
  }

  if (isInvalid) {
    if ({}.hasOwnProperty.call(enumOptions, 'invalidDefault')) {
      return enumOptions.invalidDefault;
    } else if ({}.hasOwnProperty.call(enumOptions, 'missingDefault')) {
      return enumOptions.missingDefault;
    }
    return null;
  }

  return enumOptions.values.length ? enumOptions.values.filter(matchesEnumValue)[0] : null;
}

function setEnumAttribute(el, enumOptions, newValue) {
  el.setAttribute(enumOptions.attribute, newValue);
}

/**
 * Helper functions useful for implementing reflected boolean and enumerated
 * attributes and properties.
 *
 * @see https://html.spec.whatwg.org/multipage/infrastructure.html#reflecting-content-attributes-in-idl-attributes
 * @see https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attribute
 * @see https://html.spec.whatwg.org/multipage/infrastructure.html#enumerated-attribute
 */
export {
    computeBooleanValue,
    setBooleanAttribute,

    computeEnumValue,
    setEnumAttribute,
};
