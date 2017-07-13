import { EditorView, keydownHandler } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import * as commands from '../../commands';
import { trackAndInvoke } from '../../analytics';
import { ALL_BLOCK_TYPES } from './types';
import { redo, undo } from '../../prosemirror/prosemirror-history';
import { undoInputRule } from '../../prosemirror/prosemirror-inputrules';
import { BlockTypeState } from './';

export function keymapHandler(view: EditorView, pluginState: BlockTypeState): Function {
  const list = {};

  keymaps.bindKeymapWithCommand(keymaps.insertNewLine.common!, trackAndInvoke('atlassian.editor.newline.keyboard', commands.insertNewLine()), list);
  keymaps.bindKeymapWithCommand(keymaps.moveUp.common!, trackAndInvoke('atlassian.editor.moveup.keyboard', commands.createNewParagraphAbove(view)), list);
  keymaps.bindKeymapWithCommand(keymaps.moveDown.common!, trackAndInvoke('atlassian.editor.movedown.keyboard', commands.createNewParagraphBelow(view)), list);
  keymaps.bindKeymapWithCommand(keymaps.createCodeBlock.common!, trackAndInvoke(analyticsEventName('codeblock', 'autoformatting'), commands.createCodeBlockFromFenceFormat()), list);
  keymaps.bindKeymapWithCommand(keymaps.findKeyMapForBrowser(keymaps.redo)!, trackAndInvoke('atlassian.editor.undo.keyboard', redo), list);
  keymaps.bindKeymapWithCommand(keymaps.undo.common!, trackAndInvoke('atlassian.editor.undo.keyboard', cmdUndo), list);
  keymaps.bindKeymapWithCommand(keymaps.findKeyMapForBrowser(keymaps.redoBarred)!, commands.preventDefault(), list);

  const nodes = view.state.schema.nodes;

  ALL_BLOCK_TYPES.forEach((blockType) => {
    if (nodes[blockType.nodeName]) {
      const shortcut = keymaps.findShortcutByDescription(blockType.title);
      if (shortcut) {
        const eventName = analyticsEventName(blockType.name, 'keyboard');
        keymaps.bindKeymapWithCommand(
          shortcut,
          trackAndInvoke(eventName, () => pluginState.toggleBlockType(blockType.name, view)
        ), list);
      }
    }
  });

  return keydownHandler(list);
}

const cmdUndo = (state, dispatch) => {
  if(undoInputRule(state, dispatch)) {
    return true;
  } else {
    return undo(state, dispatch);
  }
};

function analyticsEventName(blockTypeName: string, eventSource: string): string {
  return `atlassian.editor.format.${blockTypeName}.${eventSource}`;
}

export default keymapHandler;
