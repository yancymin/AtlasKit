import { ContentMatch, Fragment, Mark, MarkType, Node, NodeType, Schema, Slice } from './';

export class ResolvedPos {
  pos: number;
  depth: number;
  parentOffset: number;
  parent: Node;
  node(depth?: number): Node;
  index(depth?: number): number;
  indexAfter(depth?: number): number;
  start(depth?: number): number;
  end(depth?: number): number;
  before(depth?: number): number;
  after(depth?: number): number;
  textOffset: number;
  nodeAfter?: Node;
  nodeBefore?: Node;
  marks(after?: boolean): Mark[];
  sharedDepth(pos: number): number;
  blockRange(other?: ResolvedPos, pred?: (_0: Node) => boolean): NodeRange | null;
  sameParent(other: ResolvedPos): boolean;
}

export class NodeRange {
  constructor($from: ResolvedPos, $to: ResolvedPos, depth: number);
  $from: ResolvedPos;
  $to: ResolvedPos;
  depth: number;
  start: number;
  end: number;
  parent: Node;
  startIndex: number;
  endIndex: number;
}
