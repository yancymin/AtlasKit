import * as React from 'react';
import { Component } from 'react';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
import AkButton from '@atlaskit/button';
import {
  InsertRowButtonWrap,
  InsertRowMarker,
  InsertRowButtonInner,
  RowLineMarker,
} from './styles';

export interface ButtonProps {
  index: number;
  style?: object;
  insertRow: (row: number) => void;
  lineMarkerWidth?: number;
}

export default class InsertRowButton extends Component<ButtonProps, any> {
  handleInsert = () => this.props.insertRow(this.props.index);

  render () {
    return (
      <InsertRowButtonWrap style={this.props.style}>
        <InsertRowButtonInner>
          <AkButton
            onClick={this.handleInsert}
            iconBefore={<AddIcon label="Add row" />}
            appearance="primary"
            spacing="none"
          />
        </InsertRowButtonInner>
        <RowLineMarker style={{ width: this.props.lineMarkerWidth }} />
        <InsertRowMarker />
      </InsertRowButtonWrap>
    );
  }
}
