import {
  AnalyticsHandler,
  analyticsService,
  asciiEmojiPlugins,
  Chrome,
  codeBlockPlugins,
  blockTypePlugins,
  rulePlugins,
  emojisPlugins,
  hyperlinkPlugins,
  imageUploadPlugins,
  mentionsPlugins,
  listsPlugins,
  textFormattingPlugins,
  clearFormattingPlugins,
  codeBlockStateKey,
  blockTypeStateKey,
  emojisStateKey,
  hyperlinkStateKey,
  imageUploadStateKey,
  mentionsStateKey,
  listsStateKey,
  textFormattingStateKey,
  clearFormattingStateKey,
  EditorView,
  EditorState,
  Node,
  TextSelection,
  ProviderFactory,
  history,
  keymap,
  baseKeymap,
  version as coreVersion,

  // nodeviews
  nodeViewFactory,
  ReactEmojiNode,
  ReactMentionNode,
  reactNodeViewPlugins,

  // error-reporting
  // ErrorReporter,
  ErrorReportingHandler,
} from '@atlaskit/editor-core';
import { EmojiProvider } from '@atlaskit/editor-core';
import { MentionProvider } from '@atlaskit/editor-core';
import * as React from 'react';
import { PureComponent } from 'react';

import { MentionResource, MentionSource } from './mention-resource';
import markdownSerializer from './markdown-serializer';
import { parseHtml, transformHtml } from './parse-html';
import { version, name } from './version';
import schema from './schema';

export {
  AbstractMentionResource,
  EmojiProvider,
  EmojiResource,
  MentionProvider,
  MentionResource,
  PresenceProvider,
  PresenceResource,
} from '@atlaskit/editor-core';

export { version };

export type ImageUploadHandler = (e: any, insertImageFn: any) => void;

export interface Props {
  isExpandedByDefault?: boolean;
  defaultValue?: string;
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  onExpanded?: (editor?: Editor) => void;
  placeholder?: string;
  analyticsHandler?: AnalyticsHandler;
  imageUploadHandler?: ImageUploadHandler;
  errorReporter?: ErrorReportingHandler;
  mentionSource?: MentionSource;
  emojiProvider?: Promise<EmojiProvider>;
  popupsBoundariesElement?: HTMLElement;
  popupsMountPoint?: HTMLElement;
}

export interface State {
  editorView?: EditorView;
  isExpanded?: boolean;
  mentionProvider?: Promise<MentionProvider>;
  emojiProvider?: Promise<EmojiProvider>;
}

export default class Editor extends PureComponent<Props, State> {
  state: State;
  providerFactory: ProviderFactory;
  version = `${version} (editor-core ${coreVersion})`;

  constructor(props: Props) {
    super(props);
    analyticsService.handler = props.analyticsHandler || ((name) => { });

    this.state = { isExpanded: props.isExpandedByDefault };
    this.providerFactory = new ProviderFactory();
  }

  componentWillMount() {
    this.handleProviders(this.props);
  }

  componentWillUnmount() {
    this.providerFactory.destroy();
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this;
    if (props.mentionSource !== nextProps.mentionSource || props.emojiProvider !== nextProps.emojiProvider) {
      this.handleProviders(nextProps);
    }
  }

  handleProviders = (props: Props) => {
    const { emojiProvider, mentionSource } = props;

    let mentionProvider;

    if (mentionSource) {
      const mentionsResourceProvider = new MentionResource({
        minWait: 10,
        maxWait: 25,
      }, mentionSource);

      mentionProvider = Promise.resolve(mentionsResourceProvider);
    }

    this.providerFactory.setProvider('emojiProvider', emojiProvider);
    this.providerFactory.setProvider('mentionProvider', mentionProvider);
    this.setState({
      emojiProvider,
      mentionProvider
    });
  }

  /**
   * Focus the content region of the editor.
   */
  focus(): void {
    const { editorView } = this.state;
    if (editorView && !editorView.hasFocus()) {
      editorView.focus();
    }
  }

  /**
   * Expand the editor chrome
   */
  expand = () => {
    const { onExpanded } = this.props;

    this.setState({ isExpanded: true });

    if (onExpanded) {
      onExpanded(this);
    }
  }

  /**
   * Collapse the editor chrome
   */
  collapse = () => {
    this.setState({ isExpanded: false });
  }

  /**
   * Clear the content of the editor, making it an empty document.
   */
  clear(): void {
    const { editorView } = this.state;
    if (editorView) {
      const { state } = editorView;
      const tr = state.tr
        .setSelection(TextSelection.create(state.doc, 0, state.doc.nodeSize - 2))
        .deleteSelection();
      editorView.dispatch(tr);
    }
  }

  /**
   * Check if the user has entered any significant content.
   * (i.e. text)
   */
  isEmpty(): boolean {
    const { editorView } = this.state;
    return editorView && editorView.state.doc
      ? !!editorView.state.doc.textContent
      : false;
  }

  /**
   * Set value from HTML string
   */
  setFromHtml(html: string): void {
    const { editorView } = this.state;

    if (!editorView || !editorView.state.doc) {
      throw new Error('Unable to set from HTML before the editor is initialized');
    }

    const { tr, doc } = editorView.state;
    const newDoc = parseHtml(html.trim());

    editorView.dispatch(tr.replace(0, doc.nodeSize - 2, newDoc.slice(0, newDoc.nodeSize - 2)));
  }

