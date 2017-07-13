import { computeEnumValue } from './attributes';

/* Helper function for creating new extensions to existing properties */
function prop(def) {
  return function createNewProp(...args) {
    args.unshift({}, def);
    return Object.assign(...args);
  };
}

/**
  This property extension can be used with skate.
  Usage:
  ```
  props: {
      respondsTo: props.enum({values: ['toggle', 'hover'],
      missingDefault: 'toggle',
      invalidDefault: 'toggle'})({

      })
  }
  ```
 */
function enumeration(enumOptions) {
  return prop({
    coerce: value => computeEnumValue(enumOptions, value),
    default: enumOptions.missingDefault,
    /* if the prop is an attribute, also add 'initial' with the default value so it get's set too*/
    initial: enumOptions.attribute ? enumOptions.missingDefault : undefined,
    deserialize: value => (value === null ? undefined : value),
    serialize: value => (typeof value === 'undefined' ? value : String(value)),
  });
}

export default enumeration;
