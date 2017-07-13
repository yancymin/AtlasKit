import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import * as sinon from 'sinon';
import * as React from 'react';
import tablePlugins, { TableState } from '../../../src/plugins/table';
import TableFloatingControls from '../../../src/ui/TableFloatingControls';
import CornerControls from '../../../src/ui/TableFloatingControls/CornerControls';
import ColumnControls from '../../../src/ui/TableFloatingControls/ColumnControls';
import RowControls from '../../../src/ui/TableFloatingControls/RowControls';
import InsertColumnButton from '../../../src/ui/TableFloatingControls/ColumnControls/InsertColumnButton';
import InsertRowButton from '../../../src/ui/TableFloatingControls/RowControls/InsertRowButton';
import AkButton from '@atlaskit/button';
import {
  ColumnControlsButtonWrap,
  HeaderButton as ColumnControlsButton
} from '../../../src/ui/TableFloatingControls/ColumnControls/styles';
import {
  RowControlsButtonWrap,
  HeaderButton as RowControlsButton
} from '../../../src/ui/TableFloatingControls/RowControls/styles';

import {
  createEvent, doc, p, makeEditor, table, tr, tdEmpty, tdCursor
} from '../../../src/test-helper';

describe('TableFloatingControls', () => {
  const event = createEvent('event');
  const editor = (doc: any) => makeEditor<TableState>({
    doc,
    plugins: tablePlugins(),
  });

  context('when pluginState.tableElement is undefined', () => {
    it('should not render table header', () => {
      const { editorView, pluginState } = editor(doc(p('text'), table(tr(tdEmpty, tdEmpty, tdEmpty))));
      const floatingControls = mount(
        <TableFloatingControls pluginState={pluginState} editorView={editorView} />
      );
      expect(floatingControls.html()).to.equal(null);
      floatingControls.unmount();
    });
  });

  context('when pluginState.tableElement is defined', () => {
    it('should render CornerControls, ColumnControls and RowControls', () => {
      const { editorView, pluginState } = editor(doc(p('text'), table(tr(tdEmpty, tdEmpty, tdEmpty))));
      const floatingControls = shallow(
        <TableFloatingControls pluginState={pluginState} editorView={editorView} />
      );
      floatingControls.setState({ tableElement: document.createElement('table') });
      expect(floatingControls.find(CornerControls)).to.have.length(1);
      expect(floatingControls.find(ColumnControls)).to.have.length(1);
      expect(floatingControls.find(RowControls)).to.have.length(1);
    });
  });

  context('when editor is not focused', () => {
    it('should not render table header', () => {
      const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
      const floatingControls = mount(
        <TableFloatingControls pluginState={pluginState} editorView={editorView} />
      );
      plugin.props.onFocus!(editorView, event);
      expect(floatingControls.html()).to.not.equal(null);
      plugin.props.onBlur!(editorView, event);
      expect(floatingControls.html()).to.equal(null);
      floatingControls.unmount();
    });
  });

  context('when toolbar is clicked', () => {
    it('should call pluginState.updateToolbarFocused', () => {
      const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
      const floatingControls = mount(
        <TableFloatingControls pluginState={pluginState} editorView={editorView} />
      );
      plugin.props.onFocus!(editorView, event);
      pluginState.updateToolbarFocused = sinon.spy();
      floatingControls.find(CornerControls).parent().simulate('mousedown');
      expect((pluginState.updateToolbarFocused as any).calledOnce).to.equal(true);
      floatingControls.unmount();
    });
  });

  context('when toolbar is not focused', () => {
    it('should call pluginState.updateToolbarFocused', () => {
      const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
      const floatingControls = mount(
        <TableFloatingControls pluginState={pluginState} editorView={editorView} />
      );
      plugin.props.onFocus!(editorView, event);
      pluginState.updateToolbarFocused = sinon.spy();
      floatingControls.find(CornerControls).parent().simulate('blur');
      expect((pluginState.updateToolbarFocused as any).calledOnce).to.equal(true);
      floatingControls.unmount();
    });
  });

  describe('CornerControls', () => {
    context('when pluginState.isTableSelected is true', () => {
      it('should render selected header', () => {
        const { editorView, plugin, pluginState } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
        const floatingControls = mount(
          <TableFloatingControls pluginState={pluginState} editorView={editorView} />
        );
        plugin.props.onFocus!(editorView, event);
        pluginState.selectTable();
        expect(floatingControls.find(CornerControls).prop('isSelected')()).to.equal(true);
        floatingControls.unmount();
      });
    });
  });

  describe('ColumnControls', () => {
    [1, 2, 3].forEach(column => {
      context(`when table has ${column} columns`, () => {
        it(`should render ${column} column header buttons`, () => {
          const nodes = [tdCursor];
          for (let i = 1; i < column; i++) {
            nodes.push(tdEmpty);
          }
          const { editorView, plugin, pluginState } = editor(doc(p('text'), table(tr(...nodes))));
          const floatingControls = mount(
            <TableFloatingControls pluginState={pluginState} editorView={editorView} />
          );
          plugin.props.onFocus!(editorView, event);
          expect(floatingControls.find(ColumnControlsButtonWrap)).to.have.length(column);
          floatingControls.unmount();
        });
      });
    });

    [0, 1, 2].forEach(column => {
      context(`when HeaderButton in column ${column + 1} is clicked`, () => {
        it(`should call pluginState.selectColumn(${column})`, () => {
          const { editorView, plugin, pluginState } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
          pluginState.selectColumn = sinon.spy();
          const floatingControls = mount(
            <TableFloatingControls pluginState={pluginState} editorView={editorView} />
          );
          plugin.props.onFocus!(editorView, event);
          floatingControls.find(ColumnControlsButton).at(column).find('button').first().simulate('click');
          expect((pluginState.selectColumn as any).calledOnce).to.equal(true);
          const { args } = (pluginState.selectColumn as any).getCalls()[0];
          expect(args[0]).to.equal(column);
          floatingControls.unmount();
        });
      });
    });
  });

  describe('RowControls', () => {
    [1, 2, 3].forEach(row => {
      context(`when table has ${row} rows`, () => {
        it(`should render ${row} row header buttons`, () => {
          const rows = [tr(tdCursor)];
          for (let i = 1; i < row; i++) {
            rows.push(tr(tdEmpty));
          }
          const { editorView, plugin, pluginState } = editor(doc(p('text'), table(...rows)));
          const floatingControls = mount(
            <TableFloatingControls pluginState={pluginState} editorView={editorView} />
          );
          plugin.props.onFocus!(editorView, event);
          expect(floatingControls.find(RowControlsButtonWrap)).to.have.length(row);
          floatingControls.unmount();
        });
      });
    });

    [0, 1, 2].forEach(row => {
      context(`when HeaderButton in row ${row + 1} is clicked`, () => {
        it(`should call pluginState.selectRow(${row})`, () => {
          const { editorView, plugin, pluginState } = editor(doc(p('text'), table(tr(tdCursor), tr(tdEmpty), tr(tdEmpty))));
          pluginState.selectRow = sinon.spy();
          const floatingControls = mount(
            <TableFloatingControls pluginState={pluginState} editorView={editorView} />
          );
          plugin.props.onFocus!(editorView, event);
          floatingControls.find(RowControlsButton).at(row).find('button').first().simulate('click');
          expect((pluginState.selectRow as any).calledOnce).to.equal(true);
          const { args } = (pluginState.selectRow as any).getCalls()[0];
          expect(args[0]).to.equal(row);
          floatingControls.unmount();
        });
      });
    });
  });

  describe('InsertColumnButton', () => {
    [0, 1, 2].forEach(index => {
      context(`when InsertColumnButton with index ${index} is clicked`, () => {
        it(`should call pluginState.insertColumn(${index})`, () => {
          const { pluginState } = editor(doc(p('text')));
          const insertColumnSpy = sinon.spy(pluginState, 'insertColumn');
          const wrapper = mount(
            <InsertColumnButton index={index} insertColumn={insertColumnSpy} />
          );
          wrapper.setState({ hovered: true });
          wrapper.find(AkButton).simulate('click');
          expect(insertColumnSpy.calledOnce).to.equal(true);
          const { args } = (insertColumnSpy as any).getCalls()[0];
          expect(args[0]).to.equal(index);
          wrapper.unmount();
        });
      });
    });
  });

  describe('InsertRowButton', () => {
    [0, 1, 2].forEach(index => {
      context(`when InsertRowButton with index ${index} is clicked`, () => {
        it(`should call pluginState.insertRow(${index})`, () => {
          const { pluginState } = editor(doc(p('text')));
          const insertRowSpy = sinon.spy(pluginState, 'insertRow');
          const wrapper = mount(
            <InsertRowButton index={index} insertRow={insertRowSpy} />
          );
          wrapper.setState({ hovered: true });
          wrapper.find(AkButton).simulate('click');
          expect(insertRowSpy.calledOnce).to.equal(true);
          const { args } = (pluginState.insertRow as any).getCalls()[0];
          expect(args[0]).to.equal(index);
          wrapper.unmount();
        });
      });
    });
  });

});
