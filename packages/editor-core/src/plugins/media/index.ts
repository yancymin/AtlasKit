import * as assert from 'assert';

import {
  DefaultMediaStateManager,
  MediaProvider,
  MediaState,
  MediaStateManager,
  UploadParams,
} from '@atlaskit/media-core';

import { copyOptionalAttrs, MediaType } from './../../schema/nodes/media';
import {
  EditorState,
  EditorView,
  Plugin,
  PluginKey,
  Node as PMNode,
  Schema,
  Transaction,
} from '../../prosemirror';
import PickerFacade from './picker-facade';
import { ContextConfig } from '@atlaskit/media-core';
import { ErrorReporter } from '../../utils';

import { MediaPluginOptions } from './media-plugin-options';
import { ProsemirrorGetPosHandler } from '../../nodeviews';
import { nodeViewFactory } from '../../nodeviews';
import { ReactMediaGroupNode, ReactMediaNode } from '../../';
import keymapPlugin from './keymap';
import { insertLinks, RangeWithUrls, detectLinkRangesInSteps } from './media-links';
import { insertFile } from './media-files';

const MEDIA_RESOLVE_STATES = ['ready', 'error', 'cancelled'];

export type PluginStateChangeSubscriber = (state: MediaPluginState) => any;

export interface MediaNodeWithPosHandler {
  node: PMNode;
  getPos: ProsemirrorGetPosHandler;
}

export class MediaPluginState {
  public allowsMedia: boolean = false;
  public allowsUploads: boolean = false;
  public allowsLinks: boolean = false;
  public stateManager: MediaStateManager;
  public pickers: PickerFacade[] = [];
  public binaryPicker?: PickerFacade;
  public ignoreLinks: boolean = false;
  private mediaNodes: MediaNodeWithPosHandler[] = [];
  private options: MediaPluginOptions;
  private view: EditorView;
  private pluginStateChangeSubscribers: PluginStateChangeSubscriber[] = [];
  private useDefaultStateManager = true;
  private destroyed = false;
  private mediaProvider: MediaProvider;
  private errorReporter: ErrorReporter;

  private popupPicker?: PickerFacade;
  private linkRanges: RangeWithUrls[];

  constructor(state: EditorState<any>, options: MediaPluginOptions) {
    this.options = options;

    const { nodes } = state.schema;
    assert(nodes.media && nodes.mediaGroup, 'Editor: unable to init media plugin - media or mediaGroup node absent in schema');

    this.stateManager = new DefaultMediaStateManager();
    options.providerFactory.subscribe('mediaProvider', (name, provider: Promise<MediaProvider>) => this.setMediaProvider(provider));

    this.errorReporter = options.errorReporter || new ErrorReporter();
  }

  subscribe(cb: PluginStateChangeSubscriber) {
    this.pluginStateChangeSubscribers.push(cb);
    cb(this);
  }

  unsubscribe(cb: PluginStateChangeSubscriber) {
    const { pluginStateChangeSubscribers } = this;
    const pos = pluginStateChangeSubscribers.indexOf(cb);

    if (pos > -1) {
      pluginStateChangeSubscribers.splice(pos, 1);
    }
  }

