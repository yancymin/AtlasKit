import { Node, Mark } from '../';

type NodeSerializer = (state: MarkdownSerializerState, node?: Node, parent?: Node, index?: number) => void;

interface MarkSerializer {
  open: string | ((state: MarkdownSerializerState, mark: Mark) => string);
  close: string | ((state: MarkdownSerializerState, mark: Mark) => string);
  mixable?: boolean;
}

type NodeSerializerSpec = { [ nodeName: string ]: NodeSerializer };
type MarkSerializerSpec =  { [ markName: string ]: MarkSerializer };

export class MarkdownSerializer {
  constructor(nodes: NodeSerializerSpec, marks: MarkSerializerSpec);
  serialize(content: Node, options?: { [key: string]: any }): string;
  nodes;
  marks;
}

export const defaultMarkdownSerializer;

export class MarkdownSerializerState {
  constructor(nodes: NodeSerializerSpec, marks: MarkSerializerSpec, options?: Object);
  flushClose(size: number): void;
  wrapBlock(delim: string, firstDelim: string | null, node: Node, f: Function): void;
  atBlank(): boolean;
  ensureNewLine(): void;
  write(content?: string): void;
  closeBlock(node: Node);
  text(text: string, escape?: boolean): void;
  render(node: Node, parent: Node, index: number): void;
  renderContent(parent: Node): void;
  renderInline(parent: Node): void;
  renderList(node: Node, delim: string, firstDelim: (number: number) => string): void;
  esc(str: string, startOfLine?: boolean): string;
  quote(str: string): string;
  repeat(str: string, n: number): string;
  markString(mark: Mark, open: boolean): string;
  out;
  closed;
  nodes;
  marks;
}
