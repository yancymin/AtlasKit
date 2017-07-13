import {
  EditorState,
  Schema,
  Plugin,
  PluginKey,
} from '../../prosemirror';

export type StateChangeHandler = (anchorPos: number, headPos: number) => any;

export class ReactNodeViewState {
  private changeHandlers: StateChangeHandler[] = [];

  constructor() {
    this.changeHandlers = [];
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  notifyNewSelection(anchorPos: number, headPos: number) {
    this.changeHandlers.forEach(cb => cb(anchorPos, headPos));
  }
}

export const stateKey = new PluginKey('reactNodeView');

export const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new ReactNodeViewState();
    },
    apply(tr, pluginState: ReactNodeViewState, oldState, newState) {
      if (!tr.docChanged) {
        const { $anchor, $head } = tr.selection;
        pluginState.notifyNewSelection($anchor.pos, $head.pos);
      }

      return pluginState;
    }
  },
  key: stateKey,
});

const plugins = (schema: Schema<any, any>) => {
  return [plugin];
};

export default plugins;
