import {
  Plugin,
  Schema,
  EditorState,
  EditorView,
  baseKeymap,
  keymap,
} from '../prosemirror';
import { default as defaultSchema } from './schema';
import { RefsNode, Refs } from './schema-builder';
import { setTextSelection } from './transactions';
import { reactNodeViewPlugins } from '../plugins';

/**
 * Build a ProseMirror instance.
 *
 * Initial selection can be indicated using refs:
 *
 * - `<>` -- a collapsed text selection
 * - `<` and `>` -- a range text selection (`<` is from, `>` is to).
 */
export default <T> (options: Options): EditorInstance<T> => {
  const plugins: Plugin[] = [];
  const schema = options.schema || defaultSchema;
  const fixture = document.body.appendChild(document.createElement('div'));

  if (options.plugin) {
    plugins.push(options.plugin);
  }

  if (options.plugins) {
    plugins.push(...options.plugins);
  }

  plugins.push(
    ...reactNodeViewPlugins(schema),
    keymap(baseKeymap)
  );

  const editorState = EditorState.create({
    plugins,
    doc: options.doc,
    schema: schema,
  }) as ProseMirrorWithRefs;

  const editorView = new EditorView(fixture, {
    state: editorState,
    nodeViews: options.nodeViews || {},
  });

  const { refs } = editorState.doc;

  // Collapsed selection.
  if ('<>' in refs) {
    setTextSelection(editorView, refs['<>']);
    // Expanded selection
  } else if ('<' in refs || '>' in refs) {
    if ('<' in refs === false) {
      throw new Error('A `<` ref must complement a `>` ref.');
    }
    if ('>' in refs === false) {
      throw new Error('A `>` ref must complement a `<` ref.');
    }
    setTextSelection(editorView, refs['<'], refs['>']);
  }

  const pluginStates = plugins.map((plugin) => plugin.getState(editorState));

  afterEach(() => {
    editorView.destroy();
    plugins.forEach((plugin: any) => plugin.destroy! && plugin.destroy());
    if (fixture && fixture.parentNode === document.body) {
      document.body.removeChild(fixture);
    }
  });

  return {
    editorView,
    plugins,
    pluginStates: pluginStates,
    refs,
    plugin: plugins[0],
    pluginState: plugins[0].getState(editorState) as T,
    sel: refs['<>']
  };
};

export interface ProseMirrorWithRefs extends EditorState<Schema<any, any>> {
  doc: RefsNode;
}

export interface Options {
  doc: RefsNode;
  plugin?: Plugin;
  plugins?: Plugin[];
  nodeViews?: { [key: string]: any };
  schema?: Schema<any, any>;
}

export interface EditorInstance<T> {
  editorView: EditorView;
  pluginState: T;
  pluginStates: any[];
  plugin: Plugin;
  plugins: Plugin[];
  refs: Refs;
  sel: number;
}
