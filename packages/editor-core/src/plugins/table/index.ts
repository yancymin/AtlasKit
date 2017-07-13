import {
  EditorState,
  EditorView,
  Plugin,
  PluginKey,
  tableEditing,
  NodeViewDesc,
  CellSelection,
  Selection,
  TableMap,
  Node,
  Transaction,
  Fragment,
  Slice,
  Decoration,
  DecorationSet,
} from '../../prosemirror';
import keymapHandler from './keymap';
import * as tableBaseCommands from '../../prosemirror/prosemirror-tables';
import { getColumnPos, getRowPos, getTablePos } from './utils';
export type TableStateSubscriber = (state: TableState) => any;

export interface Command {
  (state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;
}

export interface SelectedCell {
  pos: number;
  node: Node;
}

export class TableState {
  keymapHandler: Function;
  cellElement?: HTMLElement;
  tableElement?: HTMLElement;
  editorFocused: boolean = false;
  tableNode?: Node;
  cellSelection?: CellSelection;
  toolbarFocused: boolean = false;
  tableHidden: boolean = false;
  tableDisabled: boolean = false;
  tableActive: boolean = false;
  domEvent: boolean = false;
  hoveredCells: SelectedCell[] = [];

  private view: EditorView;
  private changeHandlers: TableStateSubscriber[] = [];

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];

