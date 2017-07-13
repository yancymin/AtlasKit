import { EditorView, Plugin, PluginKey } from '../../../prosemirror';
import { EditorPlugin } from '../../types';

export const pluginKey = new PluginKey('onChangePlugin');

export function createPlugin(onChange?: (editorView: EditorView) => void): Plugin | undefined {
  if (!onChange) {
    return;
  }

  return new Plugin({
    key: pluginKey,
    view() {
      return {
        update(editorView) {
          onChange(editorView);
        }
      };
    }
  });
}

const onChangePlugin: EditorPlugin = {
  pmPlugins() {
    return [
      { rank: 200, plugin: (schema, props) => createPlugin(props.onChange)}
    ];
  }
};

export default onChangePlugin;
