import * as React from 'react';
import { PureComponent } from 'react';
import FloatingToolbar from '../FloatingToolbar';
import TipIcon from '@atlaskit/icon/glyph/editor/hint';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import NoteIcon from '@atlaskit/icon/glyph/editor/note';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import WarningIcon from '@atlaskit/icon/glyph/editor/warning';
import { EditorView } from '../../prosemirror';

import { availablePanelType, PanelState, PanelType } from '../../plugins/panel';
import { ToolbarButton, ToolbarButtonSelected, RemoveButtonWrapper } from './styles';

const icons = {
  info: InfoIcon,
  note: NoteIcon,
  tip: TipIcon,
  warning: WarningIcon,
};

export interface Props {
  editorView: EditorView;
  pluginState: PanelState;
}

export interface State {
  toolbarVisible: boolean | undefined;
  target?: HTMLElement | undefined;
  activePanelType?: string | undefined;
}

export default class PanelEdit extends PureComponent<Props, State> {
  state: State = { toolbarVisible: false };

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { target, activePanelType, toolbarVisible } = this.state;
    if (toolbarVisible) {
      return (
        <FloatingToolbar
          target={target}
          offset={[0, 3]}
        >
          {availablePanelType.map((panelType, index) => {
            // tslint:disable-next-line:variable-name
            const Icon = icons[panelType.panelType];
            // tslint:disable-next-line:variable-name
            const Button = activePanelType === panelType.panelType
              ? ToolbarButtonSelected
              : ToolbarButton;

            return (
              <Button
                key={index}
                selected={activePanelType === panelType.panelType}
                onClick={this.handleSelectPanelType.bind(this, panelType)}
                iconBefore={<Icon label={`Change panel type to ${panelType.panelType}`} />}
              />
            );
          })}
          <RemoveButtonWrapper>
            <ToolbarButton
              onClick={this.handleRemovePanel}
              iconBefore={<RemoveIcon label="Remove panel type" />}
            />
          </RemoveButtonWrapper>
        </FloatingToolbar>
      );
    } else {
      return null;
    }
  }

  private handlePluginStateChange = (pluginState: PanelState) => {
    const { element: target, activePanelType, toolbarVisible } = pluginState;
    this.setState({
      toolbarVisible,
      target,
      activePanelType,
    });
  }

  private handleSelectPanelType = (panelType: PanelType, event) => {
    const { editorView } = this.props;
    this.props.pluginState.changePanelType(editorView, panelType);
  }

  private handleRemovePanel = () => {
    const { editorView } = this.props;
    this.props.pluginState.removePanel(editorView);
  }
}
