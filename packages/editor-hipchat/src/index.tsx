import {
  AnalyticsHandler,
  analyticsService,
  asciiEmojiPlugins,
  baseKeymap,
  blockTypePlugins,
  EditorState,
  EditorView,
  EmojiTypeAhead,
  emojisPlugins,
  emojisStateKey,
  history,
  hyperlinkPlugins,
  codeBlockPlugins,
  keymap,
  mediaPluginFactory,
  mediaStateKey,
  MediaPluginState,
  MediaProvider,
  MediaState,
  MentionPicker,
  mentionsPlugins,
  mentionsStateKey,
  Node,
  Plugin,
  ProviderFactory,
  textFormattingPlugins,
  TextSelection,
  toJSON,
  version as coreVersion,

  // Components
  WithProviders,

  // nodeviews
  nodeViewFactory,
  ReactEmojiNode,
  ReactMediaGroupNode,
  ReactMediaNode,
  ReactMentionNode,
  reactNodeViewPlugins,

  // error-reporting
  ErrorReporter,
  ErrorReportingHandler,
} from '@atlaskit/editor-core';
import {
  EmojiProvider,
  hipchatSchema as schema,
} from '@atlaskit/editor-core';
import { MentionProvider } from '@atlaskit/editor-core';
import * as cx from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import { version } from './version';
import { hipchatEncoder } from './encoders';
import { hipchatDecoder } from './decoders';

export {
  AbstractMentionResource,
  EmojiProvider,
  EmojiResource,
  MentionProvider,
  MentionResource,
  PresenceProvider,
  PresenceResource,
} from '@atlaskit/editor-core';

let debounced: number | null = null;

export type Doc = {
  type: 'doc',
  version: 1,
  content?: any[]
};

export { schema };

export interface Props {
  id?: string;
  maxContentSize?: number;
  onSubmit?: (value: Doc) => void;
  onChange?: () => void;
  emojiProvider?: Promise<EmojiProvider>;
  mediaProvider?: Promise<MediaProvider>;
  mentionProvider?: Promise<MentionProvider>;
  presenceProvider?: any;
  reverseMentionPicker?: boolean;
  uploadErrorHandler?: (state: MediaState) => void;
  useLegacyFormat?: boolean;
  analyticsHandler?: AnalyticsHandler;
  errorReporter?: ErrorReportingHandler;
}

export interface State {
  editorView?: EditorView;
  maxLengthReached?: boolean;
  flashToggle?: boolean;
}

export default class Editor extends PureComponent<Props, State> {
  version = `${version} (editor-core ${coreVersion})`;

  private mediaPlugins: Plugin[];

  public static defaultProps: Props = {
    reverseMentionPicker: true
  };

  state: State;

  providerFactory: ProviderFactory;

  constructor(props: Props) {
    super(props);
    this.state = {};

    this.providerFactory = new ProviderFactory();

    const { mediaProvider, uploadErrorHandler } = props;

    if (mediaProvider) {
      this.providerFactory.setProvider('mediaProvider', mediaProvider);
    }

    const errorReporter = new ErrorReporter();
    if (props.errorReporter) {
      errorReporter.handler = props.errorReporter;
    }

    this.mediaPlugins = mediaPluginFactory(schema, {
      uploadErrorHandler,
      errorReporter,
      providerFactory: this.providerFactory,
    });

    analyticsService.handler = props.analyticsHandler || ((name) => { });
  }


  /**
   * The current size of the document
   */
  get documentSize(): number {
    const { editorView } = this.state;
    return editorView ? editorView.state.doc.nodeSize : 0;
  }

