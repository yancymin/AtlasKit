import SchemaNode from './schema-node';
export { default as StringSchemaNode } from './string-schema-node';
export { default as ArraySchemaNode } from './array-schema-node';
export { default as ObjectSchemaNode } from './object-schema-node';
export { default as EnumSchemaNode } from './enum-schema-node';
export { default as ConstSchemaNode } from './const-schema-node';
export { default as PrimitiveSchemaNode } from './primitive-schema-node';
export { default as RefSchemaNode } from './ref-schema-node';
export { default as EmptySchemaNode } from './empty-schema-node';
export { default as AnyOfSchemaNode } from './any-of-schema-node';
export { default as AllOfSchemaNode } from './all-of-schema-node';

type JSONSchemVersion = 'draft-04';

export default class JSONSchemaNode {
  version: JSONSchemVersion;
  description: string;
  root: string;
  definitions: Map<string, SchemaNode> = new Map();

  constructor(version: JSONSchemVersion, description: string, root: string) {
    this.version = version;
    this.description = description;
    this.root = root;
  }

  addDefinition(name: string, definition: SchemaNode) {
    this.definitions.set(name, definition);
  }

  hasDefinition(name: string) {
    return this.definitions.has(name);
  }

  toJSON() {
    if (!this.definitions.has(this.root)) {
      throw new Error(`${this.root} not found in the added definitions`);
    }
    const definitions = {} as any;
    for (const [k, v] of this.definitions) {
      definitions[k] = v;
    }

    return {
      $schema: `http://json-schema.org/${this.version}/schema#`,
      description: this.description,
      $ref: `#/definitions/${this.root}`,
      definitions,
    };
  }
}

export { SchemaNode };
