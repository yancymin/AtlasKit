import { Node, Slice, Transaction, ResolvedPos, SelectionRange } from '../';

export interface CellSelectionJSON {
  type: string;
  anchor: number;
  head: number;
}

export class CellSelection {
  constructor($anchorCell: ResolvedPos, $headCell?: ResolvedPos);

  from: number;
  to: number;
  $from: ResolvedPos;
  $to: ResolvedPos;
  anchor: number;
  head: number;
  $anchor: ResolvedPos;
  $head: ResolvedPos;
  $anchorCell: ResolvedPos;
  $headCell: ResolvedPos;
  empty: boolean;
  ranges: Array<SelectionRange>;

  map(doc: Node, mapping: any): any;
  content(): Slice;
  replace(tr: Transaction, content: Slice): void;
  replaceWith(tr: Transaction, node: Node): void;
  forEachCell(f: Function): void;
  isRowSelection(): boolean;
  isColSelection(): boolean;
  eq(other: any): boolean;
  toJSON(): CellSelectionJSON;
  getBookmark(): {anchor: number, head: number};

  static colSelection(anchorCell: ResolvedPos, headCell?: ResolvedPos): CellSelection;
  static rowSelection(anchorCell: ResolvedPos, headCell?: ResolvedPos): CellSelection;
  static create(doc: Node, anchorCell: number, headCell?: number): CellSelection;
  static fromJSON(doc: Node, json: CellSelectionJSON): CellSelection;
}
