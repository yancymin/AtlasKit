import * as React from 'react';
import { Component } from 'react';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
import AkButton from '@atlaskit/button';
import {
  InsertColumnButtonWrap,
  InsertColumnMarker,
  InsertColumnButtonInner,
  ColumnLineMarker,
} from './styles';

export interface ButtonProps {
  index: number;
  style?: object;
  insertColumn: (column: number) => void;
  lineMarkerHeight?: number;
}

export default class InsertColumnButton extends Component<ButtonProps, any> {
  handleInsert = () => this.props.insertColumn(this.props.index);

  render () {
    return (
      <InsertColumnButtonWrap style={this.props.style}>
        <InsertColumnButtonInner>
          <AkButton
            onClick={this.handleInsert}
            iconBefore={<AddIcon label="Add column" />}
            appearance="primary"
            spacing="none"
          />
        </InsertColumnButtonInner>
        <ColumnLineMarker style={{ height: this.props.lineMarkerHeight }} />
        <InsertColumnMarker />
      </InsertColumnButtonWrap>
    );
  }
}