  /**
   * The current value of the editor
   */
  get value(): Doc {
    const { editorView } = this.state;
    const doc = editorView && toJSON(editorView.state.doc);

    if (!doc) {
      return { type: 'doc', version: 1, content: [] };
    }

    return this.props.useLegacyFormat ? hipchatEncoder(doc) : doc;
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
   * Focus the content region of the editor.
   */
  focus(): void {
    const { editorView } = this.state;

    if (editorView && !editorView.hasFocus()) {
      editorView.focus();
    }
  }

  /**
   * Set document from JSON
   */
  setFromJson(value: any): void {
    const { editorView } = this.state;
    if (editorView) {
      const { state } = editorView;
      const { useLegacyFormat } = this.props;

      let content: Node[];

      if (useLegacyFormat) {
        content = [schema.nodeFromJSON(hipchatDecoder(value).content[0])];
      } else {
        content = [];
        (value.content || []).forEach(child => {
          content.push(schema.nodeFromJSON(child));
        });
      }

      if (content && content.length > 0) {
        const tr = state.tr
          .replaceWith(0, state.doc.nodeSize - 2, content)
          .scrollIntoView();
        editorView.dispatch(tr);
      }

      if (useLegacyFormat && !value.length) {
        this.clear();
      }
    }
  }

  appendText(text: string): void {
    const { editorView } = this.state;
    if (editorView) {
      const { state } = editorView;
      const tr = state.tr
        .insertText(text)
        .scrollIntoView();
      editorView.dispatch(tr);
    }
  }

  showMediaPicker() {
    const { editorView } = this.state;
    if (editorView) {
      const mediaPluginState = mediaStateKey.getState(editorView!.state) as MediaPluginState;

      mediaPluginState.showMediaPicker();
    }
  }

  insertFileFromDataUrl(url: string, fileName: string) {
    const { editorView } = this.state;
    if (editorView) {
      const mediaPluginState = mediaStateKey.getState(editorView!.state) as MediaPluginState;

      mediaPluginState.insertFileFromDataUrl(url, fileName);
    }
  }

  componentWillMount() {
    this.handleProviders(this.props);
  }

  componentWillUnmount() {
    this.providerFactory.destroy();

    const { editorView } = this.state;
    if (editorView) {
      if (editorView.state) {
        mediaStateKey.getState(editorView.state).destroy();
      }

      editorView.destroy();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this;
    if (
      props.emojiProvider !== nextProps.emojiProvider ||
      props.mentionProvider !== nextProps.mentionProvider ||
      props.mediaProvider !== nextProps.mediaProvider
    ) {
      this.handleProviders(nextProps);
    }
  }

  handleProviders = (props: Props) => {
    const { emojiProvider, mentionProvider, mediaProvider } = props;

    this.providerFactory.setProvider('emojiProvider', emojiProvider);
    this.providerFactory.setProvider('mentionProvider', mentionProvider);
    this.providerFactory.setProvider('mediaProvider', mediaProvider);
  }

  render() {
    const { props } = this;
    const { editorView } = this.state;
    const { emojiProvider, mentionProvider } = props;

    const editorState = editorView && editorView.state;
    const emojisState = editorState && emojiProvider && emojisStateKey.getState(editorState);
    const mentionsState = editorState && mentionProvider && mentionsStateKey.getState(editorState);
    const classNames = cx('ak-editor-hipchat', {
      'max-length-reached': this.state.maxLengthReached,
      'flash-toggle': this.state.flashToggle
    });

    return (
      <div className={classNames} id={this.props.id}>
        <div ref={this.handleRef}>
          {!emojisState ? null :
            <WithProviders
              providerFactory={this.providerFactory}
              providers={['emojiProvider']}
              // tslint:disable-next-line:jsx-no-lambda
              renderNode={(providers) =>
                <EmojiTypeAhead
                  pluginKey={emojisStateKey}
                  editorView={editorView}
                  emojiProvider={providers.emojiProvider}
                  reversePosition={props.reverseMentionPicker}
                />
              }
            />
          }
          {!mentionsState ? null :
            <WithProviders
              providerFactory={this.providerFactory}
              providers={['mentionProvider']}
              // tslint:disable-next-line:jsx-no-lambda
              renderNode={(providers) =>
                <MentionPicker
                  editorView={editorView}
                  pluginKey={mentionsStateKey}
                  mentionProvider={providers.mentionProvider}
                  presenceProvider={props.presenceProvider}
                  reversePosition={props.reverseMentionPicker}
                />
              }
            />
          }
        </div>
      </div>
    );
  }

  private handleRef = (place: Element | null) => {
    if (!place) {
      return this.setState({ editorView: undefined });
    }

    const { mediaPlugins } = this;
    const hcKeymap = {
      'Enter': this.handleSubmit
    };

    const editorState = EditorState.create({
      schema,
      doc: '',
      plugins: [
        ...mentionsPlugins(schema, this.providerFactory),
        ...mediaPlugins,
        ...emojisPlugins(schema, this.providerFactory),
        ...asciiEmojiPlugins(schema, this.props.emojiProvider),
        ...hyperlinkPlugins(schema),
        ...textFormattingPlugins(schema),
        ...reactNodeViewPlugins(schema),
        ...codeBlockPlugins(schema),
        // block type plugin needs to be after hyperlink plugin until we implement keymap priority
        // because when we hit shift+enter, we would like to convert the hyperlink text before we insert a new line
        // if converting is possible
        ...blockTypePlugins(schema),
        history(),
        keymap(hcKeymap),
        keymap(baseKeymap) // should be last
      ]
    });

    const { maxContentSize } = this.props;

    const editorView = new EditorView(place, {
      state: editorState,
      dispatchTransaction: (tr) => {
        if (maxContentSize) {
          if (tr.doc.nodeSize > maxContentSize) {
            this.setState({
              maxLengthReached: true,
              flashToggle: this.state.maxLengthReached && !this.state.flashToggle
            });
            return;
          } else if (this.state.maxLengthReached) {
            this.setState({
              maxLengthReached: false,
              flashToggle: false
            });
          }
        }

        const newState = editorView.state.apply(tr);
        editorView.updateState(newState);
        this.handleChange();
      },
      nodeViews: {
        emoji: nodeViewFactory(this.providerFactory, { emoji: ReactEmojiNode }),
        mediaGroup: nodeViewFactory(this.providerFactory, {
          mediaGroup: ReactMediaGroupNode,
          media: ReactMediaNode,
        }, true),
        mention: nodeViewFactory(this.providerFactory, { mention: ReactMentionNode }),
      },
      handleDOMEvents: {
        paste(view: EditorView, event: ClipboardEvent) {
          analyticsService.trackEvent('atlassian.editor.paste');
          return false;
        }
      },
      transformPastedHTML: (html: string) => {
        return html.replace(/<br\s*[\/]?>/gi, '\n');
      },
    });

    if (place instanceof HTMLElement) {
      const content = place.querySelector('[contenteditable]');
      if (content instanceof HTMLElement) {
        content.style.outline = 'none';
        content.style.whiteSpace = 'pre-wrap';
      }
    }

    this.setState({ editorView });
    this.focus();

    analyticsService.trackEvent('atlassian.editor.start');
  }

  private handleSubmit = () => {
    const { onSubmit } = this.props;
    const { editorView } = this.state;
    if (onSubmit && editorView) {
      onSubmit(this.value);
    }

    return true;
  }

  private handleChange = () => {
    const { onChange } = this.props;
    if (onChange) {
      if (debounced) {
        clearTimeout(debounced);
      }

      debounced = setTimeout(() => { onChange(); }, 200);
    }
  }

}