  setMediaProvider = async (mediaProvider?: Promise<MediaProvider>) => {
    if (!mediaProvider) {
      this.destroyPickers();

      this.allowsLinks = false;
      this.allowsUploads = false;
      this.allowsMedia = false;
      this.notifyPluginStateSubscribers();

      return;
    }

    // TODO disable (not destroy!) pickers until mediaProvider is resolved

    let resolvedMediaProvider: MediaProvider;

    try {
      resolvedMediaProvider = await mediaProvider;

      assert(
        resolvedMediaProvider && resolvedMediaProvider.viewContext,
        `MediaProvider promise did not resolve to a valid instance of MediaProvider - ${resolvedMediaProvider}`
      );
    } catch (err) {
      const wrappedError = new Error(`Media functionality disabled due to rejected provider: ${err.message}`);
      this.errorReporter.captureException(wrappedError);

      this.destroyPickers();

      this.allowsLinks = false;
      this.allowsUploads = false;
      this.allowsMedia = false;
      this.notifyPluginStateSubscribers();

      return;
    }

    this.mediaProvider = resolvedMediaProvider;
    this.allowsMedia = true;

    // release all listeners for default state manager
    const { stateManager } = resolvedMediaProvider;
    if (stateManager && this.useDefaultStateManager) {
      (stateManager as DefaultMediaStateManager).destroy();
      this.useDefaultStateManager = false;
    }

    if (stateManager) {
      this.stateManager = stateManager;
    }

    this.allowsLinks = !!resolvedMediaProvider.linkCreateContext;
    this.allowsUploads = !!resolvedMediaProvider.uploadContext;

    if (this.allowsUploads) {
      const uploadContext = await resolvedMediaProvider.uploadContext;

      if (resolvedMediaProvider.uploadParams && uploadContext) {
        this.initPickers(resolvedMediaProvider.uploadParams, uploadContext);
      } else {
        this.destroyPickers();
      }
    } else {
      this.destroyPickers();
    }

    this.notifyPluginStateSubscribers();
  }

  insertFile = (mediaState: MediaState): void => {
    const collection = this.collectionFromProvider();
    if (!collection) {
      return;
    }

    this.stateManager.subscribe(mediaState.id, this.handleMediaState);

    insertFile(this.view, mediaState, collection);

    const { view } = this;
    if (!view.hasFocus()) {
      view.focus();
    }
  }

  insertLinks = (): void => {
    insertLinks(this.view, this.linkRanges, this.collectionFromProvider());
  }

  insertFileFromDataUrl = (url: string, fileName: string) => {
    const { binaryPicker } = this;
    assert(binaryPicker, 'Unable to insert file because media pickers have not been initialized yet');

    binaryPicker!.upload(url, fileName);
  }

  showMediaPicker = () => {
    if (!this.popupPicker) {
      return;
    }

    this.popupPicker.show();
  }

  /**
   * Returns a promise that is resolved after all pending operations have been finished.
   * An optional timeout will cause the promise to reject if the operation takes too long
   *
   * NOTE: The promise will resolve even if some of the media have failed to process.
   *
   */
  waitForPendingTasks = (timeout?: Number) => {
    const { mediaNodes, stateManager } = this;

    return new Promise<void>((resolve, reject) => {
      if (timeout) {
        setTimeout(() => reject(new Error(`Media operations did not finish in ${timeout} ms`)), timeout);
      }

      let outstandingNodes = mediaNodes.length;
      if (!outstandingNodes) {
        return resolve();
      }

      function onNodeStateChanged(state: MediaState) {
        const { status } = state;

        if (MEDIA_RESOLVE_STATES.indexOf(status || '') !== -1) {
          onNodeStateReady(state.id);
        }
      }

      function onNodeStateReady(id: string) {
        outstandingNodes--;
        stateManager.unsubscribe(id, onNodeStateChanged);

        if (outstandingNodes <= 0) {
          resolve();
        }
      }

      mediaNodes.forEach(({ node }) => {
        const mediaNodeId = node.attrs.id;
        const nodeCurrentStatus = this.getMediaNodeStateStatus(mediaNodeId);

        if (MEDIA_RESOLVE_STATES.indexOf(nodeCurrentStatus) !== -1) {
          onNodeStateReady(mediaNodeId);
        } else {
          stateManager.subscribe(mediaNodeId, onNodeStateChanged);
        }
      });
    });
  }

  setView(view: EditorView) {
    this.view = view;
  }

  /**
   * Called from React UI Component when user clicks on "Delete" icon
   * inside of it
   */
  handleMediaNodeRemove = (node: PMNode, getPos: ProsemirrorGetPosHandler) => {
    this.handleMediaNodeRemoval(node, getPos, true);
  }

