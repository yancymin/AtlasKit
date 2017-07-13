import * as dom from '../dom';
import { ContentMatch, Fragment, Mark, MarkType, Node, NodeType, ResolvedPos, Schema, Slice } from './';

export class DOMSerializer {
  constructor(nodes: { [key: string]: (node: Node) => DOMOutputSpec }, marks: { [key: string]: (mark: Mark) => DOMOutputSpec });

  nodes: { [key: string]: (node: Node) => DOMOutputSpec };
  marks: { [key: string]: (mark: Mark) => DOMOutputSpec };
  serializeFragment(fragment: Fragment, options?: { [key: string]: any }): dom.DocumentFragment;
  serializeNode(node: Node, options?: { [key: string]: any }): dom.Node;

  static renderSpec(doc: dom.Document, structure: DOMOutputSpec): { dom: dom.Node, contentDOM?: dom.Node };
  static fromSchema(schema: Schema<any, any>): DOMSerializer;
  static nodesFromSchema(schema: Schema<any, any>): { [key: string]: (node: Node) => DOMOutputSpec };
  static marksFromSchema(schema: Schema<any, any>): { [key: string]: (mark: Mark) => DOMOutputSpec };
}

export interface DOMOutputSpec {}
