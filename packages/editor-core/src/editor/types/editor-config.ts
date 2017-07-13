import { NodeSpec, MarkSpec, NodeView } from '../../prosemirror';
import { PMPluginFactory, UIComponentFactory } from './editor-plugin';

export interface NodeConfig {
  name: string;
  rank: number;
  node: NodeSpec;
}

export interface MarkConfig {
  name: string;
  rank: number;
  mark: MarkSpec;
}

export interface NodeViewConfig {
  name: string;
  nodeView: NodeView;
}

export interface EditorConfig {
  nodes: NodeConfig[];
  marks: MarkConfig[];
  pmPlugins: { rank: number; plugin: PMPluginFactory; }[];
  contentComponents: UIComponentFactory[];
  primaryToolbarComponents: UIComponentFactory[];
  secondaryToolbarComponents: UIComponentFactory[];
}
