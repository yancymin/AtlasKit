import AkButton from '@atlaskit/button';
import AkButtonGroup from '@atlaskit/button-group';
import { PureComponent } from 'react';
import * as React from 'react';
import { EmojiProvider } from '@atlaskit/emoji';
import { MentionProvider } from '@atlaskit/mention';
import { MediaProvider } from '@atlaskit/media-core';
import Spinner from '@atlaskit/spinner';
import { akColorN40 } from '@atlaskit/util-shared-styles';
import { analyticsDecorator as analytics } from '../../analytics';
import { BlockTypeState } from '../../plugins/block-type';
import { CodeBlockState } from '../../plugins/code-block';
import { EmojiState, stateKey as emojiPluginKey } from '../../plugins/emojis';
import { HyperlinkState } from '../../plugins/hyperlink';
import { ImageUploadState } from '../../plugins/image-upload';
import { ListsState } from '../../plugins/lists';
import { MentionsState, stateKey as mentionPluginKey } from '../../plugins/mentions';
import { TextFormattingState } from '../../plugins/text-formatting';
import { ClearFormattingState } from '../../plugins/clear-formatting';
import { PanelState } from '../../plugins/panel';
import { MediaPluginState, stateKey as mediaPluginKey } from '../../plugins/media';
import { TextColorState } from '../../plugins/text-color';
import { TableState } from '../../plugins/table';
import EmojiTypeAhead from '../EmojiTypeAhead';
import HyperlinkEdit from '../HyperlinkEdit';
import LanguagePicker from '../LanguagePicker';
import MentionPicker from '../MentionPicker';
import PanelEdit from '../PanelEdit';
import ToolbarBlockType from '../ToolbarBlockType';
import ToolbarEmojiPicker from '../ToolbarEmojiPicker';
import ToolbarMention from '../ToolbarMention';
import ToolbarFeedback from '../ToolbarFeedback';
import ToolbarHyperlink from '../ToolbarHyperlink';
import ToolbarLists from '../ToolbarLists';
import ToolbarTextFormatting from '../ToolbarTextFormatting';
import ToolbarAdvancedTextFormatting from '../ToolbarAdvancedTextFormatting';
import ToolbarInlineCode from '../ToolbarInlineCode';
import ToolbarImage from '../ToolbarImage';
import ToolbarMedia from '../ToolbarMedia';
import ToolbarTextColor from '../ToolbarTextColor';
import TableFloatingControls from '../TableFloatingControls';
import ToolbarTable from '../ToolbarTable';
import TableFloatingToolbar from '../TableFloatingToolbar';
import {
  Container,
  Content,
  Footer,
  FooterActions,
  Toolbar,
  SecondaryToolbar
} from './styles';
import { EditorView } from '../../prosemirror';

export interface Props {
  editorView: EditorView;
  disabled?: boolean;
  feedbackFormUrl?: string;
  onCancel?: () => void;
  onInsertImage?: () => void;
  onSave?: () => void;
  packageVersion?: string;
  packageName?: string;
  pluginStateBlockType?: BlockTypeState;
  pluginStateCodeBlock?: CodeBlockState;
  pluginStateHyperlink?: HyperlinkState;
  pluginStateLists?: ListsState;
  pluginStateTextFormatting?: TextFormattingState;
  pluginStateClearFormatting?: ClearFormattingState;
  pluginStateImageUpload?: ImageUploadState;
  pluginStateMentions?: MentionsState;
  pluginStateMedia?: MediaPluginState;
  pluginStateEmojis?: EmojiState;
  pluginStateTextColor?: TextColorState;
  pluginStateTable?: TableState;
  presenceResourceProvider?: any; // AbstractPresenceResource
  saveDisabled?: boolean;
  emojiProvider?: Promise<EmojiProvider>;
  mentionProvider?: Promise<MentionProvider>;
  mediaProvider?: Promise<MediaProvider>;
  pluginStatePanel?: PanelState;
  popupsBoundariesElement?: HTMLElement;
  popupsMountPoint?: HTMLElement;
  maxHeight?: number | undefined;
}

export interface State {
  maxHeightStyle?: any;
}

