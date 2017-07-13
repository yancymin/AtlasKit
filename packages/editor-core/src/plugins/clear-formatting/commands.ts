import { EditorState, Transaction, Schema, ResolvedPos } from '../../prosemirror';
import { Command } from '../../commands';
import { liftFollowingList } from '../../commands/lists';

export function clearFormatting(markTypes: Array<string>): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    let { tr } = state;
    const { from, to } = state.selection;
    const { paragraph } = state.schema.nodes;
    markTypes.forEach(mark => tr.removeMark(from, to, state.schema.marks[mark]));
    tr.setStoredMarks([]);
    if (paragraph) {
      tr.setBlockType(from, to, paragraph);
      tr = liftAllNodes(state, tr);
    }
    dispatch(tr);
    return true;
  };
}

function liftAllNodes(state: EditorState<any>, tr: Transaction): Transaction {
  const { paragraph } = state.schema.nodes;
  const { $to, from, to } = state.selection;
  const paragraphs: Array<any> = [];
  if (listPresentAtPos(state.schema, $to)) {
    const selection = state.selection;
    const { bulletList, orderedList, listItem } = state.schema.nodes;
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
    tr = liftFollowingList(
      state,
      selection.$to.pos,
      selection.$to.end(rootListDepth),
      rootListDepth,
      tr
    );
  }
  tr.doc.nodesBetween(from, to, (node, pos) => {
    if (node.type === paragraph) {
      paragraphs.push({ node, pos });
    }
  });
  for (let i = paragraphs.length - 1 ; i >= 0 ; i--) {
    const { node, pos } = paragraphs[i];
    const start = tr.doc.resolve(tr.mapping.map(pos));
    const end = tr.doc.resolve(tr.mapping.map(pos + node.textContent.length));
    if (start.depth > 0) {
      const range = start.blockRange(end)!;
      tr = tr.lift(range, 0);
    }
  }
  return tr;
}

function listPresentAtPos(schema: Schema<any, any>, resPos: ResolvedPos): boolean {
  for (let i = resPos.depth; i > 0; i--) {
    const node = resPos.node(i);
    if (node.type === schema.nodes.listItem) {
      return true;
    }
  }
  return false;
}
