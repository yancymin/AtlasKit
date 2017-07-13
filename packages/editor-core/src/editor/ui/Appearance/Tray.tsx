import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import PluginSlot from '../PluginSlot';
import { EditorAppearanceComponentProps } from '../../types';

// tslint:disable-next-line:variable-name
const TrayEditor = styled.div`
  display: flex;
  border: 1px solid #C1C7D0;
  border-radius: 3px;
  height: auto;
  min-height: 30px;
  max-height: 305px;
  max-width: inherit;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  word-wrap: break-word;

  div > .ProseMirror {
    outline: none;
    white-space: pre-wrap;
    padding: 0;
    margin: 0;
  }
`;

// tslint:disable-next-line:variable-name
const ContentArea = styled.div`
  padding: 4px 8px;
  flex-grow: 1;
`;

// tslint:disable-next-line:variable-name
const SecondaryToolbarContainer = styled.div`
  padding: 2px 4px 0 0;
  margin-bottom: -2px;
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: flex-start;
  flex-shrink: 0;
  display: flex;
`;

export default class Editor extends PureComponent<EditorAppearanceComponentProps, any> {
  static displayName = 'TrayEditor';

  private handleRef = ref => {
    if (this.props.onUiReady) {
      this.props.onUiReady(ref);
    }
  }

  render() {
    const { editorView, contentComponents, secondaryToolbarComponents, providerFactory } = this.props;

    return (
      <TrayEditor>
        <ContentArea innerRef={this.handleRef}>
          <PluginSlot editorView={editorView} providerFactory={providerFactory} items={contentComponents} />
        </ContentArea>
        <SecondaryToolbarContainer>
          <PluginSlot editorView={editorView} providerFactory={providerFactory} items={secondaryToolbarComponents} />
        </SecondaryToolbarContainer>
      </TrayEditor>
    );
  }
}
