import { DOMSerializer, EditorState, Node, Slice, Transaction, ParseRule } from '../';
import * as dom from '../dom';
import { Decoration, DecorationSet } from './decoration';
import { EditorView } from './';

export interface NodeView {
  dom?: dom.Node;
  contentDOM?: dom.Node;
  update?: (node: Node, decorations: Decoration[]) => boolean;
  selectNode?: () => void;
  deselectNode?: () => void;
  setSelection?: (anchor: number, head: number, root: dom.Document) => void;
  stopEvent?: (event: dom.Event) => boolean;
  ignoreMutation?: (_0: dom.MutationRecord) => boolean;
  destroy?: () => void;
}

export class ViewDesc {
  constructor(parent: ViewDesc | null, children: ViewDesc[], dom: dom.Node, contentDOM?: dom.Node);

  parseRule(): ParseRule | null;
  stopEvent(_0: dom.Event): boolean;
  localPosFromDOM(dom: dom.Node, offset: number, bias?: number): number;
  descAt(pos: number): NodeViewDesc | null;
  domFromPos(pos: number): { node: dom.Node, offset: number };
  domAfterPos(pos: number): dom.Node;
  setSelection(anchor: number, head: number, root: dom.Document): void;
  ignoreMutation(mutation: dom.MutationRecord): boolean;
}

export class NodeViewDesc extends ViewDesc {
  constructor(parent: ViewDesc | null, node: Node, outerDeco: Decoration[], innerDeco: DecorationSet, dom: dom.Node, contentDOM: dom.Node | null, nodeDOM: EditorView);

  update(node: Node, outerDeco: Decoration[], innerDeco: DecorationSet, view: EditorView): boolean;
}
