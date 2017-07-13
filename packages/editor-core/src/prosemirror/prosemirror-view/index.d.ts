import { DOMSerializer, EditorState, Node, Slice, Transaction, ResolvedPos } from '../';
import * as dom from '../dom';
import { Decoration, DecorationSet } from './decoration';
import { NodeViewDesc } from './viewdesc';
import { SelectionReader } from './selection.d';
export { Decoration, DecorationSet, NodeViewDesc, SelectionReader };
import * as browser from './browser';

export { browser };

export class EditorView {
  constructor(place: dom.Node | ((_0: dom.Node) => void) | { mount: dom.Node } | null, props: EditorProps);

  state: EditorState<any>;
  dom: dom.Element;
  props: EditorProps;
  update(props: EditorProps): void;
  setProps(props: EditorProps): void;
  updateState(state: EditorState<any>): void;
  hasFocus(): boolean;
  someProp(propName: string, f: (prop: any) => any): any;
  focus(): void;
  root: dom.Document | dom.DocumentFragment;
  posAtCoords(coords: { left: number, top: number }): { pos: number, inside: number } | null;
  coordsAtPos(pos: number): { left: number, right: number, top: number, bottom: number };
  endOfTextblock(dir: 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward', state?: EditorState<any>): boolean;
  destroy(): void;
  dispatch(tr: Transaction): void;

  // PRIVATE MEMBERS EXPOSED AS A HACK.
  docView: NodeViewDesc;
}

export interface PluginProps {
  handleDOMEvents?: { [key: string]: (view: EditorView, event: dom.Event) => boolean };
  handleKeyDown?: (view: EditorView, event: dom.KeyboardEvent) => boolean;
  handleKeyPress?: (view: EditorView, event: dom.KeyboardEvent) => boolean;
  handleTextInput?: (view: EditorView, from: number, to: number, text: string) => boolean;
  handleClickOn?: (view: EditorView, pos: number, node: Node, nodePos: number, event: dom.MouseEvent, direct: boolean) => boolean;
  handleClick?: (view: EditorView, pos: number, event: dom.MouseEvent) => boolean;
  handleDoubleClickOn?: (view: EditorView, pos: number, node: Node, nodePos: number, event: dom.MouseEvent, direct: boolean) => boolean;
  handleDoubleClick?: (view: EditorView, pos: number, event: dom.MouseEvent) => boolean;
  handleTripleClickOn?: (view: EditorView, pos: number, node: Node, nodePos: number, event: dom.MouseEvent, direct: boolean) => boolean;
  handleTripleClick?: (view: EditorView, pos: number, event: dom.MouseEvent) => boolean;
  handleContextMenu?: (view: EditorView, pos: number, event: dom.MouseEvent) => boolean;
  handlePaste?: (view: EditorView, event: dom.Event, slice: Slice) => boolean;
  handleDrop?: (view: EditorView, event: dom.Event, slice: Slice, moved: boolean) => boolean;
  onFocus?: (view: EditorView, event: dom.Event) => void;
  onBlur?: (view: EditorView, event: dom.Event) => void;
  createSelectionBetween?: (view: EditorView, anchor: ResolvedPos, head: ResolvedPos) => Selection | void;
  domParser?: DOMParser;
  clipboardParser?: DOMParser;
  transformPasted?: (_0: Slice) => Slice;
  transformPastedHTML?: (_0: string) => string;
  transformPastedText?: (_0: string) => string;
  nodeViews?: { [key: string]: (node: Node, view: EditorView, getPos: () => number, decorations: Decoration[]) => NodeView };
  clipboardSerializer?: DOMSerializer;
  decorations?: (_0: EditorState<any>) => DecorationSet | void;
  editable?: (_0: EditorState<any>) => boolean;
  attributes?: { [key: string]: string } | ((_0: EditorState<any>) => { [key: string]: string } | void);
  scrollThreshold?: number;
  scrollMargin?: number;
}

export interface EditorProps extends PluginProps {
  state: EditorState<any>;
  dispatchTransaction?: (tr: Transaction) => void;
}

export interface NodeView {
  dom?: dom.Node;
  contentDOM?: dom.Node;
  update?: (node: Node, decorations: [Decoration]) => boolean;
  selectNode?: () => void;
  deselectNode?: () => void;
  setSelection?: (anchor: number, head: number, root: dom.Document) => void;
  stopEvent?: (event: dom.Event) => boolean;
  ignoreMutation?: (record: dom.MutationRecord) => boolean;
  destroy?: () => void;
}
