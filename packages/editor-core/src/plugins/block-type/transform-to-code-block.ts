import { Transaction, EditorState, RemoveMarkStep, ReplaceStep, Slice, Step } from '../../prosemirror';
import { createSliceWithContent } from '../../utils';

export default function transformToCodeBlock(state: EditorState<any>): void {
  if (!isConvertableToCodeBlock(state)) {
    return;
  }

  transformToCodeBlockAction(state).scrollIntoView();
}

export function transformToCodeBlockAction(state: EditorState<any>, attrs?: any): Transaction {
  const { $from } = state.selection;
  const codeBlock = state.schema.nodes.codeBlock;

  const where = $from.before($from.depth);
  const tr = clearMarkupFor(state, where);
  return mergeContent(tr, state)
    .setNodeType(where, codeBlock, attrs);
}

export function isConvertableToCodeBlock(state: EditorState<any>): boolean {
  // Before a document is loaded, there is no selection.
  if (!state.selection) {
    return false;
  }

  const { $from } = state.selection;
  const node = $from.parent;

  if (!node.isTextblock || node.type === state.schema.nodes.codeBlock) {
    return false;
  }

  const parentDepth = $from.depth - 1;
  const parentNode = $from.node(parentDepth);
  const index = $from.index(parentDepth);

  return parentNode.canReplaceWith(index, index + 1, state.schema.nodes.codeBlock);
}

function clearMarkupFor(state: EditorState<any>, pos: number): Transaction {
  const tr = state.tr;
  const node = tr.doc.nodeAt(pos)!;
  let match = state.schema.nodes.codeBlock.contentExpr.start();
  const delSteps: Step[] = [];

  for (let i = 0, cur = pos + 1; i < node.childCount; i++) {
    const child = node.child(i);
    const end = cur + child.nodeSize;

    const allowed = match.matchType(child.type, child.attrs);
    if (!allowed) {
      if (child.type === state.schema.nodes.mention) {
        const content = child.attrs['text'];
        delSteps.push(new ReplaceStep(cur, end, createSliceWithContent(content, state), false));
      } else if (child.type === state.schema.nodes.rule || child.type === state.schema.nodes.hardBreak) {
        const content = '\n';
        delSteps.push(new ReplaceStep(cur, end, createSliceWithContent(content, state), false));
      } else {
        delSteps.push(new ReplaceStep(cur, end, Slice.empty, false));
      }
    } else {
      match = allowed;
      for (let j = 0; j < child.marks.length; j++) {
        if (!match.allowsMark(child.marks[j])) {
          tr.step(new RemoveMarkStep(cur, end, child.marks[j]));
        }
      }
    }
    cur = end;
  }

  for (let i = delSteps.length - 1; i >= 0; i--) {
    tr.step(delSteps[i]);
  }

  return tr;
}

function mergeContent(tr: Transaction, state: EditorState<any>) {
  const { from, to, empty } = tr.selection;
  if (empty) {
    return tr;
  }
  let textContent = '';
  tr.doc.nodesBetween(from, to, (node, pos) => {
    if (node.isTextblock && node.textContent) {
      if (textContent.length > 0) {
        textContent += '\n';
      }
      textContent += node.textContent;
    }
  });
  if (textContent.length > 0) {
    const textNode = state.schema.text(textContent);
    tr.replaceSelectionWith(textNode);
  }
  return tr;
}
