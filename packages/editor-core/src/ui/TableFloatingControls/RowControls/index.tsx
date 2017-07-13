import * as React from 'react';
import { Component } from 'react';
import { toolbarSize } from '../styles';
import {
  RowInner,
  RowContainer,
  RowControlsButtonWrap,
  HeaderButton,
} from './styles';
import InsertRowButton from './InsertRowButton';

export interface Props {
  tableElement: HTMLElement;
  isSelected: (row: number) => boolean;
  selectRow: (row: number) => void;
  insertRow: (row: number) => void;
  hoverRow: (row: number) => void;
  resetHoverSelection: () => void;
}

export default class RowControls extends Component<Props, any> {
  render () {
    const rows = this.props.tableElement.querySelector('tbody')!.children;
    const nodes: any = [];
    const tableWidth = this.props.tableElement.offsetWidth;

    for (let i = 0, len = rows.length; i < len; i++) {
      nodes.push(
        <RowControlsButtonWrap
          key={i}
          className={this.props.isSelected(i) ? 'active' : ''}
          style={{ height: (rows[i] as HTMLElement).offsetHeight + 1 }}
        >
          {/* tslint:disable:jsx-no-lambda */}
          <HeaderButton
            onClick={() => this.props.selectRow(i)}
            onMouseOver={() => this.props.hoverRow(i)}
            onMouseOut={this.props.resetHoverSelection}
          />
          {/* tslint:enable:jsx-no-lambda */}
          <InsertRowButton
            insertRow={this.props.insertRow}
            index={i + 1}
            lineMarkerWidth={tableWidth + toolbarSize}
          />
        </RowControlsButtonWrap>
      );
    }

    return (
      <RowContainer>
        <RowInner>{nodes}</RowInner>
      </RowContainer>
    );
  }
}
