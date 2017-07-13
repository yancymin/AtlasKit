export type PrimitiveType =
  | 'null'
  | 'boolean'
  | 'object'
  | 'array'
  | 'number'
  | 'string';
type Type = PrimitiveType | 'integer';
export type NodeType = Type | Array<Type> | null;

export default abstract class SchemaNode {
  type: NodeType;

  constructor(type: NodeType = null) {
    this.type = type;
  }

  abstract toJSON(): object;
}
