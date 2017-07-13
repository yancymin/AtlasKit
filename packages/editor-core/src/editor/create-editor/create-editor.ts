import { EditorState, EditorView, Schema, MarkSpec, Plugin } from '../../prosemirror';
import ProviderFactory from '../../providerFactory';
import { EditorPlugin, EditorProps, EditorConfig } from '../types';
import ErrorReporter from '../../utils/error-reporter';
import {
  basePlugin,
  blockTypePlugin,
  textFormattingPlugin,
  mentionsPlugin,
  emojiPlugin,
  saveOnEnterPlugin,
  onChangePlugin,
  mediaPlugin
} from '../plugins';

export function sortByRank(a: { rank: number }, b: { rank: number }): number {
  return a.rank - b.rank;
}

export function fixExcludes(marks: { [key: string]: MarkSpec }): { [key: string]: MarkSpec } {
  const markKeys = Object.keys(marks);
  markKeys.map(markKey => {
    const mark = marks[markKey];
    if (mark.excludes) {
      mark.excludes = mark.excludes
        .split(' ')
        .filter(exMarkKey => markKeys.indexOf(exMarkKey) > -1)
        .join(' ');
    }
  });
  return marks;
}

export function createPluginsList(props: EditorProps): EditorPlugin[] {
  const plugins = [basePlugin, blockTypePlugin];

  if (props.allowTextFormatting) {
    plugins.push(textFormattingPlugin);
  }

  if (props.mentionProvider) {
    plugins.push(mentionsPlugin);
  }

  if (props.emojiProvider) {
    plugins.push(emojiPlugin);
  }

  if (props.saveOnEnter) {
    plugins.push(saveOnEnterPlugin);
  }

  if (props.onChange) {
    plugins.push(onChangePlugin);
  }

  if (props.mediaProvider) {
    plugins.push(mediaPlugin);
  }

  return plugins;
}

export function processPluginsList(plugins: EditorPlugin[]): EditorConfig {
  return plugins.reduce(
    (acc, plugin) => {
      if (plugin.pmPlugins) {
        acc.pmPlugins.push(...plugin.pmPlugins());
      }

      if (plugin.nodes) {
        acc.nodes.push(...plugin.nodes());
      }

      if (plugin.marks) {
        acc.marks.push(...plugin.marks());
      }

      if (plugin.contentComponent) {
        acc.contentComponents.push(plugin.contentComponent);
      }

      if (plugin.primaryToolbarComponent) {
        acc.primaryToolbarComponents.push(plugin.primaryToolbarComponent);
      }

      if (plugin.secondaryToolbarComponent) {
        acc.secondaryToolbarComponents.push(plugin.secondaryToolbarComponent);
      }

      return acc;
    },
    {
      nodes: [],
      marks: [],
      pmPlugins: [],
      contentComponents: [],
      primaryToolbarComponents: [],
      secondaryToolbarComponents: []
    } as EditorConfig
  );
}

export function createSchema(editorConfig: EditorConfig) {
  const nodes = editorConfig.nodes.sort(sortByRank).reduce((acc, node) => {
    acc[node.name] = node.node;
    return acc;
  }, {});

  const marks = fixExcludes(
    editorConfig.marks.sort(sortByRank).reduce((acc, mark) => {
      acc[mark.name] = mark.mark;
      return acc;
    }, {})
  );

  return new Schema({ nodes, marks });
}

export function createPMPlugins(
  editorConfig: EditorConfig,
  schema: Schema<any, any>,
  props: EditorProps,
  providerFactory: ProviderFactory,
  errorReporter: ErrorReporter
): Plugin[] {
  return editorConfig.pmPlugins
    .sort(sortByRank)
    .map(({ plugin }) => plugin(schema, props, providerFactory, errorReporter))
    .filter(plugin => !!plugin) as Plugin[];
}

export function createErrorReporter(errorReporterHandler) {
  const errorReporter = new ErrorReporter();
  if (errorReporterHandler) {
    errorReporter.handler = errorReporterHandler;
  }
  return errorReporter;
}

export default function createEditor(place: HTMLElement, props: EditorProps, providerFactory: ProviderFactory) {
  const editorConfig = processPluginsList(createPluginsList(props));
  const { contentComponents, primaryToolbarComponents, secondaryToolbarComponents } = editorConfig;

  const errorReporter = createErrorReporter(props.errorReporterHandler);
  const schema = createSchema(editorConfig);
  const plugins = createPMPlugins(editorConfig, schema, props, providerFactory, errorReporter);
  const state = EditorState.create({ schema, plugins });
  const editorView = new EditorView(place, { state });

  return {
    editorView,
    contentComponents,
    primaryToolbarComponents,
    secondaryToolbarComponents
  };
}
