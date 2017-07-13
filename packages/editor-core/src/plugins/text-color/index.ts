import {
  Plugin,
  PluginKey,
  EditorState,
  Schema,
  TextSelection,
  Mark,
  MarkType,
  Node,
  SelectionRange,
  Transaction
} from '../../prosemirror';
import { colorPalette } from '../../schema/marks/text-color';
import { akColorN800 } from '@atlaskit/util-shared-styles';

export type StateChangeHandler = (state: TextColorState) => any;

// TODO: Pass during plugin initialization
// https://product-fabric.atlassian.net/browse/ED-1682
export const DEFAULT_COLOR = {
  color: akColorN800,
  label: 'Dark grey'
};

export class TextColorState {
  color?: string;
  disabled: boolean;
  palette: Map<string, string>;
  // For caching the default color,
  // because this will be accessed every time we change selection in editor
  defaultColor: string;
  private changeHandlers: StateChangeHandler[] = [];
  private state: EditorState<any>;

  constructor(state: EditorState<any>, palette: Map<string, string>) {
    this.state = state;
    this.palette = palette;
    this.defaultColor = palette.keys().next().value;
    this.update(state);
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
    const { textColor } = state.schema.marks;

    let dirty = false;
    if (textColor) {
      let activeColor = this.getActiveColor();
      if (this.color !== activeColor) {
        this.color = activeColor;
        dirty = true;
      }

      const disabled = !this.toggleTextColor(state);
      if (this.disabled !== disabled) {
        this.disabled = disabled;
        dirty = true;
      }
    }

    if (dirty) {
      this.triggerOnChange();
    }
  }

  toggleTextColor(
    state: EditorState<any>, dispatch?: (tr: Transaction) => void, color?: string
  ): boolean {
    const { textColor } = this.state.schema.marks;
    if (textColor) {
      const { empty, ranges, $cursor } = (state.selection) as TextSelection;
      if ((empty && !$cursor) || !this.markApplies(state.doc, ranges, textColor)) {
        return false;
      }
      if (this.isExcluded(state.storedMarks || ($cursor && $cursor.marks()))) {
        return false;
      }
      if (dispatch && color) {
        if ($cursor) {
          dispatch(state.tr.addStoredMark(textColor.create({ color })));
        } else {
          let tr = state.tr;
          for (let i = 0; i < ranges.length; i++) {
            const { $from, $to } = ranges[i];
            tr.addMark($from.pos, $to.pos, textColor.create({ color }));
          }
          dispatch(tr.scrollIntoView());
        }
      }
      return true;
    }
    return false;
  }

  removeTextColor(
    state: EditorState<any>, dispatch: (tr: Transaction) => void, color?: string
  ): boolean {
    const { textColor } = this.state.schema.marks;
    if (textColor) {
      const { from, to, $cursor } = (state.selection) as TextSelection;
      if ($cursor) {
        dispatch(state.tr.removeStoredMark(textColor));
      } else {
        dispatch(state.tr.removeMark(from, to, textColor));
      }
      return true;
    }
    return false;
  }

  private triggerOnChange() {
    this.changeHandlers.forEach(cb => cb(this));
  }

  private getActiveColor(): string | undefined {
    const { state } = this;
    const { $from, $to, $cursor } = (state.selection) as TextSelection;

    // Filter out other marks
    let marks: Array<Mark | undefined> = [];
    if ($cursor) {
      marks.push(this.findTextColorMark(state.storedMarks || $cursor.marks()));
    } else {
      state.doc.nodesBetween($from.pos, $to.pos, currentNode => {
        const mark = this.findTextColorMark(currentNode.marks);
        marks.push(mark);
        return !mark;
      });
    }

    // Merge consecutive same color marks
    let prevMark: Mark | undefined;
    marks = marks.filter(mark => {
      if (mark && prevMark && mark.attrs.color === prevMark.attrs.color) {
        return false;
      }
      prevMark = mark;
      return true;
    });

    const marksWithColor = marks.filter(mark => !!mark) as Array<Mark>;
    // When mutiple color is selected revert back to default color
    if (
      marksWithColor.length > 1 ||
      (marksWithColor.length === 1 && marks.length > 2)
    ) {
      return;
    }
    return marksWithColor.length ? marksWithColor[0].attrs.color : this.defaultColor;
  }

  private findTextColorMark(marks: Array<Mark>): Mark | undefined {
    const { textColor } = this.state.schema.marks;
    return this.findMarkType(textColor, marks);
  }

  private findMarkType(markType: MarkType, marks: Array<Mark>): Mark | undefined {
    for (let i = 0; i < marks.length; i++) {
      const currentMark = marks[i];
      if (markType === currentMark.type) {
        return currentMark;
      }
    }
  }

  // Copied from
  // https://github.com/ProseMirror/prosemirror-commands/blob/1c27e7a/src/commands.js#L395~L406
  // This function only checks if the current node allows mark or not, doesn't respect excludes
  private markApplies(doc: Node, ranges: Array<SelectionRange>, type: MarkType): boolean {
    for (let i = 0; i < ranges.length; i++) {
      const { $from, $to } = ranges[i];
      let can = $from.depth === 0 ? doc.contentMatchAt(0).allowsMark(type) : false;
      doc.nodesBetween($from.pos, $to.pos, node => {
        if (can) {
          return false;
        }
        can = node.inlineContent && node.contentMatchAt(0).allowsMark(type);
      });
      if (can) {
        return can;
      }
    }
    return false;
  }

  private isExcluded (marks?: Array<Mark>): boolean {
    if (marks) {
      const { textColor } = this.state.schema.marks;
      return marks.some(
        mark => mark.type !== textColor && mark.type.excludes(textColor)
      );
    }
    return false;
  }
}

export const stateKey = new PluginKey('textColorPlugin');

const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      const palette = new Map<string, string>([
        [DEFAULT_COLOR.color.toLowerCase(), DEFAULT_COLOR.label]
      ]);
      // Typescript can't spread Map as of 11 May, 2017
      colorPalette.forEach((label, color) => palette.set(color, label));

      return new TextColorState(state, palette);
    },
    apply(tr, pluginState: TextColorState, oldState, newState) {
      pluginState.update(newState);
      return pluginState;
    }
  },
  key: stateKey,
});

const plugins = (schema: Schema<any, any>) => {
  return [plugin].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
