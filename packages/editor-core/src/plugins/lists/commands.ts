import { EditorState, Transaction, EditorView, ResolvedPos, Schema } from '../../prosemirror';
import * as commands from '../../commands';
import * as baseListCommand from '../../prosemirror/prosemirror-schema-list';
import { liftFollowingList } from '../../commands/lists';

export const enterKeyCommand = (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
  const { selection } = state;
  if (selection.empty) {
    const { listItem, panel, blockquote, codeBlock, paragraph } = state.schema.nodes;
    const node = selection.$from.node(selection.$from.depth);
    const wrapper = selection.$from.node(selection.$from.depth - 1);
    const secondWrapper = selection.$from.node(selection.$from.depth - 2);
    const parent = selection.$from.node(selection.$from.depth - 3);
    if (node && wrapper && parent) {
      const { textContent } = node;
      const { type: wrapperType } = wrapper;
      const { type: parentType } = parent;
      if (textContent.length === 0 && wrapperType === listItem && parentType === listItem) {
        return commands.outdentList()(state, dispatch);
      }
      if (textContent.length === 0 &&
        (secondWrapper.type === listItem) &&
        ((panel && wrapperType === panel) ||
        (blockquote && wrapperType === blockquote))
      ) {
        let { tr} = state;
        const { $from } = state.selection;
        tr = tr.split($from.pos, 3);
        const { $from: newFrom, $to: newTo } = tr.selection;
        tr = tr.lift(newFrom.blockRange(newTo)!, newFrom.depth - 2);
        tr = tr.delete($from.pos - 1, $from.pos + 1);
        dispatch(tr);
        return true;
      }
      if (codeBlock && node.type === codeBlock && wrapperType === listItem) {
        if (node.textContent.slice(node.textContent.length - 2) === '\n\n') {
          let { tr} = state;
          const { $from } = state.selection;
          tr = tr.split($from.pos, 2);
          const { $from: newFrom, $to: newTo } = tr.selection;
          tr = tr.setBlockType(newFrom.pos, newTo.pos, paragraph);
          tr = tr.delete($from.pos - 2, $from.pos);
          dispatch(tr);
          return true;
        }
        return false;
      }
      if (wrapperType === listItem) {
        return baseListCommand.splitListItem(state.schema.nodes.listItem)(state, dispatch);
      }
    }
  }
  return false;
};

export const toggleList = (
  state: EditorState<any>,
  dispatch: (tr: Transaction) => void,
  view: EditorView,
  listType: 'bulletList' | 'orderedList'
): boolean => {
  const { selection } = state;
  const { bulletList, orderedList, listItem } = state.schema.nodes;
  const fromNode = selection.$from.node(selection.$from.depth - 2);
  const endNode = selection.$to.node(selection.$to.depth - 2);
  if ((!fromNode || fromNode.type.name !== listType) ||
    (!endNode || endNode.type.name !== listType)) {
    return commands.toggleList(listType)(state, dispatch, view);
  } else {
    let rootListDepth;
    for (let i = selection.$to.depth - 1; i > 0; i--) {
      const node = selection.$to.node(i);
      if (node.type === bulletList || node.type === orderedList) {
        rootListDepth = i;
      }
      if (node.type !== bulletList && node.type !== orderedList && node.type !== listItem) {
        break;
      }
    }
    let tr = liftFollowingList(
      state,
      selection.$to.pos,
      selection.$to.end(rootListDepth),
      rootListDepth,
      state.tr
    );
    tr = liftSelectionList(state, tr);
    dispatch(tr);
    return true;
  }
};

/**
 * The function will list paragraphs in selection out to level 1 below root list.
 */
function liftSelectionList(state: EditorState<any>, tr: Transaction): Transaction {
  const { from, to } = state.selection;
  const listCol: any[] = [];
  tr.doc.nodesBetween(from, to, (node, pos) => {
    if (node.isTextblock) {
      listCol.push({ node, pos });
    }
  });
  for (let i = listCol.length - 1; i >= 0; i--) {
    const paragraph = listCol[i];
    const start = tr.doc.resolve(tr.mapping.map(paragraph.pos));
    if (start.depth > 0) {
      let end;
      if (paragraph.node.textContent && paragraph.node.textContent.length > 0) {
        end = tr.doc.resolve(tr.mapping.map(paragraph.pos + paragraph.node.textContent.length));
      } else {
        end = tr.doc.resolve(tr.mapping.map(paragraph.pos + 1));
      }
      const range = start.blockRange(end)!;
      tr.lift(range, listLiftTarget(state.schema, start));
    }
  }
  return tr;
}

/**
 * This will return (depth - 1) for root list parent of a list.
 */
function listLiftTarget(schema: Schema<any, any>, resPos: ResolvedPos): number {
  let target = resPos.depth;
  const { bulletList, orderedList, listItem } = schema.nodes;
  for (let i = resPos.depth; i > 0; i--) {
    const node = resPos.node(i);
    if (node.type === bulletList || node.type === orderedList) {
      target = i;
    }
    if (node.type !== bulletList && node.type !== orderedList && node.type !== listItem) {
      break;
    }
  }
  return target - 1;
}
