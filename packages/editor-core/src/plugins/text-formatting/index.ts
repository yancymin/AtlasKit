import {
  Mark,
  MarkType,
  Plugin,
  PluginKey,
  EditorState,
  EditorView,
  Schema,
} from '../../prosemirror';

import * as commands from '../../commands';
import keymapHandler from './keymap';
import inputRulePlugin from './input-rule';
import { transformToCodeAction } from './transform-to-code';
import { keyCodes } from '../../keymaps';

export type StateChangeHandler = (state: TextFormattingState) => any;

export type BlockTypeStateSubscriber = (state: TextFormattingState) => void;

export class TextFormattingState {
  private changeHandlers: StateChangeHandler[] = [];
  private state: EditorState<any>;

  // public state
  emActive = false;
  emDisabled = false;
  emHidden = false;
  codeActive = false;
  codeDisabled = false;
  codeHidden = false;
  underlineActive = false;
  underlineDisabled = false;
  underlineHidden = false;
  strikeActive = false;
  strikeDisabled = false;
  strikeHidden = false;
  strongActive = false;
  strongDisabled = false;
  strongHidden = false;
  superscriptActive = false;
  superscriptDisabled = false;
  superscriptHidden = false;
  subscriptActive = false;
  subscriptDisabled = false;
  subscriptHidden = false;
  marksToRemove;
  keymapHandler;

  constructor(state: EditorState<any>) {
    this.state = state;

    this.emHidden = !state.schema.marks.em;
    this.strongHidden = !state.schema.marks.strong;
    this.underlineHidden = !state.schema.marks.underline;
    this.codeHidden = !state.schema.marks.code;
    this.superscriptHidden = !state.schema.marks.subsup;
    this.subscriptHidden = !state.schema.marks.subsup;
    this.strikeHidden = !state.schema.marks.strike;

    this.update(state);
  }

  toggleEm(view: EditorView): boolean {
    const { em } = this.state.schema.marks;
    if (em) {
      return this.toggleMark(view, em);
    }
    return false;
  }

  toggleCode(view: EditorView): boolean {
    const { code } = this.state.schema.marks;
    const { from, to } = this.state.selection;
    if (code) {
      if (!this.codeActive) {
        view.dispatch(transformToCodeAction(view.state, from, to));
        return true;
      }
      return commands.toggleMark(code)(view.state, view.dispatch);
    }
    return false;
  }

  toggleStrike(view: EditorView) {
    const { strike } = this.state.schema.marks;
    if (strike) {
      return this.toggleMark(view, strike);
    }
    return false;
  }

  toggleStrong(view: EditorView) {
    const { strong } = this.state.schema.marks;
    if (strong) {
      return this.toggleMark(view, strong);
    }
    return false;
  }

  toggleSuperscript(view: EditorView) {
    const { subsup } = this.state.schema.marks;
    if (subsup) {
      if (this.subscriptActive) {
        // If subscript is enabled, turn it off first.
        return this.toggleMark(view, subsup);
      }

      return this.toggleMark(view, subsup, { type: 'sup' });
    }
    return false;
  }

  toggleSubscript(view: EditorView): boolean {
    const { subsup } = this.state.schema.marks;
    if (subsup) {
      if (this.superscriptActive) {
        // If superscript is enabled, turn it off first.
        return this.toggleMark(view, subsup);
      }

      return this.toggleMark(view, subsup, { type: 'sub' });
    }
    return false;
  }

