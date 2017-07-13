import { EditorView, PluginProps } from '../';
import { EditorState, EditorStateCreateConfig, Transaction } from './';

export interface PluginOptions {
  props?: PluginProps;
  state?: StateField<any>;
  key?: PluginKey;
  view?: (editorView: EditorView) => {
    update?: (editorView: EditorView, prevState: EditorState<any>) => void;
    destroy?: () => void;
  };
  filterTransaction?: (transaction: Transaction, editorState: EditorState<any>) => boolean;
  appendTransaction?: (transactions: Transaction[], oldState: EditorState<any>, newState: EditorState<any>) => Transaction | undefined;
}

export class Plugin {
  constructor(options: PluginOptions);

  props: PluginProps;
  options: { [key: string]: any };
  getState(state: EditorState<any>): any;
}

export class PluginKey {
  constructor(name?: string);

  get(state: EditorState<any>): Plugin | null;
  getState(state: EditorState<any>): any | null;
}

export interface StateField<T> {
  init(config: EditorStateCreateConfig<any>, instance: EditorState<any>): T;
  apply(tr: Transaction, value: T, oldState: EditorState<any>, newState: EditorState<any>): T;
  toJSON?: (value: T) => any;
  fromJSON?: (config: { [key: string]: any }, value: any, state: EditorState<any>) => T;
}
