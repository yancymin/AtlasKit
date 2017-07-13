import CodeIcon from '@atlaskit/icon/glyph/editor/code';
import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import ToolbarButton from '../ToolbarButton';
import { TextFormattingState } from '../../plugins/text-formatting';
import { toggleCode, tooltip } from '../../keymaps';
import { EditorView } from '../../prosemirror';

export interface Props {
  disabled?: boolean;
  editorView: EditorView;
  pluginState: TextFormattingState;
}

export interface State {
  isActive?: boolean;
  isDisabled?: boolean;
  isEnabled?: boolean;
}

export default class ToolbarInlineCode extends PureComponent<Props, State> {

  state: State = {};

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  private handlePluginStateChange = (pluginState: TextFormattingState) => {
    this.setState({
      isActive: pluginState.codeActive,
      isDisabled: pluginState.codeDisabled,
      isEnabled: !pluginState.codeHidden,
    });
  }

  @analytics('atlassian.editor.format.code.toggle')
  private handleOnClick = (): boolean => {
    if (!this.state.isDisabled) {
      return this.props.pluginState.toggleCode(this.props.editorView);
    }
    return false;
  }

  render() {
    const { isDisabled, isEnabled } = this.state;
    return !isEnabled ? null : (
      <ToolbarButton
        disabled={isDisabled || this.props.disabled}
        onClick={this.handleOnClick}
        selected={this.state.isActive}
        title={tooltip(toggleCode)}
        iconBefore={<CodeIcon label="Code" />}
      />
    );
  }
}
