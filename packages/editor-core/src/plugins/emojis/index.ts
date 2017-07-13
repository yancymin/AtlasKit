import { EmojiId, EmojiProvider } from '@atlaskit/emoji';
import {
  EditorState,
  EditorView,
  Schema,
  Plugin,
} from '../../prosemirror';
import { isMarkTypeAllowedAtCurrentPosition } from '../../utils';
import { inputRulePlugin } from './input-rules';
import keymapPlugin from './keymap';
import ProviderFactory from '../../providerFactory';
import emojiNodeView from './../../nodeviews/ui/emoji';
import nodeViewFactory from '../../nodeviews/factory';

import stateKey from './plugin-key';
export { stateKey };

export type StateChangeHandler = (state: EmojiState) => any;
export type ProviderChangeHandler = (provider?: EmojiProvider) => any;

export interface Options {
  emojiProvider: Promise<EmojiProvider>;
}

export class EmojiState {
  emojiProvider?: EmojiProvider;
  query?: string;
  enabled = true;
  queryActive = false;
  anchorElement?: HTMLElement;

  onSelectPrevious = (): boolean => false;
  onSelectNext = (): boolean => false;
  onSelectCurrent = (): boolean => false;
  onTrySelectCurrent = (): boolean => false;

  private changeHandlers: StateChangeHandler[] = [];
  private state: EditorState<any>;
  private view: EditorView;

  constructor(state: EditorState<any>, providerFactory: ProviderFactory) {
    this.changeHandlers = [];
    this.state = state;
    providerFactory.subscribe('emojiProvider', this.handleProvider);
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  update(state: EditorState<any>) {
    this.state = state;

    if (!this.emojiProvider) {
      return;
    }

    const { emojiQuery } = state.schema.marks;
    const { doc, selection } = state;
    const { from, to } = selection;

    let dirty = false;

    const newEnabled = this.isEnabled();
    if (newEnabled !== this.enabled) {
      this.enabled = newEnabled;
      dirty = true;
    }

    if (doc.rangeHasMark(from - 1, to, emojiQuery)) {
      if (!this.queryActive) {
        dirty = true;
        this.queryActive = true;
      }

      const { nodeBefore, /*nodeAfter*/ } = selection.$from;
      const newQuery = (nodeBefore && nodeBefore.textContent || '');

      if (this.query !== newQuery) {
        dirty = true;
        this.query = newQuery;
      }
    } else if (this.queryActive) {
      dirty = true;
      this.dismiss();
      return;
    }

    const newAnchorElement = this.view.dom.querySelector('[data-emoji-query]') as HTMLElement;
    if (newAnchorElement !== this.anchorElement) {
      dirty = true;
      this.anchorElement = newAnchorElement;
    }

    if (dirty) {
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  dismiss(): boolean {
    this.queryActive = false;
    this.query = undefined;

    const { state, view } = this;

    if (state) {
      const { schema } = state;
      const { tr } = state;
      const markType = schema.mark('emojiQuery');

      view.dispatch(
        tr
          .removeMark(0, state.doc.nodeSize - 2, markType)
          .removeStoredMark(markType)
      );
    }

    return true;
  }

  isEnabled() {
    const { schema } = this.state;
    const { emojiQuery } = schema.marks;
    return isMarkTypeAllowedAtCurrentPosition(emojiQuery, this.state);
  }

  private findEmojiQueryMark() {
    const { state } = this;
    const { doc, schema, selection } = state;
    const { to, from } = selection;
    const { emojiQuery } = schema.marks;

    let start = from;
    let node = doc.nodeAt(start);

    while (start > 0 && (!node || !emojiQuery.isInSet(node.marks))) {
      start--;
      node = doc.nodeAt(start);
    }

    let end = start;

    if (node && emojiQuery.isInSet(node.marks)) {
      const resolvedPos = doc.resolve(start);
      // -1 is to include : in replacement
      // resolvedPos.depth + 1 to make emoji work inside other blocks e.g. "list item" or "blockquote"
      start = resolvedPos.start(resolvedPos.depth + 1) - 1;
      end = start + node.nodeSize;
    }

    // Emoji inserted via picker
    if (start === 0 && end === 0) {
      start = from;
      end = to;
    }

    return { start, end };
  }

  insertEmoji(emojiId?: EmojiId) {
    const { state, view } = this;
    const { emoji } = state.schema.nodes;

    if (emoji && emojiId) {
      const { start, end } = this.findEmojiQueryMark();
      const node = emoji.create({ ...emojiId, text: emojiId.fallback || emojiId.shortName });
      const textNode = state.schema.text(' ');
      view.dispatch(
        state.tr.replaceWith(start, end, [node, textNode])
      );
      view.focus();
    } else {
      this.dismiss();
    }
  }

  handleProvider = (name: string, provider: Promise<any>): void => {
    switch (name) {
      case 'emojiProvider':
        provider.then((emojiProvider: EmojiProvider) => {
          this.emojiProvider = emojiProvider;
        }).catch(() => {
          this.emojiProvider = undefined;
        });
        break;
    }
  }

  setView(view: EditorView) {
    this.view = view;
  }
}

export function createPlugin(providerFactory: ProviderFactory) {
  return new Plugin({
    state: {
      init(config, state) {
        return new EmojiState(state, providerFactory);
      },
      apply(tr, pluginState, oldState, newState) {
        // NOTE: Don't call pluginState.update here.
        return pluginState;
      }
    },
    props: {
      nodeViews: {
        emoji: nodeViewFactory(providerFactory, { emoji: emojiNodeView })
      }
    },
    key: stateKey,
    view: (view: EditorView) => {
      const pluginState: EmojiState = stateKey.getState(view.state);
      pluginState.setView(view);

      return {
        update(view: EditorView, prevState: EditorState<any>) {
          pluginState.update(view.state);
        },
        destroy() {
          providerFactory.unsubscribe('emojiProvider', pluginState.handleProvider);
        }
      };
    }
  });
}

const plugins = (schema: Schema<any, any>, providerFactory) => {
  return [createPlugin(providerFactory), inputRulePlugin(schema), keymapPlugin(schema)].filter(plugin => !!plugin) as Plugin[];
};

export default plugins;