  toggleUnderline(view: EditorView): boolean {
    const { underline } = this.state.schema.marks;
    if (underline) {
      return this.toggleMark(view, underline);
    }

    return false;
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  update(newEditorState: EditorState<any>) {
    this.state = newEditorState;

    const { state } = this;
    const { em, code, strike, strong, subsup, underline } = state.schema.marks;
    let dirty = false;

    if (code) {
      const newCodeActive = this.markActive(code.create());
      if (newCodeActive !== this.codeActive) {
        this.codeActive = newCodeActive;
        dirty = true;
      }

      const newCodeDisabled = !commands.toggleMark(code)(this.state);
      if (newCodeDisabled !== this.codeDisabled) {
        this.codeDisabled = newCodeDisabled;
        dirty = true;
      }
    }

    if (em) {
      const newEmActive = this.anyMarkActive(em);
      if (newEmActive !== this.emActive) {
        this.emActive = newEmActive;
        dirty = true;
      }

      const newEmDisabled = !commands.toggleMark(em)(this.state);
      if (this.codeActive || newEmDisabled !== this.emDisabled) {
        this.emDisabled = this.codeActive ? true : newEmDisabled;
        dirty = true;
      }
    }

    if (strike) {
      const newStrikeActive = this.anyMarkActive(strike);
      if (newStrikeActive !== this.strikeActive) {
        this.strikeActive = newStrikeActive;
        dirty = true;
      }

      const newStrikeDisabled = !commands.toggleMark(strike)(this.state);
      if (this.codeActive || newStrikeDisabled !== this.strikeDisabled) {
        this.strikeDisabled = this.codeActive ? true : newStrikeDisabled;
        dirty = true;
      }
    }

    if (strong) {
      const newStrongActive = this.anyMarkActive(strong);
      if (newStrongActive !== this.strongActive) {
        this.strongActive = newStrongActive;
        dirty = true;
      }

      const newStrongDisabled = !commands.toggleMark(strong)(this.state);
      if (this.codeActive || newStrongDisabled !== this.strongDisabled) {
        this.strongDisabled = this.codeActive ? true : newStrongDisabled;
        dirty = true;
      }
    }

    if (subsup) {
      const subMark = subsup.create({ type: 'sub' });
      const supMark = subsup.create({ type: 'sup' });

      const newSubscriptActive = this.markActive(subMark);
      if (newSubscriptActive !== this.subscriptActive) {
        this.subscriptActive = newSubscriptActive;
        dirty = true;
      }

      const newSubscriptDisabled = !commands.toggleMark(subsup, { type: 'sub' })(this.state);
      if (this.codeActive || newSubscriptDisabled !== this.subscriptDisabled) {
        this.subscriptDisabled = this.codeActive ? true : newSubscriptDisabled;
        dirty = true;
      }

      const newSuperscriptActive = this.markActive(supMark);
      if (newSuperscriptActive !== this.superscriptActive) {
        this.superscriptActive = newSuperscriptActive;
        dirty = true;
      }

      const newSuperscriptDisabled = !commands.toggleMark(subsup, { type: 'sup' })(this.state);
      if (this.codeActive || newSuperscriptDisabled !== this.superscriptDisabled) {
        this.superscriptDisabled = this.codeActive ? true : newSuperscriptDisabled;
        dirty = true;
      }
    }

    if (underline) {
      const newUnderlineActive = this.anyMarkActive(underline);
      if (newUnderlineActive !== this.underlineActive) {
        this.underlineActive = newUnderlineActive;
        dirty = true;
      }

      const newUnderlineDisabled = !commands.toggleMark(underline)(this.state);
      if (this.codeActive || newUnderlineDisabled !== this.underlineDisabled) {
        this.underlineDisabled = this.codeActive ? true : newUnderlineDisabled;
        dirty = true;
      }
    }

    if (dirty) {
      this.triggerOnChange();
    }
  }

  private triggerOnChange() {
    this.changeHandlers.forEach(cb => cb(this));
  }

  /**
   * Determine if a mark of a specific type exists anywhere in the selection.
   */
  private anyMarkActive(markType: MarkType): boolean {
    const { state } = this;
    const { from, to, empty } = state.selection;

    let found = false;
    if (this.marksToRemove) {
      this.marksToRemove.forEach(mark => {
        if (mark.type.name === markType.name) {
          found = true;
        }
      });
    }

    if (found && !state.doc.rangeHasMark(from - 1, to, markType)) {
      return false;
    }

    if (empty) {
      return !!markType.isInSet(state.tr.storedMarks || state.selection.$from.marks());
    }
    return state.doc.rangeHasMark(from, to, markType);
  }

  handleKeyDown (view: EditorView, event: KeyboardEvent) {
    const { state } = this;
    const { from, to, empty } = state.selection;
    const { code } = view.state.schema.marks;
    let marks = state.selection.$from.marks();
    let domNodeBefore = view.docView.domFromPos(from - 1);

    if (!empty) {
      marks = [];
      state.doc.nodesBetween(from, to, node => {
        if (node.marks.length) {
          marks = marks.concat(node.marks);
        }
      });
    }

    const { storedMarks } = state.tr;

    if (storedMarks && this.marksToRemove) {
      this.marksToRemove = null;
      view.dispatch(view.state.tr.setStoredMarks([]));
    }

    if (event.keyCode === keyCodes.Backspace) {
      let found = false;

      const nonInclusiveMarks: Mark[] = [];
      const { nodeBefore } = state.selection.$from;
      if (nodeBefore) {
        nodeBefore.marks.forEach(mark => {
          if (mark.type.spec.inclusive === false) {
            nonInclusiveMarks.push(mark);
          }
        });
        if (nonInclusiveMarks.length) {
          this.marksToRemove = nonInclusiveMarks;
        }
      }

      marks.forEach(mark => {
        if (state.doc.rangeHasMark(from - 1, to, mark.type)) {
          found = true;
        }
      });

      if (marks.length && (!domNodeBefore || found)) {
        this.marksToRemove = marks.concat(this.marksToRemove || []);
      }
    }

    if (event.key === 'ArrowRight' && !state.doc.rangeHasMark(from, to, code)) {
      view.dispatch(view.state.tr.removeStoredMark(code));
    }
  }

  handleTextInput (view: EditorView, event: KeyboardEvent) {
    const { state } = this;
    const { storedMarks } = state.tr;

    if (storedMarks && this.marksToRemove) {
      this.marksToRemove = null;
      view.dispatch(view.state.tr.setStoredMarks([]));
    }
  }

  /**
   * Determine if a mark (with specific attribute values) exists anywhere in the selection.
   */
  private markActive(mark: Mark): boolean {
    const { state } = this;
    const { from, to, empty } = state.selection;

    let foundMark = false;
    if (this.marksToRemove) {
      this.marksToRemove.forEach(markToRemove => {
        if (markToRemove.type.name === mark.type.name) {
          foundMark = true;
        }
      });
    }

    const currentMarkBefore = state.doc.rangeHasMark(from - 1, to, mark.type);
    const currentMarkAfter = state.doc.rangeHasMark(from, to, mark.type);

    if (foundMark && (!currentMarkBefore || ( !mark.type.spec.inclusive && !currentMarkAfter ))) {
      return false;
    }

    // When the selection is empty, only the active marks apply.
    if (empty) {
      return !!mark.isInSet(state.tr.storedMarks || state.selection.$from.marks());
    }

    // For a non-collapsed selection, the marks on the nodes matter.
    let found = false;
    state.doc.nodesBetween(from, to, node => {
      found = found || mark.isInSet(node.marks);
    });

    return found;
  }

  private toggleMark(view: EditorView, markType: MarkType, attrs?: any): boolean {
    // Disable text-formatting inside code
    if (this.codeActive ? this.codeDisabled : true) {
      return commands.toggleMark(markType, attrs)(view.state, view.dispatch);
    }

    return false;
  }
}

export const stateKey = new PluginKey('textFormatting');

export const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new TextFormattingState(state);
    },
    apply(tr, pluginState: TextFormattingState, oldState, newState) {
      pluginState.update(newState);
      return pluginState;
    }
  },
  key: stateKey,
  view: (view: EditorView) => {
    const pluginState = stateKey.getState(view.state);
    pluginState.keymapHandler = keymapHandler(view, pluginState);
    return {};
  },
  props: {
    handleKeyDown(view, event) {
      const pluginState = stateKey.getState(view.state);
      const result = pluginState.keymapHandler(view, event);
      pluginState.handleKeyDown(view, event);

      return result;
    },
    handleTextInput(view, event) {
      const pluginState = stateKey.getState(view.state);
      pluginState.handleTextInput(view, event);

      return false;
    }
  }
});

const plugins = (schema: Schema<any, any>) => {
  return [plugin, inputRulePlugin(schema)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
