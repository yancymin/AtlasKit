import { ContentMatch, Fragment, Mark, MarkType, Node, NodeRange, NodeType, Slice } from '../';
import { Mapping, Step, StepResult } from './';

export class TransformError extends Error {}

export class Transform {
  constructor(doc: Node);

  doc: Node;
  steps: Step[];
  docs: Node[];
  mapping: Mapping;
  before: Node;
  step(step: Step): this;
  maybeStep(step: Step): StepResult;
  docChanged: boolean;
  addMark(from: number, to: number, mark: Mark): this;
  removeMark(from: number, to: number, mark?: Mark | MarkType): this;
  clearMarkup(from: number, to: number): this;
  clearNonMatching(pos: number, match: ContentMatch): this;
  delete(from: number, to: number): this;
  replaceRange(from: number, to: number, slice: Slice): this;
  replaceRangeWith(from: number, to: number, node: Node): this;
  deleteRange(from: number, to: number): this;
  replace(from, to?: number, slice?: Slice): this;
  replaceWith(from, to: number, content: Fragment | Node | Array<Node>): this;
  insert(pos: number, content: Fragment | Node | Array<Node>): this;
  lift(range: NodeRange, target: number);
  wrap(range: NodeRange, wrappers: [{type: NodeType, attrs?: Object}]): this;
  setBlockType(from: number, to: number, type: NodeType, attrs?: Object): this;
  setNodeType(pos: number, type?: NodeType, attrs?: Object, marks?: Array<Mark>): this;
  split(pos: number, depth?: number, typesAfter?: (null | {type: NodeType, attrs?: Object})[]): this;
  join(pos: number, depth?: number): this;
}
