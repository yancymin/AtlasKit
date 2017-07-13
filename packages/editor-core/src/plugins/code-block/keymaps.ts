import { Schema, keymap, Plugin, EditorState } from '../../prosemirror';

export function keymapPlugin(schema: Schema<any, any>): Plugin | undefined {
  const keymaps = {
    'Enter': (state: EditorState<any>, dispatch) => {
      const { selection, tr, schema: { nodes } } = state;
      const { $from, $to } = selection;
      const node = $from.node($from.depth);
      if (node &&
        node.type === nodes.codeBlock &&
        node.textContent.slice(node.textContent.length - 2) === '\n\n') {
          tr.delete($from.pos - 2, $from.pos);
          tr.split($from.pos - 2);
          tr.setBlockType($from.pos, $to.pos, nodes.paragraph);
          dispatch(tr);
          return true;
      }
      return false;
    }
  };
  return keymap(keymaps);
}

export default keymapPlugin;
