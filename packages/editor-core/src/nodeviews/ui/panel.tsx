import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import {
  EditorView,
  Node as PMNode,
  NodeView
} from '../../prosemirror';
import {
  akBorderRadius,
  akGridSizeUnitless,
  akColorG50,
  akColorP50,
  akColorB50,
  akColorY50,
  akColorG400,
  akColorP400,
  akColorB400,
  akColorY400
} from '@atlaskit/util-shared-styles';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import TipIcon from '@atlaskit/icon/glyph/editor/hint';
import NoteIcon from '@atlaskit/icon/glyph/editor/note';
import WarningIcon from '@atlaskit/icon/glyph/warning';

const panelColor = {
  info: akColorB50,
  note: akColorP50,
  tip: akColorG50,
  warning: akColorY50
};

const iconColor = {
  info: akColorB400,
  note: akColorP400,
  tip: akColorG400,
  warning: akColorY400
};

const panelIcons = {
  info: InfoIcon,
  tip: TipIcon,
  note: NoteIcon,
  warning: WarningIcon
};

// tslint:disable-next-line:variable-name
const Wrapper = styled.div`
  border-radius: ${akBorderRadius};
  margin: ${akGridSizeUnitless / 2}px 0;
  padding: ${akGridSizeUnitless}px;
`;

// tslint:disable-next-line:variable-name
const ContentWrapper = styled.div`
  margin: 1px 0 1px ${akGridSizeUnitless * 4}px;
`;

// tslint:disable-next-line:variable-name
const IconWrapper = styled.span`
  height: 24px;
  width: 24px;
  position: absolute;
`;

type getPosHandler = () => number;

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
}

class Panel implements NodeView {
  private domRef: HTMLElement | undefined;
  private contentDOMRef: HTMLElement | undefined;
  private panelType: string;

  constructor(node: PMNode, view: EditorView, getPos: getPosHandler) {
    this.panelType = node.attrs.panelType;
    this.renderReactComponent();
  }

  private handleRef = (node: HTMLElement | undefined) => {
    this.contentDOMRef = node;
  }

  private renderReactComponent() {
    const { panelType } = this;
    this.domRef = document.createElement('div');
    this.domRef.dataset.panelType = this.panelType;

    // tslint:disable-next-line:variable-name
    const Icon = panelIcons[panelType];

    ReactDOM.render(
      <Wrapper style={{background: panelColor[panelType]}}>
        <IconWrapper style={{color: iconColor[panelType]}}>
          <Icon label={`Panel ${panelType}`} />
        </IconWrapper>
        <ContentWrapper innerRef={this.handleRef} />
      </Wrapper>,
      this.domRef
    );
  }

  get dom() {
    return this.domRef;
  }

  get contentDOM() {
    return this.contentDOMRef;
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.domRef!);
    this.domRef = undefined;
    this.contentDOMRef = undefined;
  }
}

export const panelNodeView = (node: any, view: any, getPos: () => number): NodeView => {
  return new Panel(node, view, getPos);
};
