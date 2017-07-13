import { EditorView, EditorState, Plugin, keymap } from '../../../prosemirror';
import { EditorPlugin } from '../../types';

export function createPlugin(onSave?: (editorView: EditorView) => void): Plugin | undefined {
  if (!onSave) {
    return;
  }

  return keymap({
    'Enter'(state: EditorState<any>, dispatch: (tr) => void, editorView: EditorView) {
      onSave(editorView);
      return true;
    }
  });
}

const saveOnEnterPlugin: EditorPlugin = {
  pmPlugins() {
    return [
      { rank: 9700, plugin: (schema, props) => createPlugin(props.onSave)}
    ];
  }
};

export default saveOnEnterPlugin;
