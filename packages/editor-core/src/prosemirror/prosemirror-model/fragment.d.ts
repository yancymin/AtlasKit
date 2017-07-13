import { Node, Schema } from './';

export class Fragment {
  textBetween(from: number, to: number, blockSeparator?: string, leafText?: string): string;
  append(other: Fragment): Fragment;
  cut(from: number, to?: number): Fragment;
  replaceChild(index: number, node: Node): Fragment;
  addToStart(node: Node): Fragment;
  addToEnd(node: Node): Fragment;
  eq(other: Fragment): boolean;
  firstChild?: Node;
  lastChild?: Node;
  childCount: number;
  child(index: number): Node;
  offsetAt(index: number): number;
  maybeChild(index: number): Node | null;
  forEach(f: (node: Node, offset: number, index: number) => void): void;
  findDiffStart(other: Fragment): number | null;
  findDiffEnd(other: Node): { a: number, b: number } | null;
  findIndex(pos: number, round?: number): { index: number, offset: number };
  toString(): string;
  toJSON(): { [key: string]: any } | null;

  static fromJSON(schema: Schema<any, any>, value?: { [key: string]: any }): Fragment;
  static fromArray(array: Node[]): Fragment;
  static from(nodes?: Fragment | Node | Node[]): Fragment;
  static empty: Fragment;
}
