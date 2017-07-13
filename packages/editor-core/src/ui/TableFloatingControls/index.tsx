import * as React from 'react';
import { PureComponent } from 'react';
import { TableState } from '../../plugins/table';
import Popup from '../Popup';
import { CellSelection, Node, EditorView } from '../../prosemirror';
import CornerControls from './CornerControls';
import ColumnControls from './ColumnControls';
import RowControls from './RowControls';

export interface Props {
  pluginState: TableState;
  editorView: EditorView;
  popupsBoundariesElement?: HTMLElement;
  popupsMountPoint?: HTMLElement;
}

export interface State {
  tableElement?: HTMLElement;
  tableNode?: Node;
  cellSelection?: CellSelection;
  tableSelected: boolean;
}

export default class TableFloatingControls extends PureComponent<Props, State> {
  state: State = {
    tableSelected: false
  };
  content?: HTMLElement;

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  handleMouseDown = () => {
    this.props.pluginState.updateToolbarFocused(true);
  }

  handleBlur = () => {
    // hide toolbar if it's currently in focus and editor looses focus
    if (!this.props.pluginState.toolbarFocused) {
      this.props.pluginState.updateEditorFocused(false);
      this.props.pluginState.update(this.props.editorView.docView, true);
    }
    this.props.pluginState.updateToolbarFocused(false);
  }

  handleCornerMouseOver = () => {
    this.setState({ tableSelected: true });
    this.props.pluginState.hoverTable();
  }

  handleCornerMouseOut = () => {
    this.setState({ tableSelected: false });
    this.props.pluginState.resetHoverSelection();
  }

  render() {
    const { tableElement, tableSelected } = this.state;
    const { pluginState, popupsBoundariesElement, popupsMountPoint } = this.props;

    if (!tableElement) {
      return null;
    }

    return (
      <Popup
        target={tableElement}
        boundariesElement={popupsBoundariesElement}
        mountTo={popupsMountPoint}
        alignY="top"
      >
        <div onMouseDown={this.handleMouseDown} onBlur={this.handleBlur} className={tableSelected ? 'tableSelected' : ''}>
          <CornerControls
            tableElement={tableElement}
            isSelected={pluginState.isTableSelected}
            selectTable={pluginState.selectTable}
            insertColumn={pluginState.insertColumn}
            insertRow={pluginState.insertRow}
            onMouseOver={this.handleCornerMouseOver}
            onMouseOut={this.handleCornerMouseOut}
          />
          <ColumnControls
            tableElement={tableElement}
            isSelected={pluginState.isColumnSelected}
            selectColumn={pluginState.selectColumn}
            insertColumn={pluginState.insertColumn}
            hoverColumn={pluginState.hoverColumn}
            resetHoverSelection={pluginState.resetHoverSelection}
          />
          <RowControls
            tableElement={tableElement}
            isSelected={pluginState.isRowSelected}
            selectRow={pluginState.selectRow}
            insertRow={pluginState.insertRow}
            hoverRow={pluginState.hoverRow}
            resetHoverSelection={pluginState.resetHoverSelection}
          />
        </div>
      </Popup>
    );
  }

  private handlePluginStateChange = (pluginState: TableState) => {
    const { tableElement, tableNode, cellSelection } = pluginState;
    this.setState({ tableElement, tableNode, cellSelection });
  }
}
