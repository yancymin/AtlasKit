import { Mapping, Node } from '../';
import * as dom from '../dom';
import { EditorView } from './';

export class Decoration {
  spec: { [key: string]: any };

  static widget(pos: number, dom: dom.Node, spec?: { [key: string]: any }): Decoration;
  static inline(from: number, to: number, attrs: DecorationAttrs, spec?: { [key: string]: any }): Decoration;
  static node(from: number, to: number, attrs: DecorationAttrs, spec?: { [key: string]: any }): Decoration;
}

export interface DecorationAttrs {
  class?: string;
  style?: string;
  nodeName?: string;
}

export class DecorationSet {
  find(start?: number, end?: number): Decoration[];
  map(mapping: Mapping, doc: Node, options?: { [key: string]: any }): DecorationSet;
  add(doc: Node, decorations: Decoration[]): DecorationSet;
  remove(decorations: Decoration[]): DecorationSet;

  static create(doc: Node, decorations: Decoration[]): DecorationSet;
  static empty: DecorationSet;
}

export class DecorationGroup {}

export function removeOverlap(spans: Decoration[]): Decoration[];

export function viewDecorations(view: EditorView): DecorationSet | DecorationGroup;