    const { table, tableCell, tableRow, tableHeader } = state.schema.nodes;
    this.tableHidden = !table || !tableCell || !tableRow || !tableHeader;
  }

  goToNextCell(direction: number): Command {
    return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
      if (!this.tableNode) {
        return false;
      }
      const offset = this.tableStartPos();
      if (!offset) {
        return false;
      }
      const map = TableMap.get(this.tableNode);
      const lastCellPos =  map.positionAt(map.height - 1, map.width - 1, this.tableNode) + offset + 1;
      if (lastCellPos ===  this.getCurrentCellStartPos() && direction === 1) {
        this.insertRow(map.height);
        return true;
      }
      return tableBaseCommands.goToNextCell(direction)(state, dispatch);
    };
  }

  createTable (): Command {
    return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
      if (this.tableDisabled || this.tableElement) {
        return false;
      }
      this.focusEditor();
      const table = this.createTableNode(3, 3);
      const tr = state.tr.replaceSelectionWith(table);
      tr.setSelection(Selection.near(tr.doc.resolve(state.selection.from)));
      dispatch(tr.scrollIntoView());
      return true;
    };
  }

  insertColumn = (column: number): void => {
    if (this.tableNode) {
      const map = TableMap.get(this.tableNode);
      const { dispatch } = this.view;

      // last column
      if (column === map.width) {
        // to add a column we need to move the cursor to an appropriate cell first
        const prevColPos = map.positionAt(0, column - 1, this.tableNode);
        this.moveCursorTo(prevColPos);
        tableBaseCommands.addColumnAfter(this.view.state, dispatch);
        // then we move the cursor to the newly created cell
        const nextPos = TableMap.get(this.tableNode).positionAt(0, column, this.tableNode);
        this.moveCursorTo(nextPos);
      } else {
        const pos = map.positionAt(0, column, this.tableNode);
        this.moveCursorTo(pos);
        tableBaseCommands.addColumnBefore(this.view.state, dispatch);
        this.moveCursorTo(pos);
      }
    }
  }

  insertRow = (row: number): void => {
    if (this.tableNode) {
      const map = TableMap.get(this.tableNode);
      const { dispatch } = this.view;

      // last row
      if (row === map.height) {
        const prevRowPos =  map.positionAt(row - 1, 0, this.tableNode);
        this.moveCursorTo(prevRowPos);
        tableBaseCommands.addRowAfter(this.view.state, dispatch);
        const nextPos = TableMap.get(this.tableNode).positionAt(row, 0, this.tableNode);
        this.moveCursorTo(nextPos);
      } else {
        const pos = map.positionAt(row, 0, this.tableNode);
        this.moveCursorTo(pos);
        tableBaseCommands.addRowBefore(this.view.state, dispatch);
        this.moveCursorTo(pos);
      }
    }
  }

  remove = (): void => {
    if (!this.cellSelection) {
      return;
    }
    const { state, dispatch } = this.view;
    const isRowSelected = this.cellSelection.isRowSelection();
    const isColumnSelected = this.cellSelection.isColSelection();

    // the whole table
    if (isRowSelected && isColumnSelected) {
      tableBaseCommands.deleteTable(state, dispatch);
      this.focusEditor();
    } else if (isColumnSelected) {
      tableBaseCommands.deleteColumn(state, dispatch);
      this.moveCursorToFirstCell();
    } else if (isRowSelected) {
      tableBaseCommands.deleteRow(state, dispatch);
      this.moveCursorToFirstCell();
    } else {
      // replace selected cells with empty cells
      this.emptySelectedCells();
      this.moveCursorInsideTableTo(state.selection.from);
    }
  }

  subscribe(cb: TableStateSubscriber): void {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: TableStateSubscriber): void {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  updateEditorFocused(editorFocused: boolean): void {
    this.editorFocused = editorFocused;
  }

  updateToolbarFocused(toolbarFocused: boolean): void {
    this.toolbarFocused = toolbarFocused;
  }

  selectColumn = (column: number): void => {
    if (this.tableNode) {
      const {from, to} = getColumnPos(column, this.tableNode);
      this.createCellSelection(from, to);
    }
  }

  selectRow = (row: number): void => {
    if (this.tableNode) {
      const {from, to} = getRowPos(row, this.tableNode);
      this.createCellSelection(from, to);
    }
  }

  selectTable = (): void => {
    if (this.tableNode) {
      const {from, to} = getTablePos(this.tableNode);
      this.createCellSelection(from, to);
    }
  }

  hoverColumn = (column: number): void => {
    if (this.tableNode) {
      const {from, to} = getColumnPos(column, this.tableNode);
      this.createHoverSelection(from, to);
    }
  }

  hoverRow = (row: number): void => {
    if (this.tableNode) {
      const {from, to} = getRowPos(row, this.tableNode);
      this.createHoverSelection(from, to);
    }
  }

  hoverTable = () => {
    if (this.tableNode) {
      const {from, to} = getTablePos(this.tableNode);
      this.createHoverSelection(from, to);
    }
  }

  resetHoverSelection = () => {
    this.hoveredCells = [];
    this.view.dispatch(this.view.state.tr);
  }

  isColumnSelected = (column: number): boolean => {
    if (this.tableNode && this.cellSelection) {
      const map = TableMap.get(this.tableNode);
      const start = this.cellSelection.$anchorCell.start(-1);
      const anchor = map.colCount(this.cellSelection.$anchorCell.pos - start);
      const head = map.colCount(this.cellSelection.$headCell.pos - start);
      return (
        this.cellSelection.isColSelection() &&
        (column <= Math.max(anchor, head) && column >= Math.min(anchor, head))
      );
    }
    return false;
  }

  isRowSelected = (row: number): boolean => {
    if (this.cellSelection) {
      const anchor = this.cellSelection.$anchorCell.index(-1);
      const head = this.cellSelection.$headCell.index(-1);
      return (
        this.cellSelection.isRowSelection() &&
        (row <= Math.max(anchor, head) && row >= Math.min(anchor, head))
      );
    }
    return false;
  }

  isTableSelected = (): boolean => {
    if (this.cellSelection) {
      return this.cellSelection.isColSelection() && this.cellSelection.isRowSelection();
    }
    return false;
  }

  update(docView: NodeViewDesc, domEvent: boolean = false) {
    let dirty = this.updateSelection();

    const tableElement = this.editorFocused ? this.getTableElement(docView) : undefined;
    if (domEvent && tableElement || tableElement !== this.tableElement) {
      this.tableElement = tableElement;
      this.domEvent = domEvent;
      dirty = true;
    }

    const tableNode = this.getTableNode();
    if (tableNode !== this.tableNode) {
      this.tableNode = tableNode;
      dirty = true;
    }

    const cellElement = this.cellSelection ? this.getFirstSelectedCellElement(docView) : undefined;
    if (cellElement !== this.cellElement) {
      this.cellElement = cellElement;
      dirty = true;
    }

    const tableActive = !!tableElement;
    if (tableActive !== this.tableActive) {
      this.tableActive = tableActive;
      dirty = true;
    }

    const tableDisabled = !this.canInsertTable();
    if (tableDisabled !== this.tableDisabled) {
      this.tableDisabled = tableDisabled;
      dirty = true;
    }

    if (dirty) {
      this.triggerOnChange();
    }
  }

  setView(view: EditorView): void {
    this.view = view;
  }

  tableStartPos(): number | undefined {
    const { $from } = this.view.state.selection;
    for (let i = $from.depth; i > 0; i--) {
      const node = $from.node(i);
      if(node.type === this.view.state.schema.nodes.table) {
        return $from.start(i);
      }
    }
  }

  cut (): void {
    this.closeFloatingToolbar();
  }

  copy (): void {
    this.closeFloatingToolbar();
  }

  paste (): void {
    this.closeFloatingToolbar();
  }

  private closeFloatingToolbar (): void {
    this.clearSelection();
    this.triggerOnChange();
  }

  private createHoverSelection (from: number, to: number): void {
    if (!this.tableNode) {
      return;
    }
    const offset = this.tableStartPos();
    if (offset) {
      const { state } = this.view;
      const map = TableMap.get(this.tableNode);
      const cells = map.cellsInRect(map.rectBetween(from, to));

      cells.forEach(cellPos => {
        const pos = cellPos + offset;
        const node = state.doc.nodeAt(pos);
        if (node) {
          this.hoveredCells.push({node, pos});
        }
      });
      // trigger state change to be able to pick it up in the decorations handler
      this.view.dispatch(state.tr);
    }
  }

  private getTableElement(docView: NodeViewDesc): HTMLElement | undefined {
    const offset = this.tableStartPos();
    if (offset) {
      const { node } = docView.domFromPos(offset);
      if (node) {
        return node.parentNode as HTMLElement;
      }
    }
  }

  private getFirstSelectedCellElement(docView: NodeViewDesc): HTMLElement | undefined {
    const offset = this.firstSelectedCellStartPos();
    if (offset) {
      const { node } = docView.domFromPos(offset);
      if (node) {
        return node as HTMLElement;
      }
    }
  }

  private firstSelectedCellStartPos(): number | undefined {
    if (!this.tableNode) {
      return;
    }
    const offset = this.tableStartPos();
    if (offset) {
      const { state } = this.view;
      const { $anchorCell, $headCell } = state.selection as CellSelection;
      const { tableCell, tableHeader } = state.schema.nodes;
      const map = TableMap.get(this.tableNode);
      const start =  $anchorCell.start(-1);
      // array of selected cells positions
      const cells = map.cellsInRect(map.rectBetween($anchorCell.pos - start, $headCell.pos - start));
      // first selected cell position
      const firstCellPos = cells[0] + offset + 1;
      const $from = state.doc.resolve(firstCellPos);
      for (let i = $from.depth; i > 0; i--) {
        const node = $from.node(i);
        if(node.type === tableCell || node.type === tableHeader) {
          return $from.start(i);
        }
      }
    }
  }

  private getCurrentCellStartPos(): number | undefined {
    const { $from } = this.view.state.selection;
    const { tableCell, tableHeader } = this.view.state.schema.nodes;
    for (let i = $from.depth; i > 0; i--) {
      const node = $from.node(i);
      if(node.type === tableCell || node.type === tableHeader) {
        return $from.start(i);
      }
    }
  }

  private getTableNode(): Node | undefined {
    const { $from } = this.view.state.selection;
    for (let i = $from.depth; i > 0; i--) {
      const node = $from.node(i);
      if(node.type === this.view.state.schema.nodes.table) {
        return node;
      }
    }
  }

  private triggerOnChange(): void {
    this.changeHandlers.forEach(cb => cb(this));
  }

  private createCellSelection (from: number, to: number): void {
    const { state } = this.view;
    // here "from" and "to" params are table-relative positions, therefore we add table offset
    const offset = this.tableStartPos();
    if (offset) {
      const $anchor = state.doc.resolve(from + offset);
      const $head = state.doc.resolve(to + offset);
      this.view.dispatch(
        this.view.state.tr.setSelection(new CellSelection($anchor, $head))
      );
    }
  }

  // we keep track of selection changes because
  // 1) we want to mark toolbar buttons as active when the whole row/col is selected
  // 2) we want to drop selection if editor looses focus
  private updateSelection (): boolean {
    const { selection } = this.view.state;
    let dirty = false;

    if (selection instanceof CellSelection) {
      if (selection !== this.cellSelection) {
        this.cellSelection = selection;
        dirty = true;
      }
      // drop selection if editor looses focus
      if (!this.editorFocused) {
        this.clearSelection();
      }
    } else if (this.cellSelection) {
      this.cellSelection = undefined;
      dirty = true;
    }
    return dirty;
  }

  private clearSelection () {
    const { state } = this.view;
    this.cellElement = undefined;
    this.view.dispatch(state.tr.setSelection(Selection.near(state.selection.$from)));
  }

  private createTableNode (rows: number, columns: number): Node {
    const { state } = this.view;
    const { table, tableRow, tableCell, tableHeader } = state.schema.nodes;
    const rowNodes: Node[] = [];

    for (let i = 0; i < rows; i ++) {
      const cell = i === 0 ? tableHeader : tableCell;
      const cellNodes: Node[] = [];
      for (let j = 0; j < columns; j ++) {
        cellNodes.push(cell.createAndFill());
      }
      rowNodes.push(tableRow.create(null, Fragment.from(cellNodes)));
    }
    return table.create(null, Fragment.from(rowNodes));
  }

  private canInsertTable (): boolean {
    const { state } = this.view;
    const { $from, to } = state.selection;
    const { code } = state.schema.marks;
    for (let i = $from.depth; i > 0; i--) {
      const node = $from.node(i);
      // inline code and codeBlock are excluded
      if(node.type === state.schema.nodes.codeBlock || (code && state.doc.rangeHasMark($from.pos, to, code))) {
        return false;
      }
    }
    return true;
  }

  private emptySelectedCells (): void {
    if (!this.cellSelection) {
      return;
    }

    const { tr, schema } = this.view.state;
    const emptyCell = schema.nodes.tableCell.createAndFill().content;
    this.cellSelection.forEachCell((cell, pos) => {
      if (!cell.content.eq(emptyCell)) {
        const slice = new Slice(emptyCell, 0, 0);
        tr.replace(tr.mapping.map(pos + 1), tr.mapping.map(pos + cell.nodeSize - 1), slice);
      }
    });
    if (tr.docChanged) {
      this.view.dispatch(tr);
    }
  }

  private focusEditor (): void {
    if (!this.view.hasFocus()) {
      this.view.focus();
    }
  }

  private moveCursorInsideTableTo (pos: number): void {
    this.focusEditor();
    const { tr } = this.view.state;
    tr.setSelection(Selection.near(tr.doc.resolve(pos)));
    this.view.dispatch(tr);
  }

  private moveCursorTo (pos: number): void {
    const offset = this.tableStartPos();
    if (offset) {
      this.moveCursorInsideTableTo(pos + offset);
    }
  }

  private moveCursorToFirstCell (): void {
    if (this.tableNode) {
      const map = TableMap.get(this.tableNode);
      const pos =  map.positionAt(0, 0, this.tableNode);
      this.moveCursorTo(pos);
    }
  }
}

