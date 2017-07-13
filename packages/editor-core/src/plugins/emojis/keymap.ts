import { Schema, keymap, Plugin } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import { EmojiState, stateKey } from './';

export function keymapPlugin(schema: Schema<any, any>): Plugin {
  const list = {};

  keymaps.bindKeymapWithCommand(keymaps.moveUp.common!, (state: any, dispatch) => {
    const emojisPlugin = stateKey.getState(state) as EmojiState;
    if (!emojisPlugin.queryActive) {
      return false;
    }

    return emojisPlugin.onSelectPrevious();
  }, list);

  keymaps.bindKeymapWithCommand(keymaps.moveDown.common!, (state: any, dispatch) => {
    const emojisPlugin = stateKey.getState(state) as EmojiState;
    if (!emojisPlugin.queryActive) {
      return false;
    }

    return emojisPlugin.onSelectNext();
  }, list);

  keymaps.bindKeymapWithCommand(keymaps.enter.common!, (state: any, dispatch) => {
    const emojisPlugin = stateKey.getState(state) as EmojiState;
    if (!emojisPlugin.queryActive) {
      return false;
    }

    return emojisPlugin.onSelectCurrent();
  }, list);

  keymaps.bindKeymapWithCommand(keymaps.tab.common!, (state: any, dispatch) => {
    const emojisPlugin = stateKey.getState(state) as EmojiState;
    if (!emojisPlugin.queryActive) {
      return false;
    }

    return emojisPlugin.onSelectCurrent();
  }, list);

  keymaps.bindKeymapWithCommand(keymaps.escape.common!, (state: any, dispatch) => {
    const emojisPlugin = stateKey.getState(state) as EmojiState;
    if (!emojisPlugin.queryActive) {
      return false;
    }

    return emojisPlugin.dismiss();
  }, list);

  keymaps.bindKeymapWithCommand(keymaps.space.common!, (state: any, dispatch) => {
    const emojisPlugin = stateKey.getState(state) as EmojiState;
    if (!emojisPlugin.queryActive) {
      return false;
    }

    return emojisPlugin.onTrySelectCurrent();
  }, list);

  return keymap(list);
}

export default keymapPlugin;