  /**
   * Nodes can be removed not only by user action but also from PM transform.
   * For example when some plugin or even user manually calls "state.tr.deleteRange(...)"
   * This function is called in this case
   */
  handleMediaNodeOutsideRemove = (id: string) => {
    const mediaNodeWithPos = this.findMediaNode(id);
    if (!mediaNodeWithPos) {
      return;
    }

    const { node, getPos } = mediaNodeWithPos;
    this.handleMediaNodeRemoval(node, getPos, false);
  }

  /**
   * Called from React UI Component on componentDidMount
   */
  handleMediaNodeMount = (node: PMNode, getPos: ProsemirrorGetPosHandler) => {
    this.mediaNodes.push({ node, getPos });
  }

  /**
   * Called from React UI Component on componentWillUnmount and componentWillReceiveProps
   * when React component's underlying node property is replaced with a new node
   */
  handleMediaNodeUnmount = (oldNode: PMNode) => {
    this.mediaNodes = this.mediaNodes.filter(({ node }) => oldNode !== node);
  }

  destroy() {
    if (this.destroyed) {
      return;
    }

    this.destroyed = true;

    const { mediaNodes } = this;
    mediaNodes.splice(0, mediaNodes.length);

    this.destroyPickers();
  }

  findMediaNode = (id: string): MediaNodeWithPosHandler | null => {
    const { mediaNodes } = this;

    // Array#find... no IE support
    return mediaNodes.reduce((memo: MediaNodeWithPosHandler | null, nodeWithPos: MediaNodeWithPosHandler) => {
      if (memo) {
        return memo;
      }

      const { node } = nodeWithPos;
      if (node.attrs.id === id) {
        return nodeWithPos;
      }

      return memo;
    }, null);
  }

  detectLinkRangesInSteps = (tr: Transaction) => {
    const { link } = this.view.state.schema.marks;
    this.linkRanges = [];

    if (this.ignoreLinks) {
      this.ignoreLinks = false;
      return this.linkRanges;
    }
    if (!link || !this.allowsLinks) {
      return this.linkRanges;
    }

    this.linkRanges = detectLinkRangesInSteps(tr, link);
  }

  private destroyPickers = () => {
    const { pickers } = this;

    pickers.forEach(picker => picker.destroy());
    pickers.splice(0, pickers.length);

    this.popupPicker = undefined;
    this.binaryPicker = undefined;
  }

  private initPickers(uploadParams: UploadParams, context: ContextConfig) {
    if (this.destroyed) {
      return;
    }

    const {
      errorReporter,
      pickers,
      stateManager,
    } = this;

    // create pickers if they don't exist, re-use otherwise
    if (!pickers.length) {
      pickers.push(this.binaryPicker = new PickerFacade('binary', uploadParams, context, stateManager, errorReporter));
      pickers.push(this.popupPicker = new PickerFacade('popup', uploadParams, context, stateManager, errorReporter));
      pickers.push(new PickerFacade('clipboard', uploadParams, context, stateManager, errorReporter));
      pickers.push(new PickerFacade('dropzone', uploadParams, context, stateManager, errorReporter));

      pickers.forEach(picker => picker.onNewMedia(this.insertFile));
    }

    // set new upload params for the pickers
    pickers.forEach(picker => picker.setUploadParams(uploadParams));
  }

  private collectionFromProvider(): string | undefined {
    return this.mediaProvider && this.mediaProvider.uploadParams && this.mediaProvider.uploadParams.collection;
  }

  private handleMediaNodeRemoval = (node: PMNode, getPos: ProsemirrorGetPosHandler, activeUserAction: boolean) => {
    const { id } = node.attrs;
    const status = this.getMediaNodeStateStatus(id);

    switch (status) {
      case 'uploading':
      case 'processing':
        this.pickers.forEach(picker => picker.cancel(id));

        if (!activeUserAction) {
          return;
        }

        this.removeMediaNode(id);
        break;

      default:
        if (!activeUserAction) {
          return;
        }

        const { view } = this;
        const nodePos = getPos();
        const tr = view.state.tr.deleteRange(nodePos, nodePos + node.nodeSize);

        view.dispatch(tr);
        break;
    }
  }

