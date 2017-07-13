import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import { Node as PMNode } from '@atlaskit/editor-core';
import { JiraLogo } from '@atlaskit/logo';
import {
  akBorderRadius,
  akColorN30,
  akColorN50,
} from '@atlaskit/util-shared-styles';

// tslint:disable-next-line:variable-name
const WrapperNode = styled.span`
  align-items: center;
  background: ${akColorN30};
  border: 1px solid ${akColorN50};
  border-radius: ${akBorderRadius};
  box-sizing: border-box;
  cursor: default;
  display: inline-flex;
  font-size: 13px;
  margin: 0 2px;
  min-height: 24px;
  padding: 0 4px;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;

  .ProseMirror-selectednode & {
    background: ${akColorN50};
    outline: none;
  }
`;

// tslint:disable-next-line:variable-name
const JiraChildNode = styled.span`
  display: inline-block;
  color: #707070;
  line-height: 24px;
  vertical-align: top;

  &:before {
    color: black;
    content: "JIRA | ";
  }
`;

// tslint:disable-next-line:variable-name
const SvgChildNode = styled.span`
  display: inline-block;
  height: 24px;
  vertical-align: top;
  width: 24px;

  & > div {
    height: 24px;
    width: 24px;
  }
`;

export interface Props {
  node: PMNode;
}

export default class JIRAIssueNode extends PureComponent<Props, {}> {
  render() {
    const { node } = this.props;
    const { issueKey } = node.attrs;

    return (
      <WrapperNode>
        <SvgChildNode>
          <JiraLogo size="small" collapseTo="icon"/>
        </SvgChildNode>
        <JiraChildNode>{issueKey}</JiraChildNode>
      </WrapperNode>
    );
  }
}
