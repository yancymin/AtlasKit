import { EditorProps, Mark, Node, Plugin, Schema, Selection, Transaction } from '../';

export interface EditorStateCreateConfig<S> {
  doc?: any;
  schema: S;
  selection?: Selection;
  plugins?: Plugin[];
}

export class EditorState<S> {
  schema: S;
  storedMarks?: Mark[];
  selection: Selection;
  doc: Node;
  plugins: Plugin[];
  apply(tr: Transaction): this;
  filterTransaction(tr: Transaction): Transaction | null;
  applyTransaction(tr: Transaction): { state: EditorState<S>, transactions: Transaction[] };
  applyInner(tr: Transaction): this;
  tr: Transaction;
  reconfigure(config: { [key: string]: any }): this;
  toJSON(pluginFields?: { [key: string]: Plugin }): { [key: string]: any };

  static create<S>(config: EditorStateCreateConfig<S>): EditorState<S>;
  static fromJSON<S>(config: EditorStateCreateConfig<S>, json: { [key: string]: any }, pluginFields?: { [key: string]: Plugin }): EditorState<S>;
}
