import { ContentMatch, Fragment, Mark, MarkType, NodeType, ResolvedPos, Schema } from './';

export class ReplaceError extends Error {}

export class Slice {
  constructor(content: Fragment, openStart: number, openEnd: number);

  content: Fragment;
  openStart: number;
  openEnd: number;
  size: number;
  toJSON(): { [key: string]: any } | null;

  static fromJSON(schema: Schema<any, any>, json?: { [key: string]: any }): Slice;
  static maxOpen(fragment: Fragment): Slice;
  static empty: Slice;
}
