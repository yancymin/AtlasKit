import CodeMirror from '../../../codemirror';
import {
  browser,
  Selection,
  TextSelection,
  undo,
  redo,
  Node,
  EditorView,
  Fragment,
} from '../../../prosemirror';
import { CodeBlockState } from '../../../plugins';
import { DEFAULT_LANGUAGES } from '../../../ui/LanguagePicker/languageList';
import './styles';

const MOD = browser.mac ? 'Cmd' : 'Ctrl';
interface CMSelection { head: number; anchor: number; }

export default class CodeBlockPlugin  {
  private node: Node;
  private view: EditorView;
  private getPos: Function;
  private value: string;
  private selection: CMSelection | undefined;
  private domRef: HTMLDivElement | undefined;
  private updating: boolean = false;
  private pluginState: CodeBlockState;
  public cm: any;

  constructor(node: Node, view: EditorView, getPos: () => number, pluginState: CodeBlockState) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;
    this.value = node.textContent;
    this.pluginState = pluginState;
    this.addCodeMirrorInstance();
  }

  private addCodeMirrorInstance = () => {
    const div = document.createElement('div');
    this.cm = CodeMirror(div, this.getCodeMirrorConfig());
    this.domRef = div;
    // The following line of code is inspired from Marijn's code example here:
    // https://github.com/ProseMirror/website/blob/master/pages/examples/codemirror/example.js#L43
    setTimeout(() => this.cm.refresh(), 20);
    this.updating = false;
    this.cm.on('changes', this.cmChanged);
    this.cm.on('focus', this.cmFocused);
    this.cm.on('mousedown', this.cmMousedown);
    this.cm.on('blur', this.cmBlur);
    this.setMode(this.node.attrs['language']);
  }

  getCodeMirrorConfig = () => ({
    value: this.value,
    lineNumbers: true,
    lineWrapping: true,
    tabSize: 2,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    extraKeys: this.prepareExtraKeyMap(),
  })

  private prepareExtraKeyMap(): any {
    const keymap = {
      Up: () => this.maybeEscape('line', -1),
      Left: () => this.maybeEscape('char', -1),
      Down: () => this.maybeEscape('line', 1),
      Right: () => this.maybeEscape('char', 1),
      [`${MOD}-A`]: this.selectAllEditorContent,
      [`${MOD}-Z`]: () => undo(this.view.state, this.view.dispatch),
      'Enter': this.handleEnter,
    };
    if (browser.mac) {
      keymap[`Shift-${MOD}-Z`] = () => redo(this.view.state, this.view.dispatch);
    } else {
      keymap[`${MOD}-Y`] = () => redo(this.view.state, this.view.dispatch);
    }
    return CodeMirror['normalizeKeyMap'](keymap);
  }

  private cmChanged = () => {
    if (!this.updating) {
      this.valueChanged();
      this.pluginState.update(this.view.state, this.view.docView, false);
    }
  }

  private cmFocused = (cm: CodeMirror.Editor) => {
    if (!this.updating) {
      this.forwardSelection();
    }
    this.pluginState.updateEditorFocused(true);
    this.pluginState.update(this.view.state, this.view.docView, true);
  }

  private cmMousedown = () => {
    this.forwardSelection();
    this.pluginState.update(this.view.state, this.view.docView, true);
  }

  private cmBlur = () => {
    this.removeSelection();
    this.pluginState.updateEditorFocused(false);
    this.pluginState.update(this.view.state, this.view.docView, true);
  }

  private selectAllEditorContent = (): void => {
    this.view.focus();
    const { dispatch, state } = this.view;
    dispatch(state.tr.setSelection(
      new TextSelection(state.doc.resolve(0),
      state.doc.resolve(state.doc.content['size'])
    )));
  }

  private handleEnter = (): any => {
    const pos = this.cm.getCursor();
    if (pos && pos.line === this.cm.lastLine() && pos.ch === 0) {
      const { state, dispatch } = this.view;
      const { selection, tr, schema: { nodes } } = state;
      const { $from, $head } = selection;
      const node = $from.node($from.depth);
      const nodeEnd = $from.start($from.depth) + node.textContent.length;
      if (node && node.type === nodes.codeBlock &&
        node.textContent.slice(node.textContent.length - 2) === '\n\n') {
        const pos = $head.after();
        tr.replaceWith(pos, pos, state.schema.nodes.paragraph.createAndFill());
        tr.setSelection(Selection.near(tr.doc.resolve(pos), 1));
        tr.delete(nodeEnd - 2, nodeEnd);
        dispatch(tr.scrollIntoView());
        this.view.focus();
        return;
      }
    }
    return CodeMirror.Pass;
  }

  private maybeEscape(unit: string, dir: number): any {
    const pos = this.cm.getCursor();
    if (this.cm.somethingSelected() ||
      pos.line !== (dir < 0 ? this.cm.firstLine() : this.cm.lastLine()) ||
      (unit === 'char' && pos.ch !== (dir < 0 ? 0 : this.cm.getLine(pos.line).length))) {
      return CodeMirror.Pass;
    }
    this.view.focus();
    const targetPos = this.getPos() + (dir < 0 ? 0 : this.value.length + 2);
    const tr = this.view.state.tr;
    if ((dir < 0 && targetPos === 0) ||
      (dir > 0 && !Selection.findFrom(tr.doc.resolve(targetPos), dir))) {
      tr.insert(targetPos, this.view.state.schema.nodes.paragraph.create());
    }
    this.view.dispatch(
      tr.setSelection(
        Selection.near(tr.doc.resolve(targetPos), dir)
      ).scrollIntoView()
    );
    this.view.focus();
  }

  private setMode(language: string): void {
    if (language) {
      const modeInfo = findMode(language.toLowerCase());
      this.cm.setOption('mode', modeInfo ? modeInfo.mode : 'javascript');
    }
  }

  private selectionChanged(selection: CMSelection): boolean {
    return !this.selection ||
      selection.head !== this.selection.head ||
      selection.anchor !== this.selection.anchor;
  }

  private valueChanged(): void {
    const value = this.cm.getValue();
    if (value !== this.value) {
      const change = computeChange(this.value, value);
      this.value = value;
      const start = this.getPos() + 1;
      const { schema } = this.view.state;
      const content = change.text ? schema.text(change.text) : Fragment.empty;
      const tr = this.view.state.tr.replaceWith(start + change.from, start + change.to, content);
      if (this.cm.hasFocus()) {
        const selection = this.findSelection();
        if (this.selectionChanged(selection)) {
          tr.setSelection(
            TextSelection.create(
              tr.doc,
              start + selection.anchor,
              start + selection.head
            )
          );
          this.selection = selection;
        }
      }
      this.view.dispatch(tr);
    }
  }

  private forwardSelection(): void {
    if (!this.cm.hasFocus()) {
      this.selection = undefined;
      return;
    }
    const selection = this.findSelection();
    if (!this.selectionChanged(selection)) {
      return;
    }
    this.selection = selection;
    const base = this.getPos() + 1;
    this.view.dispatch(
      this.view.state.tr.setSelection(TextSelection.create(
        this.view.state.doc, base + selection.anchor, base + selection.head
      ))
    );
  }

  private findSelection(): CMSelection {
    return {
      head: this.cm.indexFromPos(this.cm.getCursor('head')),
      anchor: this.cm.indexFromPos(this.cm.getCursor('anchor'))
    };
  }

  private removeSelection(): void {
    if (this.cm) {
      this.cm.setSelection(
        this.cm.posFromIndex(0),
        this.cm.posFromIndex(0)
      );
    }
  }

  updateLanguage = (language: string) => {
    if (language && this.cm.getMode().name !== language) {
      this.setMode(language);
    }
  }

  focusCodeEditor = () => {
    this.cm.focus();
  }

  get dom() {
    return this.domRef;
  }

  update(value: string): void {
    if (value !== this.value) {
      const change = computeChange(this.value, value);
      this.value = value;
      this.updating = true;
      this.cm.replaceRange(
        change.text,
        this.cm.posFromIndex(change.from),
        this.cm.posFromIndex(change.to),
        'docUpdate'
      );
      this.updating = false;
    }
  }

  setSelection(anchor: number, head: number): void {
    if (!this.cm.hasFocus()) {
      this.cm.focus();
    }
    this.cm.setSelection(
      this.cm.posFromIndex(anchor),
      this.cm.posFromIndex(head)
    );
  }

  selectNode(): void {
    this.cm.focus();
  }

  destroy() {
    this.domRef = undefined;
    this.cm.off('focus', this.cmFocused);
    this.cm.off('mousedown', this.cmMousedown);
    this.cm.off('blur', this.cmBlur);
  }
}

export function computeChange(oldVal: string, newVal: string): any {
  let start: number = 0;
  let oldEnd: number = oldVal.length;
  let newEnd: number = newVal.length;
  while (start < oldEnd && oldVal.charCodeAt(start) === newVal.charCodeAt(start)) {
    ++start;
  }
  while (oldEnd > start &&
    newEnd > start &&
    oldVal.charCodeAt(oldEnd - 1) === newVal.charCodeAt(newEnd - 1)
  ) {
    oldEnd--;
    newEnd--;
  }
  return { from: start, to: oldEnd, text: newVal.slice(start, newEnd) };
}

export function findMode(mode: string) {
  const matches = DEFAULT_LANGUAGES.filter(language => language.alias.indexOf(mode.toLowerCase()) !== -1);
  if (!matches.length) {
    return false;
  }
  const modes = matches[0].alias.map(
    lang => CodeMirror['findModeByName'](lang)
  ).filter(mode => !!mode);
  return modes[0];
}
