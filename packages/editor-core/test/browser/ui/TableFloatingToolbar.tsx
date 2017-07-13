import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import * as sinon from 'sinon';
import * as React from 'react';
import tablePlugins, { TableState } from '../../../src/plugins/table';
import ToolbarButton from '../../../src/ui/ToolbarButton';
import TableFloatingToolbar from '../../../src/ui/TableFloatingToolbar';
import { Toolbar } from '../../../src/ui/TableFloatingToolbar/styles';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more';

import {
  createEvent, doc, p, makeEditor, table, tr, tdEmpty, tdCursor
} from '../../../src/test-helper';

describe('TableFloatingToolbar', () => {
  const event = createEvent('event');
  const editor = (doc: any) => makeEditor<TableState>({
    doc,
    plugins: tablePlugins(),
  });

  context('when cellElement is undefined', () => {
    it('should not render toolbar', () => {
      const { editorView, pluginState } = editor(doc(p('text'), table(tr(tdEmpty, tdEmpty, tdEmpty))));
      const floatingToolbar = shallow(
        <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
      );
      expect(floatingToolbar.find(Toolbar)).to.have.length(0);
    });
  });

  context('when cellElement is defined', () => {
    it('should render toolbar', () => {
      const { editorView, pluginState } = editor(doc(p('text'), table(tr(tdEmpty, tdEmpty, tdEmpty))));
      const floatingToolbar = shallow(
        <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
      );
      floatingToolbar.setState({ cellElement: document.createElement('td') });
      expect(floatingToolbar.find(Toolbar)).to.have.length(1);
    });
  });

  context('when selecting a column inside table', () => {
    it('should render toolbar', () => {
      const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
      plugin.props.onFocus!(editorView, event);
      pluginState.selectColumn(0);
      const floatingToolbar = mount(
        <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
      );
      expect(floatingToolbar.html()).to.not.equal(null);
      floatingToolbar.unmount();
    });
  });

  context('when selecting a row inside table', () => {
    it('should render toolbar', () => {
      const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
      plugin.props.onFocus!(editorView, event);
      pluginState.selectRow(0);
      const floatingToolbar = mount(
        <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
      );
      expect(floatingToolbar.html()).to.not.equal(null);
      floatingToolbar.unmount();
    });
  });

  context('when editor is not focused', () => {
    it('should not render toolbar', () => {
      const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
      plugin.props.onFocus!(editorView, event);
      pluginState.selectRow(0);
      const floatingToolbar = mount(
        <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
      );
      expect(floatingToolbar.html()).to.not.equal(null);
      plugin.props.onBlur!(editorView, event);
      expect(floatingToolbar.html()).to.equal(null);
    });
  });

  describe('TrashIcon', () => {
    it('should be rendered in the toolbar', () => {
      const { pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
      const floatingToolbar = mount(
        <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
      );
      floatingToolbar.setState({ cellElement: document.createElement('td') });
      const button = floatingToolbar.find(ToolbarButton).first();
      expect(button).to.have.length(1);
      expect(button.find(RemoveIcon)).to.have.length(1);
      floatingToolbar.unmount();
    });

    it('should call pluginState.remove() on click', () => {
      const { pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
      const floatingToolbar = shallow(
        <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
      );
      pluginState.remove = sinon.spy();
      floatingToolbar.setState({ cellElement: document.createElement('td') });
      const button = floatingToolbar.find(ToolbarButton).first();
      button.simulate('click');
      expect((pluginState.remove as any).callCount).to.equal(1);
      floatingToolbar.unmount();
    });
  });

  describe('Advance menu', () => {
    describe('icon', () => {
      it('should be rendered in the toolbar', () => {
        const { pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
        const floatingToolbar = mount(
          <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
        );
        floatingToolbar.setState({ cellElement: document.createElement('td') });
        const button = floatingToolbar.find(ToolbarButton).at(1);
        expect(button.find(EditorMoreIcon)).to.have.length(1);
        floatingToolbar.unmount();
      });

      it('should open DropdownMenu on click', () => {
        const { pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
        const floatingToolbar = mount(
          <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
        );
        floatingToolbar.setState({ cellElement: document.createElement('td') });
        floatingToolbar.find(ToolbarButton).at(1).simulate('click');
        expect(floatingToolbar.state('isOpen')).to.equal(true);
        floatingToolbar.unmount();
      });
    });

    describe('DropdownMenu', () => {
      it('should make isOpen false when a menu item is clicked', () => {
        const { pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
        const floatingToolbar = mount(
          <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
        );
        floatingToolbar.setState({ cellElement: document.createElement('td') });
        floatingToolbar.find(ToolbarButton).at(1).simulate('click');
        expect(floatingToolbar.state('isOpen')).to.equal(true);
        floatingToolbar.find('DropdownMenu span[role="menuitem"]').first().simulate('click');
        expect(floatingToolbar.state('isOpen')).to.equal(false);
        floatingToolbar.unmount();
      });

      ['cut', 'copy', 'paste'].forEach((command, i) => {
        it(`should call "pluginState.${command}" when "${command}" item is clicked`, () => {
          const { pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
          const floatingToolbar = mount(
            <TableFloatingToolbar pluginState={pluginState} editorView={editorView} />
          );
          pluginState[command] = sinon.spy();
          floatingToolbar.setState({ cellElement: document.createElement('td') });
          floatingToolbar.find(ToolbarButton).at(1).simulate('click');
          expect(floatingToolbar.state('isOpen')).to.equal(true);
          floatingToolbar.find('DropdownMenu span[role="menuitem"]').at(i).simulate('click');
          expect((pluginState[command] as any).callCount).to.equal(1);
          floatingToolbar.unmount();
        });
      });
    });
  });

});
