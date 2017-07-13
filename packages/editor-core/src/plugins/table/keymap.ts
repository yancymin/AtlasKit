import { keydownHandler } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import { TableState } from './';

export function keymapHandler(pluginState: TableState): Function {
  const list = {};

  keymaps.bindKeymapWithCommand(keymaps.nextCell.common!, pluginState.goToNextCell(1), list);
  keymaps.bindKeymapWithCommand(keymaps.previousCell.common!, pluginState.goToNextCell(-1), list);
  keymaps.bindKeymapWithCommand(keymaps.toggleTable.common!, pluginState.createTable(), list);

  return keydownHandler(list);
}

export default keymapHandler;
