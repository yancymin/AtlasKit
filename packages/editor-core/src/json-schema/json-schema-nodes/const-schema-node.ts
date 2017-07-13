import SchemaNode from './schema-node';

export default class ConstSchemaNode extends SchemaNode {
  value: any;

  constructor(value: any) {
    super();
    this.value = value;
  }

  toJSON(): object {
    return { const: this.value };
  }
}
