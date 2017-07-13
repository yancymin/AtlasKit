import * as React from 'react';
import ProviderFactory from '../../providerFactory';
import { Plugin, Schema, EditorView } from '../../prosemirror';
import ErrorReporter from '../../utils/error-reporter';
import { NodeConfig, MarkConfig } from './editor-config';
import { EditorProps } from './editor-props';

export type PMPluginFactory = (schema: Schema<any, any>, props: EditorProps, providerFactory: ProviderFactory, errorReporter: ErrorReporter) => Plugin | undefined;

export type UIComponentFactory = (editorView: EditorView, providerFactory: ProviderFactory) => React.ReactElement<any>;

export interface EditorPlugin {
  /*
   * List of ProseMirror-plugins. This is where we define which plugins will be added to EditorView (main-plugin, keybindings, input-rules, etc.).
   */
  pmPlugins?: () => { rank: number; plugin: PMPluginFactory; }[];

  /*
   * List of Nodes to add to the schema. Needs to specify a rank for each node according to spec in Document Structure.
   */
  nodes?: () => NodeConfig[];

  /*
   * List of Marks to add to the schema. Needs to specify a rank for each mark according to spec in Document Structure.
   */
  marks?: () => MarkConfig[];

  /*
   * Optional UI-component that lives inside the actual content-area (like mention-picker, floating toolbar for links, etc.)
   */
  contentComponent?: UIComponentFactory;

  /*
   * Optional UI-component that will be added to the toolbar at the top of the editor (doesn't exist in the compact-editor).
   */
  primaryToolbarComponent?: UIComponentFactory;

  /*
   * Optional UI-component that will be added to the toolbar at the bottom right of the editor. In compact mode this toolbar lives on the right-hand side of the editor.
   */
  secondaryToolbarComponent?: UIComponentFactory;
}
