import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './styles';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { EmojiState } from '../../plugins/emojis';
import { EditorView } from '../../prosemirror';
import EmojiIcon from '@atlaskit/icon/glyph/editor/emoji';
import { EmojiPicker as AkEmojiPicker, EmojiProvider, emojiPickerWidth } from '@atlaskit/emoji';
import Layer from '@atlaskit/layer';
import ToolbarButton from '../ToolbarButton';

export interface Props {
  pluginState: EmojiState;
  editorView: EditorView;
  emojiProvider: Promise<EmojiProvider>;
}

export interface State {
  button?: HTMLElement;
  disabled?: boolean;
  isOpen: boolean;
}

export default class ToolbarEmojiPicker extends PureComponent<Props, State> {
  private pickerRef: any;
  private buttonRef: any;

  state: State = {
    isOpen: false,
  };

  componentDidMount() {
    this.state.button = ReactDOM.findDOMNode(this.buttonRef) as HTMLElement;
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    return (
      <div>
        {this.renderTrigger(this.renderPopup())}
      </div>
    );
  }

  private handlePluginStateChange = (pluginState: EmojiState) => {
    this.setState({
      disabled: !pluginState.enabled
    });
  }

  private handleButtonRef = (ref): void => {
    if (ref) {
      this.buttonRef = ref;
    } else {
      this.buttonRef = null;
    }
  }

  private onPickerRef = (ref: any) => {
    if (ref) {
      document.addEventListener('click', this.handleClickOutside);
    } else {
      document.removeEventListener('click', this.handleClickOutside);
    }
    this.pickerRef = ref;
  }

  private close = () => {
    this.setState({
      isOpen: false,
    });
  }

  private toggleOpen = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }

  private handleClickOutside = (e) => {
    const picker = ReactDOM.findDOMNode(this.pickerRef);
    if (!picker || !picker.contains(e.target)) {
      this.close();
    }
  }

  private renderPopup() {
    const { disabled, isOpen } = this.state;
    if (disabled || !isOpen) {
      return null;
    }

    return (
      <div>
        <AkEmojiPicker
          emojiProvider={this.props.emojiProvider}
          onSelection={this.handleSelectedEmoji}
          onPickerRef={this.onPickerRef}
        />
      </div>
    );
  }

  private renderTrigger(content) {
    const { isOpen, disabled, button } = this.state;
    let offset = '0 0';
    if (button) {
      const buttonRect = button.getBoundingClientRect();
      offset = `${this.getOffsetX(buttonRect)} 0`;
   }

    return (
      <Layer
        content={content}
        position="top left"
        offset={offset}
        autoFlip={['top', 'bottom']}
        boundariesElement="scrollParent"
      >
        <ToolbarButton
          selected={isOpen}
          disabled={disabled}
          onClick={this.toggleOpen}
          iconBefore={<EmojiIcon label="Emoji" />}
          ref={this.handleButtonRef}
          title="Emoji"
        />
      </Layer>
    );
  }

  private getOffsetX = (buttonRect: ClientRect): number => {
    const editorRect = this.props.editorView.dom.getBoundingClientRect();
    return -(buttonRect.left + emojiPickerWidth - editorRect.right) - styles.marginRight;
  }

  @analytics('atlassian.editor.emoji.button')
  private handleSelectedEmoji = (emojiId: any, emoji: any): boolean => {
    if (this.state.isOpen) {
      this.props.pluginState.insertEmoji(emojiId);
      this.close();
      return true;
    }
    return false;
  }
}
