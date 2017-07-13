import SchemaNode from './schema-node';

type OfType = 'anyOf' | 'allOf' | 'oneOf';

export default class OfSchemaNode extends SchemaNode {
  ofType: OfType;
  values: Array<SchemaNode>;

  constructor(ofType: OfType, values: Array<SchemaNode> = []) {
    super();
    this.values = values;
    this.ofType = ofType;
  }

  toJSON(): object {
    return { [this.ofType]: this.values.map(item => item.toJSON()) };
  }
}
