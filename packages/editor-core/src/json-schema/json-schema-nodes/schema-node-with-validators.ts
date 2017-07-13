import SchemaNode, { NodeType } from './schema-node';

export interface Indexed {
  [key: string]: number | string | boolean | undefined;
}

export default abstract class SchemaNodeWithVadators<T extends Indexed> extends SchemaNode {
  validators: T;

  constructor(type: NodeType, validatiors: T) {
    super(type);
    this.validators = validatiors;
  }

  mergeValidationInfo(keys: [keyof T], obj: any) {
    keys.forEach(k => {
      if (this.validators.hasOwnProperty(k)) {
        obj[k] = this.validators[k];
      }
    });
    return obj;
  }

  abstract toJSON(): Object;
}
