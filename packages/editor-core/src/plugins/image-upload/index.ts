import { analyticsService } from '../../analytics';
import {
  EditorState,
  EditorView,
  Schema,
  Plugin,
  PluginKey,
  NodeSelection,
  NodeViewDesc,
} from '../../prosemirror';
import inputRulePlugin from './input-rule';

export type StateChangeHandler = (state: ImageUploadState) => any;
export interface ImageUploadPluginOptions {
  defaultHandlersEnabled?: boolean;
  supportedImageTypes?: string[];
  maxFileSizeInBytes: number;
}

export type ImageUploadHandler = (e: any, insertImageFn: any) => void;

const DEFAULT_OPTIONS: ImageUploadPluginOptions = {
  maxFileSizeInBytes: 10000000,
  supportedImageTypes: [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'svg',
  ],
};

function isDroppedFile(
  e: DragEvent
): boolean {
  return Array.prototype.slice.call(e.dataTransfer.types).indexOf('Files') !== -1;
}

function isPastedFile(
  e: ClipboardEvent
): boolean {
  const types = e.clipboardData && e.clipboardData.types;
  return types && Array.prototype.slice.call(types).indexOf('Files') !== -1;
}

export class ImageUploadState {
  active = false;
  enabled = false;
  hidden = false;
  src?: string = undefined;
  element?: HTMLElement = undefined;
  changeHandlers: StateChangeHandler[] = [];

  private state: EditorState<any>;
  private config: ImageUploadPluginOptions;
  private uploadHandler?: ImageUploadHandler;

  constructor(state: EditorState<any>, options?: ImageUploadPluginOptions) {
    this.changeHandlers = [];
    this.state = state;
    this.config = { ...DEFAULT_OPTIONS, ...options };
    this.hidden = !state.schema.nodes.image;
    this.enabled = this.canInsertImage();
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  update(state: EditorState<any>, docView: NodeViewDesc, dirty = false): void {
    this.state = state;
    const newActive = this.isImageSelected();
    if (newActive !== this.active) {
      this.active = newActive;
      dirty = true;
    }

    const newEnabled = this.canInsertImage();
    if (newEnabled !== this.enabled) {
      this.enabled = newEnabled;
      dirty = true;
    }

    const newElement = newActive
      ? this.getActiveImageElement(docView)
      : undefined;
    if (newElement !== this.element) {
      this.element = newElement;
      dirty = true;
    }

    if (dirty) {
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  setUploadHandler(uploadHandler: ImageUploadHandler) {
    this.uploadHandler = uploadHandler;
  }

  handleImageUpload(view: EditorView, event?: Event): boolean {
    const { uploadHandler } = this;

    if (!uploadHandler) {
      return false;
    }

    uploadHandler(event, this.addImage(view));

    return true;
  }

  addImage(view: EditorView): Function {
    return (options: { src?: string, alt?: string, title?: string }): void => {
      const { state } = this;
      const { image } = state.schema.nodes;
      if (this.enabled && image) {
        view.dispatch(state.tr.insert(state.selection.$to.pos, image.create(options)));
      }
    };
  }

  updateImage(view: EditorView): Function {
    return (options: { src?: string, alt?: string, title?: string }): void => {
      if (this.isImageSelected()) {
        this.removeImage(view);
        this.addImage(view)(options);
      }
    };
  }

  removeImage(view: EditorView): void {
    const { state } = this;
    const { $from, $to } = state.selection;

    if (this.isImageSelected()) {
      view.dispatch(state.tr.delete($from.pos, $to.pos));
    }
  }

  private getActiveImageElement(docView: NodeViewDesc): HTMLElement {
    const { $from } = this.state.selection;
    const { node, offset } = docView.domFromPos($from.pos);

    if (node.childNodes.length === 0) {
      return node.parentElement!;
    }

    return node.childNodes[offset] as HTMLElement;
  }

  private canInsertImage(): boolean {
    const { state } = this;
    const { image } = state.schema.nodes;
    const { $to } = state.selection;

    return !!image
      && $to.parent.canReplaceWith($to.parentOffset, $to.parentOffset, image);
  }

  private isImageSelected(): boolean {
    const { selection } = this.state;
    return selection instanceof NodeSelection
      && selection.node.type === this.state.schema.nodes.image;
  }
}

export const stateKey = new PluginKey('imageUploadPlugin');

const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new ImageUploadState(state);
    },
    apply(tr, pluginState: ImageUploadState, oldState, newState) {
      return pluginState;
    }
  },
  key: stateKey,
  view: (view: EditorView) => {
    stateKey.getState(view.state).update(view.state, view.docView, true);

    return {
      update: (view: EditorView, prevState: EditorState<any>) => {
        stateKey.getState(view.state).update(view.state, view.docView);
      }
    };
  },
  props: {
    handleDOMEvents: {
      drop(view: EditorView, event: DragEvent) {
        const pluginState: ImageUploadState = stateKey.getState(view.state);
        if (!isDroppedFile(event) || !pluginState.changeHandlers.length) {
          return false;
        }
        analyticsService.trackEvent('atlassian.editor.image.drop');

        event.preventDefault();
        event.stopPropagation();

        pluginState.handleImageUpload(view, event);
        return true;
      },
      paste(view: EditorView, event: ClipboardEvent) {
        const pluginState: ImageUploadState = stateKey.getState(view.state);
        if (!isPastedFile(event) || !pluginState.changeHandlers.length) {
          return false;
        }
        analyticsService.trackEvent('atlassian.editor.image.paste');

        event.preventDefault();
        event.stopPropagation();

        pluginState.handleImageUpload(view, event);
        return true;
      },
    }
  }
});

const plugins = (schema: Schema<any, any>) => {
  return [plugin, inputRulePlugin(schema)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;

