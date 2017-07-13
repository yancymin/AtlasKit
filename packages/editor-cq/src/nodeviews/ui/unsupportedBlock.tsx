import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import {
  akBorderRadius,
  akColorN30,
  akColorN50,
} from '@atlaskit/util-shared-styles';

// tslint:disable-next-line:variable-name
const BlockNode = styled.div`
  align-items: center;
  background: ${akColorN30};
  border: 1px dashed ${akColorN50};
  border-radius: ${akBorderRadius};
  box-sizing: border-box;
  cursor: default;
  display: block;
  font-size: 13px;
  margin: 10px 0;
  min-height: 24px;
  padding: 10px;
  text-align: center;
  user-select: all;
  vertical-align: text-bottom;
  white-space: nowrap;

  '&.ProseMirror-selectednode' {
    background: ${akColorN50};
    outline: none;
  }
`;

export default class UnsupportedBlockNode extends PureComponent<{}, {}> {
  render() {
    return (
      <BlockNode>Unsupported content</BlockNode>
    );
  }
}
