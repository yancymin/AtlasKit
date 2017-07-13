import {
  EditorState,
  EditorView,
  Schema,
  Plugin,
  PluginKey,
} from '../../prosemirror';

import keymapPlugin from './keymap';
import inputRulePlugin from './input-rule';

export type StateChangeHandler = (state: RuleState) => any;

export class RuleState {
  private state: EditorState<any>;

  constructor(state: EditorState<any>) {
    this.state = state;
  }
}

export const stateKey = new PluginKey('rulePlugin');

const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new RuleState(state);
    },
    apply(tr, pluginState: RuleState, oldState, newState) {
      return pluginState;
    }
  },
  key: stateKey,
  view: (view: EditorView) => {
    return {};
  }
});

const plugins = (schema: Schema<any, any>) => {
  return [plugin, inputRulePlugin(schema), keymapPlugin(schema)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;

