import * as React from 'react';
import { Component } from 'react';
import { toolbarSize } from '../styles';
import {
  CornerContainer,
  CornerButton,
} from './styles';
import InsertColumnButton from '../ColumnControls/InsertColumnButton';
import InsertRowButton from '../RowControls/InsertRowButton';

export interface Props {
  tableElement: HTMLElement;
  isSelected: () => boolean;
  selectTable: () => void;
  insertColumn: (column: number) => void;
  insertRow: (row: number) => void;
  onMouseOver: () => void;
  onMouseOut: () => void;
}

export default class CornerControls extends Component<Props, any> {
  render () {
    const { tableElement } = this.props;
    const tableWidth = tableElement.offsetWidth;
    const tableHeight = tableElement.offsetHeight;

    return (
      <CornerContainer className={this.props.isSelected() ? 'active' : ''}>
        <CornerButton
          onClick={this.props.selectTable}
          onMouseOver={this.props.onMouseOver}
          onMouseOut={this.props.onMouseOut}
        />
        <InsertColumnButton
          style={{right: - toolbarSize, top: - toolbarSize - 8}}
          index={0}
          insertColumn={this.props.insertColumn}
          lineMarkerHeight={tableHeight + toolbarSize}
        />
        <InsertRowButton
          style={{bottom: - toolbarSize, left: - toolbarSize - 8}}
          index={0}
          insertRow={this.props.insertRow}
          lineMarkerWidth={tableWidth + toolbarSize}
        />
      </CornerContainer>
    );
  }
}