export const stateKey = new PluginKey('tablePlugin');

const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new TableState(state);
    },
    apply(tr, pluginState: TableState, oldState, newState) {
      const stored = tr.getMeta(stateKey);
      if (stored) {
        pluginState.update(stored.docView, stored.domEvent);
      }
      return pluginState;
    }
  },
  key: stateKey,
  view: (editorView: EditorView) => {
    const pluginState = stateKey.getState(editorView.state);
    pluginState.setView(editorView);
    pluginState.update(editorView.docView);
    pluginState.keymapHandler = keymapHandler(pluginState);

    return {
      update: (view: EditorView, prevState: EditorState<any>) => {
        pluginState.update(view.docView);
      }
    };
  },
  props: {
    decorations: (state: EditorState<any>) => {
      const pluginState = stateKey.getState(state);
      if (!pluginState.hoveredCells.length) {
        return;
      }
      const cells: Decoration[] = pluginState.hoveredCells.map(cell => {
        return Decoration.node(cell.pos, cell.pos + cell.node.nodeSize, {class: 'hoveredCell'});
      });
      return DecorationSet.create(state.doc, cells);
    },
    handleKeyDown(view, event) {
      return stateKey.getState(view.state).keymapHandler(view, event);
    },
    handleClick(view: EditorView, pos: number, event) {
      stateKey.getState(view.state).update(view.docView, true);
      return false;
    },
    onFocus(view: EditorView, event) {
      const pluginState = stateKey.getState(view.state);
      pluginState.updateEditorFocused(true);
      pluginState.update(view.docView, true);
    },
    onBlur(view: EditorView, event) {
      const pluginState = stateKey.getState(view.state);
      if (pluginState.toolbarFocused) {
        pluginState.updateToolbarFocused(false);
      } else {
        pluginState.updateEditorFocused(false);
        pluginState.update(view.docView, true);
      }
    },
  }
});

const plugins = () => {
  return [plugin, tableEditing()].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;

// Disable inline table editing and resizing controls in Firefox
// https://github.com/ProseMirror/prosemirror/issues/432
setTimeout(() => {
  document.execCommand('enableObjectResizing', false, 'false');
  document.execCommand('enableInlineTableEditing', false, 'false');
});