  /**
   * Return the current python-markdown value from the editor.
   */
  get value(): string | undefined {
    const { editorView } = this.state;
    return editorView
      ? markdownSerializer.serialize(editorView.state.doc)
      : this.props.defaultValue;
  }

  /**
   * Return the current ProseMirror doc value from the editor;
   */
  get doc(): Node | undefined {
    const { editorView } = this.state;
    return editorView
      ? editorView.state.doc
      : undefined;
  }

  render() {
    const { mentionProvider, emojiProvider } = this.state;
    const handleCancel = this.props.onCancel ? this.handleCancel : undefined;
    const handleSave = this.props.onSave ? this.handleSave : undefined;
    const { isExpanded, editorView } = this.state;
    const editorState = editorView && editorView.state;
    const listsState = editorState && listsStateKey.getState(editorState);
    const blockTypeState = editorState && blockTypeStateKey.getState(editorState);
    const clearFormattingState = editorState && clearFormattingStateKey.getState(editorState);
    const codeBlockState = editorState && codeBlockStateKey.getState(editorState);
    const textFormattingState = editorState && textFormattingStateKey.getState(editorState);
    const hyperlinkState = editorState && hyperlinkStateKey.getState(editorState);
    const imageUploadState = editorState && imageUploadStateKey.getState(editorState);
    const mentionsState = editorState && mentionsStateKey.getState(editorState);
    const emojiState = editorState && emojisStateKey.getState(editorState);

    return (
      <Chrome
        children={<div ref={this.handleRef} />}
        isExpanded={isExpanded}
        feedbackFormUrl="yes"
        onCancel={handleCancel}
        onSave={handleSave}
        placeholder={this.props.placeholder}
        onCollapsedChromeFocus={this.expand}
        editorView={editorView!}
        pluginStateBlockType={blockTypeState}
        pluginStateCodeBlock={codeBlockState}
        pluginStateEmojis={emojiState}
        pluginStateHyperlink={hyperlinkState}
        pluginStateLists={listsState}
        pluginStateMentions={mentionsState}
        pluginStateTextFormatting={textFormattingState}
        pluginStateClearFormatting={clearFormattingState}
        pluginStateImageUpload={imageUploadState}
        mentionProvider={mentionProvider}
        emojiProvider={emojiProvider}
        packageVersion={version}
        packageName={name}
        popupsBoundariesElement={this.props.popupsBoundariesElement}
        popupsMountPoint={this.props.popupsMountPoint}
      />
    );
  }

  private handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel(this);
    }
  }

  private handleChange = () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(this);
    }
  }

  private handleSave = () => {
    const { onSave } = this.props;
    if (onSave) {
      onSave(this);
    }
  }

  private handleRef = (place: Element | null) => {
    if (place) {
      const { imageUploadHandler } = this.props;
      const bitbucketKeymap = {
        'Mod-Enter': this.handleSave,
        'Esc'() { } // Disable Esc handler
      };
      const editorState = EditorState.create(
        {
          schema,
          doc: parseHtml(this.props.defaultValue || ''),
          plugins: [
            ...mentionsPlugins(schema, this.providerFactory), // mentions and emoji needs to be first
            ...emojisPlugins(schema, this.providerFactory),
            ...asciiEmojiPlugins(schema, this.props.emojiProvider),
            ...clearFormattingPlugins(schema),
            ...hyperlinkPlugins(schema),
            ...rulePlugins(schema),
            ...imageUploadPlugins(schema),
            // block type plugin needs to be after hyperlink plugin until we implement keymap priority
            // because when we hit shift+enter, we would like to convert the hyperlink text before we insert a new line
            // if converting is possible
            ...blockTypePlugins(schema),
            // The following order of plugins blockTypePlugins -> listBlock -> codeBlockPlugins
            // this is needed to ensure that all block types are supported inside lists
            // this is needed until we implement keymap proirity :(
            ...listsPlugins(schema),
            ...textFormattingPlugins(schema),
            ...codeBlockPlugins(schema),
            ...reactNodeViewPlugins(schema),
            history(),
            keymap(bitbucketKeymap),
            keymap(baseKeymap) // should be last :(
          ]
        }
      );

      if (imageUploadHandler) {
        const imageUploadState = imageUploadStateKey.getState(editorState);
        imageUploadState.setUploadHandler(imageUploadHandler);
      }

      const editorView = new EditorView(place, {
        state: editorState,
        dispatchTransaction: (tr) => {
          const newState = editorView.state.apply(tr);
          editorView.updateState(newState);
          this.handleChange();
        },
        nodeViews: {
          emoji: nodeViewFactory(this.providerFactory, { emoji: ReactEmojiNode }),
          mention: nodeViewFactory(this.providerFactory, { mention: ReactMentionNode }),
        },
        handleDOMEvents: {
          paste(view: EditorView, event: ClipboardEvent) {
            analyticsService.trackEvent('atlassian.editor.paste');
            return false;
          }
        },
        transformPastedHTML(html: string) {
          return transformHtml(html).innerHTML;
        }
      });

      this.setState({ editorView });

      editorView.focus();

      analyticsService.trackEvent('atlassian.editor.start');
    } else {
      this.setState({ editorView: undefined });
    }
  }
}
