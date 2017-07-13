import {
  AnalyticsHandler,
  analyticsService,
  baseKeymap,
  Chrome,
  blockTypePlugins,
  clearFormattingPlugins,
  codeBlockPlugins,
  hyperlinkPlugins,
  mentionsPlugins,
  rulePlugins,
  textFormattingPlugins,
  textColorPlugins,
  listsPlugins,
  blockTypeStateKey,
  clearFormattingStateKey,
  codeBlockStateKey,
  hyperlinkStateKey,
  mentionsStateKey,
  textFormattingStateKey,
  textColorStateKey,
  listsStateKey,
  EditorState,
  EditorView,
  Schema,
  history,
  keymap,
  ProviderFactory,
  TextSelection,
  version as coreVersion,

  MediaProvider,
  MediaState,
  MediaPluginState,
  mediaPluginFactory,
  mediaStateKey,

  Plugin,

  // nodeviews
  nodeViewFactory,
  ReactMentionNode,
  ReactMediaNode,
  ReactMediaGroupNode,
  reactNodeViewPlugins,

  // error-reporting
  ErrorReporter,
  ErrorReportingHandler,
} from '@atlaskit/editor-core';
import { MentionProvider } from '@atlaskit/mention';
import * as React from 'react';
import { PureComponent } from 'react';
import { encode, parse, MediaContextInfo } from './html';
import {
  JIRASchema,
  isSchemaWithCodeBlock,
  isSchemaWithLinks,
  isSchemaWithMentions,
  isSchemaWithMedia,
  isSchemaWithTextColor,
  makeSchema,
} from './schema';

import { version, name } from './version';

export { version };

export interface Props {
  isExpandedByDefault?: boolean;
  defaultValue?: string;
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  onExpanded?: (editor?: Editor) => void;
  placeholder?: string;
  analyticsHandler?: AnalyticsHandler;
  allowLists?: boolean;
  allowLinks?: boolean;
  allowCodeBlock?: boolean;
  allowAdvancedTextFormatting?: boolean;
  allowBlockQuote?: boolean;
  allowSubSup?: boolean;
  allowTextColor?: boolean;
  mentionProvider?: Promise<MentionProvider>;
  mentionEncoder?: (userId: string) => string;
  mediaProvider?: Promise<MediaProvider>;
  uploadErrorHandler?: (state: MediaState) => void;
  errorReporter?: ErrorReportingHandler;
  popupsBoundariesElement?: HTMLElement;
  popupsMountPoint?: HTMLElement;
}

export interface State {
  editorView?: EditorView;
  editorState?: EditorState<any>;
  isMediaReady: boolean;
  isExpanded?: boolean;
  schema: JIRASchema;
}

export default class Editor extends PureComponent<Props, State> {
  private providerFactory: ProviderFactory;
  private mediaPlugins: Plugin[];
  state: State;
  version = `${version} (editor-core ${coreVersion})`;

  constructor(props: Props) {
    super(props);

    const {
      allowLists, allowLinks, allowAdvancedTextFormatting,
      allowCodeBlock, allowBlockQuote, allowSubSup, allowTextColor,

      analyticsHandler,

      mentionProvider,
      mediaProvider, uploadErrorHandler,

      isExpandedByDefault: isExpanded
    } = props;

    const schema = makeSchema({
      allowLists: !!allowLists,
      allowMentions: !!mentionProvider,
      allowLinks: !!allowLinks,
      allowAdvancedTextFormatting: !!allowAdvancedTextFormatting,
      allowCodeBlock: !!allowCodeBlock,
      allowBlockQuote: !!allowBlockQuote,
      allowSubSup: !!allowSubSup,
      allowTextColor: !!allowTextColor,
      allowMedia: !!mediaProvider,
    });

    this.state = { isExpanded, schema, isMediaReady: true };

    this.providerFactory = new ProviderFactory();

    if (mentionProvider) {
      this.providerFactory.setProvider('mentionProvider', mentionProvider);
    }

    if (mediaProvider) {
      this.providerFactory.setProvider('mediaProvider', mediaProvider);

      const errorReporter = new ErrorReporter();
      if (props.errorReporter) {
        errorReporter.handler = props.errorReporter;
      }

      this.mediaPlugins = mediaPluginFactory(schema, {
        uploadErrorHandler,
        errorReporter,
        providerFactory: this.providerFactory
      });
    }

    analyticsService.handler = analyticsHandler || ((name) => { });
  }

