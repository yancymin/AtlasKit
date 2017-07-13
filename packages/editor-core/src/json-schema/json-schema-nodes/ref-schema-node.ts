import SchemaNode from './schema-node';

export default class RefSchemaNode extends SchemaNode {
  path: string;

  constructor(path: string) {
    super();
    this.path = path;
  }

  toJSON(): object {
    return { $ref: this.path };
  }
}
