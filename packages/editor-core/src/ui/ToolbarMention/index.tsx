import MentionIcon from '@atlaskit/icon/glyph/editor/mention';
import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { EditorView, PluginKey } from '../../prosemirror';
import { MentionsState } from '../../plugins/mentions';
import { ToolbarButton } from './styles';

export interface Props {
  editorView?: EditorView;
  pluginKey: PluginKey;
}

export interface State {
  disabled: boolean;
}

export default class ToolbarMention extends PureComponent<Props, State> {
  state: State = { disabled: false };
  private pluginState?: any;

  componentWillMount() {
    const { editorView, pluginKey } = this.props;

    if (!editorView) {
      return;
    }

    this.pluginState = pluginKey.getState(editorView.state);
  }

  componentDidMount() {
    this.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUmount() {
    this.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { disabled } = this.state;

    return (
      <ToolbarButton
        onClick={this.handleInsertMention}
        disabled={disabled}
        title="Mention a person (@)"
        iconBefore={<MentionIcon label="Add mention" />}
      />
    );
  }

  private handlePluginStateChange = (pluginState: MentionsState) => {
    this.setState({
      disabled: !pluginState.enabled,
    });
  }

  @analytics('atlassian.editor.mention.button')
  private handleInsertMention = (): boolean => {
    this.pluginState.insertMentionQuery();
    return true;
  }
}
