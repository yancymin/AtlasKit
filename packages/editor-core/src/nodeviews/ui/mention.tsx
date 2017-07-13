import * as React from 'react';
import { PureComponent } from 'react';
import Mention from '../../ui/Mention';
import ProviderFactory from '../../providerFactory';
import {
  EditorView,
  Node as PMNode,
} from '../../prosemirror';

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
  providerFactory: ProviderFactory;
}

export default class MentionNode extends PureComponent<Props, {}> {
  render() {
    const { node, providerFactory } = this.props;
    const { id, text, accessLevel } = node.attrs;

    return (
      <Mention
        id={id}
        text={text}
        accessLevel={accessLevel}
        providers={providerFactory}
      />
    );
  }
}
