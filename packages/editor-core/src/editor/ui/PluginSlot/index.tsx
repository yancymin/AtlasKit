import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import ProviderFactory from '../../../providerFactory';

// tslint:disable-next-line:variable-name
const PluginsComponentsWrapper = styled.div`
  display: flex;
`;

export interface Props {
  editorView?: any;
  items?: any[];
  providerFactory: ProviderFactory;
}

export default class PluginSlot extends PureComponent<Props, any> {
  render() {
    const { items, editorView, providerFactory } = this.props;
    if (!items) {
      return null;
    }

    return (
      <PluginsComponentsWrapper>{items.map((component, key) =>
        React.cloneElement(component(editorView, providerFactory), { key }))}</PluginsComponentsWrapper>
    );
  }
}
