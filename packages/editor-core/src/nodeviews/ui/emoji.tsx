import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import ProviderFactory from '../../providerFactory';
import Emoji from '../../ui/Emoji';
import {
  EditorView,
  Node as PMNode,
} from '../../prosemirror';

// tslint:disable-next-line:variable-name
const Wrapper = styled.span`
  userSelect: all;
`;

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
  providerFactory: ProviderFactory;
}

export default class EmojiNode extends PureComponent<Props, {}> {
  render() {
    const { node, providerFactory } = this.props;
    const { shortName, id, text } = node.attrs;

    return (
      <Wrapper>
        <Emoji
          providers={providerFactory}
          id={id}
          shortName={shortName}
          fallback={text}
        />
      </Wrapper>
    );
  }
}
