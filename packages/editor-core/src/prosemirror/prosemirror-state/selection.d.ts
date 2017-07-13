import { EditorProps, Mappable, Node, ResolvedPos } from '../';
import { EditorState } from './';

export class Selection {
  constructor($anchor: ResolvedPos, $head: ResolvedPos, ranges?: SelectionRange[]);

  from: number;
  to: number;
  $from: ResolvedPos;
  $to: ResolvedPos;
  anchor: number;
  head: number;
  $anchor: ResolvedPos;
  $head: ResolvedPos;
  empty: boolean;
  ranges: Array<SelectionRange>;
  toJSON(): { [key: string]: any };
  map(doc: Node, mapping: Mappable): Selection;
  eq(other: Selection): boolean;

  static findFrom($pos: ResolvedPos, dir: number, textOnly?: boolean): Selection | null;
  static near($pos: ResolvedPos, bias?: number, _2?: boolean): Selection;
  static atStart(doc: Node): Selection | null;
  static atEnd(doc: Node): Selection | null;
  static between($anchor: ResolvedPos, $head: ResolvedPos, bias?: number): Selection;
  static fromJSON(doc: Node, json: { [key: string]: any }): Selection;
}

export class TextSelection extends Selection {
  constructor($anchor: ResolvedPos, $head?: ResolvedPos);

  anchor: number;
  head: number;
  $anchor: ResolvedPos;
  $head: ResolvedPos;
  $cursor?: ResolvedPos;

  static create(doc: Node, anchor: number, head?: number): TextSelection;
}

export class NodeSelection extends Selection {
  constructor($from: ResolvedPos);

  node: Node;

  static create(doc: Node, from: number, _2?: number): TextSelection;
  static isSelectable(node: Node): boolean;
}

export class SelectionRange {
  constructor($from: ResolvedPos, $to: ResolvedPos);

  $from: ResolvedPos;
  $to: ResolvedPos;
}
