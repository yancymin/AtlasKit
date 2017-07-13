import TableIcon from '@atlaskit/icon/glyph/editor/table';
import * as React from 'react';
import { PureComponent } from 'react';
import { toggleTable, tooltip } from '../../keymaps';
import { TableState } from '../../plugins/table';
import ToolbarButton from '../ToolbarButton';
import { EditorView } from '../../prosemirror';

export interface Props {
  editorView: EditorView;
  pluginState: TableState;
  disabled?: boolean;
}

export interface State {
  tableActive: boolean;
  tableDisabled: boolean;
  tableHidden: boolean;
}

export default class ToolbarTable extends PureComponent<Props, State> {
  state: State = {
    tableActive: false,
    tableDisabled: false,
    tableHidden: false,
  };

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    if (this.state.tableHidden) {
      return null;
    }

    return (
      <ToolbarButton
        onClick={this.handleClick}
        selected={this.state.tableActive}
        disabled={this.state.tableDisabled || this.props.disabled}
        title={tooltip(toggleTable)}
        iconBefore={<TableIcon label="Table" />}
      />
    );
  }

  private handlePluginStateChange = (pluginState: TableState) => {
    const { tableActive, tableDisabled, tableHidden } = pluginState;
    this.setState({ tableActive, tableDisabled, tableHidden });
  }

  private handleClick = () => {
    if (!this.state.tableDisabled) {
      const { editorView } = this.props;
      this.props.pluginState.createTable()(editorView.state, editorView.dispatch);
    }
  }
}
