import { analyticsService } from '../../analytics';
import {
  EditorState,
  PluginKey,
  EditorView,
  Schema,
  NodeViewDesc,
  TextSelection,
  Plugin,
  Node,
} from '../../prosemirror';
import { panelNodeView } from '../../nodeviews';
import inputRulePlugin from './input-rules';

export interface PanelType {
  panelType: 'info' | 'note' | 'tip' | 'warning';
}

export const availablePanelType = [
  { panelType: 'info' },
  { panelType: 'note' },
  { panelType: 'tip' },
  { panelType: 'warning' }
];

export class PanelState {
  private state: EditorState<any>;
  private activeNode: Node | undefined;
  private changeHandlers: PanelStateSubscriber[] = [];

  element?: HTMLElement | undefined;
  activePanelType?: string | undefined;
  toolbarVisible?: boolean | undefined;
  editorFocused: boolean = false;

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];
    this.state = state;
    this.toolbarVisible = false;
  }

  updateEditorFocused(editorFocused: boolean) {
    this.editorFocused = editorFocused;
  }

  changePanelType(view: EditorView, panelType: PanelType) {
    analyticsService.trackEvent(`atlassian.editor.format.${panelType.panelType}.button`);
    const { state, dispatch } = view;
    let { tr } = state;
    const { panel } = state.schema.nodes;
    const { $from, $to } = state.selection;
    let newFrom = tr.doc.resolve($from.start($from.depth - 1));
    let newTo = tr.doc.resolve($to.end($to.depth - 1));
    let range = newFrom.blockRange(newTo)!;
    tr.lift(range, $from.depth - 2);
    newFrom = tr.doc.resolve(tr.mapping.map(newFrom.pos));
    newTo = tr.doc.resolve(tr.mapping.map(newTo.pos));
    range = newFrom.blockRange(newTo)!;
    tr = tr.wrap(range, [{ type: panel, attrs: panelType }]);
    dispatch(tr);
  }

  removePanel(view: EditorView) {
    const { dispatch, state } = view;
    let { tr } = state;
    let { $from, $to } = state.selection;
    let newFrom = tr.doc.resolve($from.start($from.depth - 1));
    let newTo = tr.doc.resolve($to.end($to.depth - 1));
    let range = newFrom.blockRange(newTo)!;
    tr = tr.delete(range!.start, range!.end);
    $from = tr.selection.$from;
    $to = tr.selection.$to;
    newFrom = tr.doc.resolve($from.start($from.depth));
    newTo = tr.doc.resolve($to.end($to.depth));
    range = newFrom.blockRange(newTo)!;
    tr = tr.lift(range, newFrom.depth - 2);
    dispatch(tr);
  }

  subscribe(cb: PanelStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: PanelStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  update(state: EditorState<any>, docView: NodeViewDesc, domEvent: boolean = false) {
    this.state = state;
    const newPanel = this.getActivePanel(docView);
    if ((domEvent && newPanel) || this.activeNode !== newPanel) {
      const newElement = newPanel && this.getDomElement(docView);
      this.activeNode = newPanel;
      this.toolbarVisible = this.editorFocused && !!newPanel && (domEvent || this.element !== newElement);
      this.element = newElement;
      this.activePanelType = newPanel && newPanel.attrs['panelType'];
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  private getActivePanel(docView: NodeViewDesc): Node | undefined {
    const { state } = this;
    if (state.selection instanceof TextSelection) {
      const { $from } = state.selection;
      const node = $from.node($from.depth - 1);
      if (node && node.type === state.schema.nodes.panel) {
        return node;
      }
    }
  }

  private getDomElement(docView: NodeViewDesc): HTMLElement | undefined {
    const { state: { selection } } = this;
    if (selection instanceof TextSelection) {
      const { node } = docView.domFromPos(selection.$from.pos);
      let currentNode = node;
      while (currentNode) {
        if (currentNode.attributes && currentNode.attributes['data-panel-type']) {
          return currentNode as HTMLElement;
        }
        currentNode = currentNode.parentNode!;
      }
    }
  }

}

export type PanelStateSubscriber = (state: PanelState) => any;

export const stateKey = new PluginKey('panelPlugin');

const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new PanelState(state);
    },
    apply(tr, pluginState: PanelState, oldState, newState) {
      const stored = tr.getMeta(stateKey);
      if (stored) {
        pluginState.update(newState, stored.docView, stored.domEvent);
      }
      return pluginState;
    }
  },
  key: stateKey,
  view: (view: EditorView) => {
    return {
      update: (view: EditorView, prevState: EditorState<any>) => {
        stateKey.getState(view.state).update(view.state, view.docView);
      }
    };
  },
  props: {
    nodeViews: {
      panel: panelNodeView,
    },
    handleClick(view: EditorView, event) {
      stateKey.getState(view.state).update(view.state, view.docView, true);
      return false;
    },
    onFocus(view: EditorView, event) {
      stateKey.getState(view.state).updateEditorFocused(true);
    },
    onBlur(view: EditorView, event) {
      const pluginState = stateKey.getState(view.state);
      pluginState.updateEditorFocused(false);
      pluginState.update(view.state, view.docView, true);
    },
  },
});

const plugins = (schema: Schema<any, any>) => {
  return [plugin, inputRulePlugin(schema)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
