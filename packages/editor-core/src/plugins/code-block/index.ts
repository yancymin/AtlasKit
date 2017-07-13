import {
  EditorState,
  EditorView,
  Schema,
  Node,
  Plugin,
  PluginKey,
  NodeViewDesc,
  Fragment,
  Slice,
} from '../../prosemirror';
import * as commands from '../../commands';
import keymapPlugin from './keymaps';

export type CodeMirrorFocusSubscriber = (uniqueId: string | undefined) => any;
export type CodeBlockStateSubscriber = (state: CodeBlockState) => any;
export type StateChangeHandler = (state: CodeBlockState) => any;

export class CodeBlockState {
  element?: HTMLElement;
  language: string | undefined;
  supportedLanguages: string[];
  toolbarVisible: boolean = false;
  domEvent: boolean = false;
  uniqueId: string | undefined = undefined;
  activeCodeBlock?: Node;
  editorFocused: boolean = false;

  private state: EditorState<any>;
  private changeHandlers: CodeBlockStateSubscriber[] = [];
  private focusHandlers: CodeMirrorFocusSubscriber[] = [];

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];
    this.focusHandlers = [];
    this.state = state;
  }

  subscribe(cb: CodeBlockStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: CodeBlockStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  subscribeFocusHandlers(cb: CodeMirrorFocusSubscriber) {
    this.focusHandlers.push(cb);
  }

  unsubscribeFocusHandlers(cb: CodeMirrorFocusSubscriber) {
    this.focusHandlers = this.focusHandlers.filter(ch => ch !== cb);
  }

  updateLanguage(language: string | undefined, view: EditorView): void {
    if (this.activeCodeBlock) {
      commands.setBlockType(view.state.schema.nodes.codeBlock, { language, uniqueId: this.uniqueId })(view.state, view.dispatch);
      if (this.focusHandlers.length > 0) {
        this.triggerFocus();
      } else {
        view.focus();
      }
    }
  }

  removeCodeBlock(view: EditorView): void {
    const { state, dispatch } = view;
    const { $from, $to } = state.selection;
    const range = $from.blockRange($to);
    dispatch(state.tr.delete(range!.start, range!.end));
    view.focus();
  }


  updateEditorFocused(editorFocused: boolean) {
    this.editorFocused = editorFocused;
  }

  setLanguages(supportedLanguages: string[]) {
    this.supportedLanguages = supportedLanguages;
  }

  update(state: EditorState<any>, docView: NodeViewDesc, domEvent: boolean = false) {
    this.state = state;
    const codeBlockNode = this.activeCodeBlockNode();
    if (domEvent && codeBlockNode || codeBlockNode !== this.activeCodeBlock) {
      this.domEvent = domEvent;
      const newElement = codeBlockNode && this.activeCodeBlockElement(docView);

      this.toolbarVisible = this.editorFocused && !!codeBlockNode && (domEvent || this.element !== newElement);
      this.activeCodeBlock = codeBlockNode;
      this.language = codeBlockNode && codeBlockNode.attrs['language'] || undefined;
      this.element = newElement;
      this.uniqueId = codeBlockNode && codeBlockNode!.attrs['uniqueId'];
      this.triggerOnChange();
    }
  }

  private triggerOnChange() {
    this.changeHandlers.forEach(cb => cb(this));
  }

  private triggerFocus() {
    this.focusHandlers.forEach(cb => cb(this.uniqueId));
  }

  private activeCodeBlockElement(docView: NodeViewDesc): HTMLElement {
    const offset = this.nodeStartPos();
    const { node } = docView.domFromPos(offset);

    return node as HTMLElement;
  }

  private nodeStartPos(): number {
    const { $from } = this.state.selection;
    return $from.start($from.depth);
  }

  private activeCodeBlockNode(): Node | undefined {
    const { state } = this;
    const { $from } = state.selection;
    const node = $from.parent;
    if (node.type === state.schema.nodes.codeBlock) {
      return node;
    }
  }
}
export const stateKey = new PluginKey('codeBlockPlugin');


const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new CodeBlockState(state);
    },
    apply(tr, pluginState: CodeBlockState, oldState, newState) {
      const stored = tr.getMeta(stateKey);
      if (stored) {
        pluginState.update(newState, stored.docView, stored.domEvent);
      }
      return pluginState;
    }
  },
  key: stateKey,
  view: (editorView: EditorView) => {
    stateKey.getState(editorView.state).update(editorView.state, editorView.docView);
    return {
      update: (view: EditorView, prevState: EditorState<any>) => {
        stateKey.getState(view.state).update(view.state, view.docView);
      }
    };
  },
  props: {
    handleClick(view: EditorView, event) {
      stateKey.getState(view.state).update(view.state, view.docView, true);
      return false;
    },
    // this hack allows to preserve nice formatting of code blocks when pasted from an external source
    handlePaste(view: EditorView, event: ClipboardEvent, slice: Slice) {
      if (!event.clipboardData) {
        return false;
      }
      const text = event.clipboardData.getData('text/plain');
      const html = event.clipboardData.getData('text/html');
      const node = slice.content.firstChild;
      const { schema } = view.state;

      if (html && text && node && node.type === schema.nodes.codeBlock) {
        const codeBlockNode = schema.nodes.codeBlock.create(node.attrs, schema.text(text));
        const tr = view.state.tr.replaceSelection(
          new Slice(Fragment.from(codeBlockNode), slice.openStart, slice.openEnd)
        );
        view.dispatch(tr.scrollIntoView());
        return true;
      }

      return false;
    },
    onFocus(view: EditorView, event) {
      stateKey.getState(view.state).updateEditorFocused(true);
    },
    onBlur(view: EditorView, event) {
      const pluginState = stateKey.getState(view.state);
      pluginState.updateEditorFocused(false);
      pluginState.update(view.state, view.docView, true);
    },
  }
});

const plugins = (schema: Schema<any, any>) => {
  return [plugin, keymapPlugin(schema)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