export default class ChromeExpanded extends PureComponent<Props, State> {
  private editorContainer: HTMLElement;
  private editorContent: HTMLElement;
  private maxHeightContainer: HTMLElement;
  state: State = {};

  static defaultProps = {
    saveDisabled: false,
  };

  componentWillMount() {
    const { maxHeight } = this.props;
    if (maxHeight) {
      this.setState({
        maxHeightStyle: {
          maxHeight: `${maxHeight}px`,
          overflow: 'auto',
          position: 'relative'
        }
      });
    }
  }

  componentDidMount() {
    const { maxHeight } = this.props;
    if (maxHeight) {
      this.addBorderBottom();
    }
  }

  setEditorContent = (ref) => {
    this.editorContent = ref;
  }

  private handleSpinnerComplete() {}

  private addBorderBottom = () => {
    const { maxHeight } = this.props;
    if (maxHeight) {
      let { maxHeightStyle } = this.state;
      if (this.editorContent.clientHeight >= maxHeight && !maxHeightStyle.borderBottom) {
        maxHeightStyle = { ...maxHeightStyle, borderBottom: `1px solid ${akColorN40}` };
      } else if (this.editorContent.clientHeight < maxHeight && maxHeightStyle.borderBottom) {
        maxHeightStyle = { ...maxHeightStyle, borderBottom: null };
      }
      this.setState({ maxHeightStyle });
    }
  }

