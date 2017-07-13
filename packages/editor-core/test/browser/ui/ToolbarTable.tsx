import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import tablePlugins, { TableState } from '../../../src/plugins/table';
import ToolbarTable from '../../../src/ui/ToolbarTable';
import ToolbarButton from '../../../src/ui/ToolbarButton';
import TableIcon from '@atlaskit/icon/glyph/editor/table';
import { doc, p, makeEditor } from '../../../src/test-helper';

describe('@atlaskit/editor-core/ui/ToolbarTable', () => {
  const editor = (doc: any) => makeEditor<TableState>({
    doc,
    plugins: [...tablePlugins()],
  });

  it('should render disabled ToolbarButton if disabled property is true', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    const toolbarTable = mount(
      <ToolbarTable
        pluginState={pluginState}
        editorView={editorView}
        disabled={true}
      />
    );
    expect(toolbarTable.find(ToolbarButton).prop('disabled')).to.equal(true);
    toolbarTable.unmount();
  });

  it('should render disabled ToolbarButton if pluginState.tableDisabled is true', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    const toolbarTable = mount(
      <ToolbarTable
        pluginState={pluginState}
        editorView={editorView}
      />
    );
    toolbarTable.setState({ tableDisabled: true });
    expect(toolbarTable.find(ToolbarButton).prop('disabled')).to.equal(true);
    toolbarTable.unmount();
  });

  it('should not render ToolbarButton if pluginState.tableHidden is true', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    const toolbarTable = mount(
      <ToolbarTable
        pluginState={pluginState}
        editorView={editorView}
        disabled={true}
      />
    );
    toolbarTable.setState({ tableHidden: true });
    expect(toolbarTable.find(ToolbarButton)).to.have.length(0);
    toolbarTable.unmount();
  });

  it('should render selected ToolbarButton if pluginState.tableActive is true', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    const toolbarTable = mount(
      <ToolbarTable
        pluginState={pluginState}
        editorView={editorView}
      />
    );
    toolbarTable.setState({ tableActive: true });
    expect(toolbarTable.find(ToolbarButton).prop('selected')).to.equal(true);
    toolbarTable.unmount();
  });

  it('should render TableIcon inside ToolbarButton', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    const toolbarTable = mount(
      <ToolbarTable
        pluginState={pluginState}
        editorView={editorView}
      />
    );
    expect(toolbarTable.find(TableIcon)).to.have.length(1);
    toolbarTable.unmount();
  });
});
