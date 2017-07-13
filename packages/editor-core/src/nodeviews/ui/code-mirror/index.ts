import { Node, NodeView, EditorView } from '../../../prosemirror';
import { CodeBlockState, codeBlockStateKey } from '../../../plugins';
import codeMirrorPlugin from './codeMirrorPlugin';
import './styles';

class CodeBlock implements NodeView  {
  private node: Node;
  private view: EditorView;
  private cm: any;
  private uniqueId: string;
  private pluginState: CodeBlockState;
  public codeMirrorPlugin: codeMirrorPlugin;

  constructor(node: Node, view: EditorView, getPos: () => number) {
    this.node = node;
    this.view = view;
    this.pluginState = codeBlockStateKey.getState(this.view.state);
    this.codeMirrorPlugin = new codeMirrorPlugin(node, view, getPos, this.pluginState);
    this.uniqueId = this.node.attrs['uniqueId'] || generateId();
    this.node.attrs['uniqueId'] = this.uniqueId;
    this.node.attrs['isCodeMirror'] = true;
    this.pluginState.subscribe(this.updateLanguage);
    this.pluginState.subscribeFocusHandlers(this.focusCodeEditor);
  }

  get dom() {
    return this.codeMirrorPlugin.dom;
  }

  private updateLanguage = (state: CodeBlockState) => {
    const { language, uniqueId } = state;
    if (language && uniqueId === this.uniqueId) {
      this.codeMirrorPlugin.updateLanguage(language);
    }
  }

  private focusCodeEditor = (uniqueId: string) => {
    if (uniqueId === this.uniqueId) {
      this.codeMirrorPlugin.focusCodeEditor();
    }
  }

  update(node: Node): boolean {
    if (!this.node || node.type !== this.node.type) {
      return false;
    }
    this.node = node;
    this.codeMirrorPlugin.update(node.textContent);
    return true;
  }

  setSelection(anchor: number, head: number): void {
    this.codeMirrorPlugin.setSelection(anchor, head);
  }

  selectNode(): void {
    this.cm.focus();
  }

  stopEvent(): boolean {
    return true;
  }

  destroy() {
    this.codeMirrorPlugin.destroy();
    this.node.attrs['uniqueId'] = undefined;
    this.node.attrs['isCodeMirror'] = undefined;
    this.pluginState.unsubscribe(this.updateLanguage);
    this.pluginState.unsubscribeFocusHandlers(this.focusCodeEditor);
  }
}

function generateId(): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for(let i = 0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export default (node: any, view: any, getPos: () => number): NodeView => {
  return new CodeBlock(node, view, getPos);
};