  componentWillUnmount() {
    this.providerFactory.destroy();
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
    const { schema } = this.state;

    this.setState({ isExpanded: true, schema });

    if (onExpanded) {
      onExpanded(this);
    }
  }

  /**
   * Collapse the editor chrome
   */
  collapse = () => {
    const { schema } = this.state;

    this.setState({ isExpanded: false, schema });
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
  isDirty(): boolean {
    const { editorView } = this.state;

    return editorView && editorView.state.doc
      ? !!editorView.state.doc.textContent
      : false;
  }

  /**
   * The current value of the editor, encoded as HTML.
   */
  get value(): Promise<string | undefined> {
    const { editorView, schema } = this.state;
    const mediaPluginState = editorView && mediaStateKey.getState(editorView.state) as MediaPluginState;

    return (async () => {
      if (mediaPluginState) {
        await mediaPluginState.waitForPendingTasks();
      }

      let mediaContextInfo: MediaContextInfo = {};
      if (this.props.mediaProvider) {
        const mediaProvider = await this.props.mediaProvider;
        if (mediaProvider.viewContext) {
          const viewContext: any = await mediaProvider.viewContext;
          if (viewContext) {
            const collection = '';
            const { clientId, serviceHost, tokenProvider } = viewContext.config || viewContext;
            const token = await tokenProvider();
            mediaContextInfo.viewContext = { clientId, serviceHost, token, collection };
          }
        }
        if (mediaProvider.uploadParams && mediaProvider.uploadParams.collection) {
          const uploadContext = await mediaProvider.uploadContext;
          if (uploadContext) {
            const { clientId, serviceHost } = uploadContext;
            const { collection } = mediaProvider.uploadParams;
            const token  = await uploadContext.tokenProvider(collection);
            mediaContextInfo.uploadContext = { clientId, serviceHost, token, collection };
          }
        }
      }

      return editorView && editorView.state.doc
        ? encode(editorView.state.doc, schema, { mention: this.props.mentionEncoder }, mediaContextInfo)
        : this.props.defaultValue;
    })();
  }

  render() {
    const { editorView, isExpanded, isMediaReady } = this.state;
    const { mentionProvider, mediaProvider, popupsBoundariesElement, popupsMountPoint } = this.props;
    const handleCancel = this.props.onCancel ? this.handleCancel : undefined;
    const handleSave = this.props.onSave ? this.handleSave : undefined;
    const editorState = editorView && editorView.state;

    const listsState = editorState && listsStateKey.getState(editorState);
    const blockTypeState = editorState && blockTypeStateKey.getState(editorState);
    const clearFormattingState = editorState && clearFormattingStateKey.getState(editorState);
    const codeBlockState = editorState && codeBlockStateKey.getState(editorState);
    const textFormattingState = editorState && textFormattingStateKey.getState(editorState);
    const textColorState = editorState && textColorStateKey.getState(editorState);
    const hyperlinkState = editorState && hyperlinkStateKey.getState(editorState);
    const mentionsState = editorState && mentionsStateKey.getState(editorState);
    const mediaState = editorState && mediaProvider && this.mediaPlugins && mediaStateKey.getState(editorState);

    return (
      <Chrome
        children={<div ref={this.handleRef} />}
        editorView={editorView!}
        isExpanded={isExpanded}
        mentionProvider={mentionProvider}
        onCancel={handleCancel}
        onSave={handleSave}
        onCollapsedChromeFocus={this.expand}
        placeholder={this.props.placeholder}
        pluginStateBlockType={blockTypeState}
        pluginStateCodeBlock={codeBlockState}
        pluginStateLists={listsState}
        pluginStateTextFormatting={textFormattingState}
        pluginStateTextColor={textColorState}
        pluginStateClearFormatting={clearFormattingState}
        pluginStateMentions={mentionsState}
        pluginStateHyperlink={hyperlinkState}
        pluginStateMedia={mediaState}
        packageVersion={version}
        packageName={name}
        saveDisabled={!isMediaReady}
        popupsBoundariesElement={popupsBoundariesElement}
        popupsMountPoint={popupsMountPoint}
      />
    );
  }

  private handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel(this);
    }
  }

  private handleChange = async () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(this);
    }


    const { editorView } = this.state;
    const mediaPluginState = mediaStateKey.getState(editorView!.state) as MediaPluginState;

    if (mediaPluginState) {
      this.setState({ isMediaReady: false });
      await mediaPluginState.waitForPendingTasks();
      this.setState({ isMediaReady: true });
    }
  }

  private handleSave = () => {
    const { onSave } = this.props;
    if (onSave) {
      onSave(this);
    }
  }

  private handleRef = (place: Element | null) => {
    const { schema } = this.state;

    if (place) {
      const jiraKeymap = {
        'Mod-Enter': this.handleSave,
      };

      const editorState = EditorState.create({
        schema,
        doc: parse(this.props.defaultValue || '', schema),
        plugins: [
          ...(isSchemaWithLinks(schema) ? hyperlinkPlugins(schema as Schema<any, any>) : []),
          ...(isSchemaWithMentions(schema) ? mentionsPlugins(schema as Schema<any, any>, this.providerFactory) : []),
          ...clearFormattingPlugins(schema as Schema<any, any>),
          ...rulePlugins(schema as Schema<any, any>),
          ...(isSchemaWithMedia(schema) ? this.mediaPlugins : []),
          ...(isSchemaWithTextColor(schema) ? textColorPlugins(schema as Schema<any, any>) : []),
          // block type plugin needs to be after hyperlink plugin until we implement keymap priority
          // because when we hit shift+enter, we would like to convert the hyperlink text before we insert a new line
          // if converting is possible
          ...blockTypePlugins(schema as Schema<any, any>),
          // The following order of plugins blockTypePlugins -> listBlock
          // this is needed to ensure that all block types are supported inside lists
          // this is needed until we implement keymap proirity :(
          ...listsPlugins(schema as Schema<any, any>),
          ...textFormattingPlugins(schema as Schema<any, any>),
          ...(isSchemaWithCodeBlock(schema) ? codeBlockPlugins(schema as Schema<any, any>) : []),
          ...reactNodeViewPlugins(schema as Schema<any, any>),
          history(),
          keymap(jiraKeymap),
          keymap(baseKeymap), // should be last :(
        ]
      });

      const editorView = new EditorView(place, {
        state: editorState,
        dispatchTransaction: (tr) => {
          const newState = editorView.state.apply(tr);
          editorView.updateState(newState);
          this.handleChange();
        },
        nodeViews: {
          mention: nodeViewFactory(this.providerFactory, { mention: ReactMentionNode }),
          mediaGroup: nodeViewFactory(this.providerFactory, {
            mediaGroup: ReactMediaGroupNode,
            media: ReactMediaNode,
          }, true),
        },
        handleDOMEvents: {
          paste(view: EditorView, event: ClipboardEvent) {
            analyticsService.trackEvent('atlassian.editor.paste');
            return false;
          }
        }
      });

      analyticsService.trackEvent('atlassian.editor.start');

      this.setState({ editorView }, this.focus);
    } else {
      this.setState({ editorView: undefined });
    }
  }
}
