import { Node } from '../';

export interface Rect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export class TableMap {
  width: number;
  height: number;
  map: number[];
  problems?: object[];

  findCell(pos: number): Rect;
  colCount(pos: number): number;
  nextCell(pos: number, axis: string, dir: number): number;
  rectBetween(a: number, b: number): Rect;
  cellsInRect(rect: Rect): number[];
  positionAt(row: number, col: number, table: Node): number;

  static get(table: Node): TableMap;
}
