import SchemaNode from './schema-node';
import SchemaNodeWithVadators, { Indexed } from './schema-node-with-validators';

type Properties = {
  [key: string]: {
    value: SchemaNode;
    required?: boolean;
  };
}; // 6.18, 6.17

export interface ObjectValidators extends Indexed {
  additionalProperties?: boolean; // 6.20
}

export default class ObjectSchemaNode extends SchemaNodeWithVadators<ObjectValidators> {
  properties: Properties;

  constructor(properties: Properties = {}, validators: ObjectValidators) {
    super('object', validators);
    this.properties = properties;
  }

  addProperty(name: string, value: SchemaNode, required: boolean = true) {
    this.properties[name] = { value, required };
  }

  toJSON(): object {
    const obj: any = { type: 'object' };
    return Object.keys(this.properties).reduce((obj, key) => {
      const { value, required } = this.properties[key];
      obj['properties'] = obj['properties'] || {};
      obj['properties'][key] = value.toJSON();
      if (required) {
        obj['required'] = obj['required'] || [];
        obj['required'].push(key);
      }

      return this.mergeValidationInfo(['additionalProperties'], obj);
    }, obj);
  }
}
