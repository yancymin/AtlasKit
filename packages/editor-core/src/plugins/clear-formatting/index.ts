import {
  EditorState,
  EditorView,
  Schema,
  MarkType,
  Plugin,
  PluginKey,
} from '../../prosemirror';
import { clearFormatting } from './commands';
import keymapPlugin from './keymap';

export type StateChangeHandler = (state: ClearFormattingState) => any;

export class ClearFormattingState {
  formattingIsPresent: boolean = false;

  private state: EditorState<any>;
  private markTypes = [
    'em', 'code', 'strike', 'strong', 'underline', 'link', 'textColor'
  ];
  private activeMarkTypes: string[];
  private changeHandlers: StateChangeHandler[] = [];

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];
    this.update(state);
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  update(newEditorState: EditorState<any>) {
    this.state = newEditorState;
    const { state } = this;

    this.activeMarkTypes = this.markTypes.filter(
      mark => state.schema.marks[mark] && this.markIsActive(state.schema.marks[mark])
    );
    const formattingIsPresent = this.activeMarkTypes.length > 0 || this.blockStylingIsPresent();
    if (formattingIsPresent !== this.formattingIsPresent) {
      this.formattingIsPresent = formattingIsPresent;
      this.triggerOnChange();
    }
  }

  clearFormatting(view: EditorView) {
    clearFormatting(this.markTypes)(view.state, view.dispatch);
  }

  private triggerOnChange() {
    this.changeHandlers.forEach(cb => cb(this));
  }

  private markIsActive(mark: MarkType): boolean {
    const { state } = this;
    const { from, to, empty } = state.selection;
    if (empty) {
      return !!mark.isInSet(state.selection.$from.marks());
    }
    return state.doc.rangeHasMark(from, to, mark);
  }

  private blockStylingIsPresent = (): boolean => {
    const { state } = this;
    let { from, to } = state.selection;
    let isBlockStyling = false;
    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.isBlock && node.type !== state.schema.nodes.paragraph) {
        isBlockStyling = true;
      }
    });
    return isBlockStyling;
  }
}

export const stateKey = new PluginKey('clearFormattingPlugin');

const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new ClearFormattingState(state);
    },
    apply(tr, pluginState: ClearFormattingState, oldState, newState) {
      pluginState.update(newState);
      return pluginState;
    }
  },
  key: stateKey,
  view: (view: EditorView) => {
    return {};
  }
});

const plugins = (schema: Schema<any, any>) => {
  return [plugin, keymapPlugin(schema)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
