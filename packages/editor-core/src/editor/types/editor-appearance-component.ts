import * as React from 'react';
import { EditorView } from '../../prosemirror';
import ProviderFactory from '../../providerFactory';

export interface EditorAppearanceComponentProps {
  onUiReady?: (ref) => void;
  providerFactory: ProviderFactory;
  editorView?: EditorView;
  contentComponents?: React.ReactElement<any>[];
  primaryToolbarComponents?: React.ReactElement<any>[];
  secondaryToolbarComponents?: React.ReactElement<any>[];
}
