import { Schema, keymap, Plugin } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import { clearFormatting } from './commands';
import { trackAndInvoke } from '../../analytics';

const markTypes = ['em', 'code', 'strike', 'strong', 'underline', 'link'];

export function keymapPlugin(schema: Schema<any, any>): Plugin {
  const list = {};
  keymaps.bindKeymapWithCommand(keymaps.clearFormatting.common!, trackAndInvoke('atlassian.editor.format.clear.keyboard', clearFormatting(markTypes)), list);

  return keymap(list);
}

export default keymapPlugin;