  render() {
    const {
      disabled,
      editorView,
      emojiProvider,
      feedbackFormUrl,
      mentionProvider,
      onCancel,
      onSave,
      packageName,
      packageVersion,
      pluginStateBlockType,
      pluginStateClearFormatting,
      pluginStateCodeBlock,
      pluginStateEmojis,
      pluginStateHyperlink,
      pluginStateImageUpload,
      pluginStateLists,
      pluginStateMedia,
      pluginStateMentions,
      pluginStatePanel,
      pluginStateTextColor,
      pluginStateTextFormatting,
      pluginStateTable,
      saveDisabled,
      popupsMountPoint,
      popupsBoundariesElement,
    } = this.props;
    const { maxHeightStyle } = this.state;
    const iconAfter = saveDisabled
      ? <Spinner isCompleting={false} onComplete={this.handleSpinnerComplete} />
      : undefined;

    const saveButtonAppearance = saveDisabled || disabled
      ? 'default'
      : 'primary';

    return (
      <Container data-editor-chrome={true} tabIndex={-1} innerRef={this.handleEditorContainerRef}>
        <Toolbar>
          {pluginStateBlockType ?
            <ToolbarBlockType
              isDisabled={disabled}
              pluginState={pluginStateBlockType}
              editorView={editorView}
              softBlurEditor={this.softBlurEditor}
              focusEditor={this.focusEditor}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
            /> : null
          }
          {pluginStateTextFormatting ?
            <ToolbarTextFormatting
              disabled={disabled}
              pluginState={pluginStateTextFormatting}
              editorView={editorView}
            /> : null
          }
          {pluginStateTextColor ?
            <ToolbarTextColor
              disabled={disabled}
              pluginState={pluginStateTextColor}
              editorView={editorView}
              softBlurEditor={this.softBlurEditor}
              focusEditor={this.focusEditor}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
            /> : null
          }
          {pluginStateTextFormatting || pluginStateClearFormatting ?
            <ToolbarAdvancedTextFormatting
              isDisabled={disabled}
              pluginStateTextFormatting={pluginStateTextFormatting}
              pluginStateClearFormatting={pluginStateClearFormatting}
              editorView={editorView}
              softBlurEditor={this.softBlurEditor}
              focusEditor={this.focusEditor}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
            /> : null
          }
          {pluginStateTextFormatting ?
            <ToolbarInlineCode
              disabled={disabled}
              editorView={editorView}
              pluginState={pluginStateTextFormatting}
            /> : null
          }
          {pluginStateHyperlink ?
            <ToolbarHyperlink
              disabled={disabled}
              pluginState={pluginStateHyperlink}
              editorView={editorView}
            /> : null
          }
          {pluginStateTable ?
            <ToolbarTable
              disabled={disabled}
              pluginState={pluginStateTable}
              editorView={editorView}
            /> : null
          }
          {pluginStateLists ?
            <ToolbarLists
              disabled={disabled}
              pluginState={pluginStateLists}
              editorView={editorView}
            /> : null
          }
          <span style={{ flexGrow: 1 }} />
          {feedbackFormUrl ? <ToolbarFeedback packageVersion={packageVersion} packageName={packageName} /> : null}
        </Toolbar>
        <Content
          innerRef={this.setEditorContent}
          onPaste={this.addBorderBottom}
          onKeyDown={this.addBorderBottom}
        >
          <div style={maxHeightStyle} ref={this.handleMaxHeightContainer}>
            {this.props.children}
          </div>
          {pluginStateHyperlink && !disabled ?
            <HyperlinkEdit
              pluginState={pluginStateHyperlink}
              editorView={editorView}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
            /> : null}

          {pluginStateCodeBlock && !disabled ?
            <LanguagePicker
              pluginState={pluginStateCodeBlock}
              editorView={editorView}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
            /> : null}

          {pluginStateTable && !disabled &&
            <TableFloatingControls
              pluginState={pluginStateTable}
              editorView={editorView}
              popupsMountPoint={this.maxHeightContainer}
              popupsBoundariesElement={this.maxHeightContainer}
            /> }

          {pluginStateTable && !disabled &&
            <TableFloatingToolbar
              pluginState={pluginStateTable}
              editorView={editorView}
              popupsMountPoint={this.maxHeightContainer}
              popupsBoundariesElement={this.maxHeightContainer}
            /> }

          {pluginStateMentions && mentionProvider && !disabled ?
            <MentionPicker
              editorView={editorView}
              pluginKey={mentionPluginKey}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsMountPoint={popupsMountPoint}
              mentionProvider={mentionProvider}
            /> : null}

          {pluginStateEmojis && emojiProvider && !disabled ?
            <EmojiTypeAhead
              pluginKey={emojiPluginKey}
              editorView={editorView}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsMountPoint={popupsMountPoint}
              emojiProvider={emojiProvider}
            /> : null}

          {pluginStatePanel ? <PanelEdit pluginState={pluginStatePanel} editorView={editorView} /> : null}
        </Content>
        <Footer>
          <FooterActions>
            <AkButtonGroup>
              {!onSave ? null :
                <span onClick={this.handleSave}>
                  <AkButton
                    iconAfter={iconAfter}
                    isDisabled={saveDisabled}
                    appearance={saveButtonAppearance}
                  >
                    Save
                  </AkButton>
                </span>
              }
              {!onCancel ? null :
                <span onClick={this.handleCancel}>
                  <AkButton appearance="subtle">Cancel</AkButton>
                </span>
              }
            </AkButtonGroup>
          </FooterActions>
          <SecondaryToolbar>
            {pluginStateMentions && mentionProvider && !disabled ? <ToolbarMention pluginKey={mentionPluginKey} editorView={editorView} /> : null}
            {pluginStateEmojis && emojiProvider ? <ToolbarEmojiPicker pluginState={pluginStateEmojis} editorView={editorView} emojiProvider={emojiProvider} /> : null}
            {pluginStateImageUpload && !disabled ? <ToolbarImage pluginState={pluginStateImageUpload} editorView={editorView} /> : null}
            {pluginStateMedia && !disabled ? <ToolbarMedia editorView={editorView} pluginKey={mediaPluginKey} /> : null}
          </SecondaryToolbar>
        </Footer>
      </Container>
    );
  }

  /**
   * Blurs editor but keeps focus on editor container,
   * so components like inline-edit can check if focus is still inside them
   */
  softBlurEditor = () => {
    if (this.editorContainer) {
      this.editorContainer.focus();
    }
  }

  focusEditor = () => {
    this.props.editorView.focus();
  }

  private handleEditorContainerRef = ref => {
    this.editorContainer = ref;
  }

  private handleMaxHeightContainer = (ref) => {
    this.maxHeightContainer = ref;
  }

  @analytics('atlassian.editor.stop.cancel')
  private handleCancel = (): boolean => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
      return true;
    }
    return false;
  }

  @analytics('atlassian.editor.stop.save')
  private handleSave = (): boolean => {
    const { onSave } = this.props;
    if (onSave) {
      onSave();
      return true;
    }
    return false;
  }
}