  private handleMediaState = (state: MediaState) => {
    switch (state.status) {
      case 'error':
        // TODO: we would like better error handling and retry support here.
        this.removeMediaNode(state.id);

        const { uploadErrorHandler } = this.options;

        if (uploadErrorHandler) {
          uploadErrorHandler(state);
        }
        break;

      case 'ready':
        this.stateManager.unsubscribe(state.id, this.handleMediaState);
        this.replaceNodeWithPublicId(state.id, state.publicId!);
        break;
    }
  }

  private notifyPluginStateSubscribers = () => {
    this.pluginStateChangeSubscribers.forEach(cb => cb.call(cb, this));
  }

  private replaceNodeWithPublicId = (temporaryId: string, publicId: string) => {
    const { view } = this;
    if (!view) {
      return;
    }

    const mediaNodeWithPos = this.findMediaNode(temporaryId);
    if (!mediaNodeWithPos) {
      return;
    }

    const {
      getPos,
      node: mediaNode,
    } = mediaNodeWithPos;

    const newNode = view.state.schema.nodes.media!.create({
      ...mediaNode.attrs,
      id: publicId,
    });

    // Copy all optional attributes from old node
    copyOptionalAttrs(mediaNode.attrs, newNode.attrs);

    // replace the old node with a new one
    const nodePos = getPos();
    const tr = view.state.tr.replaceWith(nodePos, nodePos + mediaNode.nodeSize, newNode);
    view.dispatch(tr.setMeta('addToHistory', false));
  }

  /**
   * Called when:
   * 1) user wants to delete the node when is hasn't been finalized (not ready) from UI
   * 2) when upload process finished with "error" status
   * In both cases we just delete the PM node from the document
   */
  private removeMediaNode = (id: string) => {
    const { view } = this;
    if (!view) {
      return;
    }

    const mediaNodeWithPos = this.findMediaNode(id);
    if (!mediaNodeWithPos) {
      return;
    }

    const { node, getPos } = mediaNodeWithPos;
    const nodePos = getPos();
    const tr = view.state.tr.deleteRange(nodePos, nodePos + node.nodeSize);
    view.dispatch(tr.setMeta('addToHistory', false));
  }

  /**
   * Since we replace nodes with public id when node is finalized
   * stateManager contains no information for public ids
   */
  private getMediaNodeStateStatus = (id: string) => {
    const { stateManager } = this;
    const state = stateManager.getState(id);

    return (state && state.status) || 'ready';
  }
}

export const stateKey = new PluginKey('mediaPlugin');

export const createPlugin = (schema: Schema<any, any>, options: MediaPluginOptions) => {
  return new Plugin({
    state: {
      init(config, state) {
        return new MediaPluginState(state, options);
      },
      apply(tr, pluginState: MediaPluginState, oldState, newState) {
        pluginState.detectLinkRangesInSteps(tr);

        // NOTE: We're not calling passing new state to the Editor, because we depend on the view.state reference
        //       throughout the lifetime of view. We injected the view into the plugin state, because we dispatch()
        //       transformations from within the plugin state (i.e. when adding a new file).
        return pluginState;
      }
    },
    key: stateKey,
    view: (view: EditorView) => {
      const pluginState: MediaPluginState = stateKey.getState(view.state);
      pluginState.setView(view);

      return {
        update: (view: EditorView, prevState: EditorState<any>) => {
          pluginState.insertLinks();
        }
      };
    },
    props: {
      nodeViews: {
        mediaGroup: nodeViewFactory(options.providerFactory, {
          mediaGroup: ReactMediaGroupNode,
          media: ReactMediaNode,
        }, true),
      }
    }
  });
};

const plugins = (schema: Schema<any, any>, options: MediaPluginOptions) => {
  return [createPlugin(schema, options), keymapPlugin(schema)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;

export interface MediaData {
  id: string;
  type?: MediaType;
}
