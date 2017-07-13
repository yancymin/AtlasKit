import * as React from 'react';
import { PureComponent } from 'react';
import ImageIcon from '@atlaskit/icon/glyph/editor/image';
import { EditorView, PluginKey } from '../../prosemirror';
import { MediaPluginState } from '../../plugins/media';
import ToolbarButton from '../ToolbarButton';

export interface Props {
  editorView: EditorView;
  pluginKey: PluginKey;
}

export interface State {
  disabled: boolean;
}

export default class ToolbarMedia extends PureComponent<Props, State> {
  state: State = {disabled: false};
  pluginState: MediaPluginState;

  constructor(props) {
    super(props);

    const { editorView, pluginKey } = this.props;
    this.pluginState = pluginKey.getState(editorView.state);
  }

  componentDidMount() {
    this.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    if (this.state.disabled) {
      return null;
    }

    return (
      <ToolbarButton
        onClick={this.handleClickMediaButton}
        title="Insert files and images"
        iconBefore={<ImageIcon label="Insert files and images" />}
      />
    );
  }

  private handlePluginStateChange = (pluginState: MediaPluginState) => {
    this.setState({
      disabled: !pluginState.allowsUploads
    });
  }

  private handleClickMediaButton = () => {
    this.pluginState.showMediaPicker();
  }
}
