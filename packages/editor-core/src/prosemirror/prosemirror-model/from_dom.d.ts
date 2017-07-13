import * as dom from '../dom';
import { Fragment, Node, Schema, Slice } from './';

export class DOMParser {
  constructor(schema: Schema<any, any>, rules: ParseRule[]);

  schema: Schema<any, any>;
  rules: ParseRule[];
  parse(dom: dom.Node, options?: { [key: string]: any }): Node;
  parseSlice(dom: dom.Node, options?: { [key: string]: any }): Slice;

  static schemaRules(schema: Schema<any, any>): ParseRule[];
  static fromSchema(schema: Schema<any, any>): DOMParser;
}

export interface ParseRule {
  tag?: string;
  style?: string;
  context?: string;
  node?: string;
  mark?: string;
  priority?: number;
  ignore?: boolean;
  skip?: boolean;
  attrs?: { [key: string]: any };
  getAttrs?: (_0: dom.Node | string) => boolean | { [key: string]: any } | null;
  contentElement?: string;
  getContent?: (_0: dom.Node) => Fragment;
  preserveWhitespace?: boolean | 'full';
}
