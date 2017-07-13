import { Schema, keymap, Plugin } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import { MentionsState } from './';
import pluginKey from './plugin-key';

export function keymapPlugin(schema: Schema<any, any>): Plugin {
  const list = {};

  keymaps.bindKeymapWithCommand(keymaps.moveUp.common!, (state: any, dispatch) => {
    const mentionsPlugin = pluginKey.getState(state) as MentionsState;
    if (!mentionsPlugin.queryActive) {
      return false;
    }

    return mentionsPlugin.onSelectPrevious();
  }, list);

  keymaps.bindKeymapWithCommand(keymaps.moveDown.common!, (state: any, dispatch) => {
    const mentionsPlugin = pluginKey.getState(state) as MentionsState;
    if (!mentionsPlugin.queryActive) {
      return false;
    }

    return mentionsPlugin.onSelectNext();
  }, list);

  keymaps.bindKeymapWithCommand(keymaps.enter.common!, (state: any, dispatch) => {
    const mentionsPlugin = pluginKey.getState(state) as MentionsState;
    if (!mentionsPlugin.queryActive) {
      return false;
    }

    return mentionsPlugin.onSelectCurrent();
  }, list);

  keymaps.bindKeymapWithCommand(keymaps.tab.common!, (state: any, dispatch) => {
    const mentionsPlugin = pluginKey.getState(state) as MentionsState;
    if (!mentionsPlugin.queryActive) {
      return false;
    }

    return mentionsPlugin.onSelectCurrent();
  }, list);

  keymaps.bindKeymapWithCommand(keymaps.escape.common!, (state: any, dispatch) => {
    const mentionsPlugin = pluginKey.getState(state) as MentionsState;
    if (!mentionsPlugin.queryActive) {
      return false;
    }

    return mentionsPlugin.dismiss();
  }, list);

  keymaps.bindKeymapWithCommand(keymaps.space.common!, (state: any, dispatch) => {
    const mentionsPlugin = pluginKey.getState(state) as MentionsState;
    if (!mentionsPlugin.queryActive) {
      return false;
    }

    return mentionsPlugin.trySelectCurrent();
  }, list);

  return keymap(list);
}

export default keymapPlugin;

