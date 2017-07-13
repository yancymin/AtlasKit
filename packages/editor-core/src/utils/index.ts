import {
  liftTarget,
  Mark,
  MarkType,
  Node,
  NodeSelection,
  NodeType,
  ResolvedPos,
  Selection,
  TextSelection,
  Transaction,
  EditorView,
  EditorState,
  Slice,
  Fragment,
  findWrapping
} from '../prosemirror';
import * as commands from '../commands';
import JSONSerializer, { JSONDocNode } from '../renderer/json';

export {
  default as ErrorReporter,
  ErrorReportingHandler,
} from './error-reporter';
export { JSONDocNode };

function validateNode(node: Node): boolean {
  return false;
}

function isMarkTypeExcludedFromMark(markType: MarkType, mark: Mark): boolean {
  return mark.type.excludes(markType);
}

function isMarkTypeAllowedInNode(markType: MarkType, state: EditorState<any>): boolean {
  return commands.toggleMark(markType)(state);
}

export function canMoveUp(state: EditorState<any>): boolean {
  const { selection } = state;
  if (selection instanceof TextSelection) {
    if (!selection.empty) {
      return true;
    }
  }

  return !atTheBeginningOfDoc(state);
}

export function canMoveDown(state: EditorState<any>): boolean {
  const { selection } = state;
  if (selection instanceof TextSelection) {
    if (!selection.empty) {
      return true;
    }
  }

  return !atTheEndOfDoc(state);
}

export function atTheEndOfDoc(state: EditorState<any>): boolean {
  const { selection, doc } = state;
  return doc.nodeSize - selection.$to.pos - 2 === selection.$to.depth;
}

export function atTheBeginningOfDoc(state: EditorState<any>): boolean {
  const { selection } = state;
  return selection.$from.pos === selection.$from.depth;
}

export function atTheEndOfBlock(state: EditorState<any>): boolean {
  const { selection } = state;
  const { $to } = selection;
  if (selection instanceof NodeSelection && selection.node.isBlock) {
    return true;
  }
  return endPositionOfParent($to) === $to.pos + 1;
}

export function atTheBeginningOfBlock(state: EditorState<any>): boolean {
  const { selection } = state;
  const { $from } = selection;
  if (selection instanceof NodeSelection && selection.node.isBlock) {
    return true;
  }
  return startPositionOfParent($from) === $from.pos;
}

export function startPositionOfParent(resolvedPos: ResolvedPos): number {
  return resolvedPos.start(resolvedPos.depth);
}

export function endPositionOfParent(resolvedPos: ResolvedPos): number {
  return resolvedPos.end(resolvedPos.depth) + 1;
}

/**
 * Check if a mark is allowed at the current position based on a given state.
 * This method looks both at the currently active marks as well as the node and marks
 * at the current position to determine if the given mark type is allowed.
 * If there's a non-empty selection, the current position corresponds to the start
 * of the selection.
 */
export function isMarkTypeAllowedAtCurrentPosition(markType: MarkType, state: EditorState<any>) {
  if (!isMarkTypeAllowedInNode(markType, state)) { return false; }

  let allowedInActiveMarks = true;
  let excludesMarkType = mark => isMarkTypeExcludedFromMark(markType, mark);
  if (state.tr.storedMarks) {
    allowedInActiveMarks = !state.tr.storedMarks.some(excludesMarkType);
  } else {
    allowedInActiveMarks = !state.selection.$from.marks().some(excludesMarkType);
  }
  return allowedInActiveMarks;
}

/**
 * Step through block-nodes between $from and $to and returns false if a node is
 * found that isn't of the specified type
 */
export function isRangeOfType(doc, $from: ResolvedPos, $to: ResolvedPos, nodeType: NodeType): boolean {
  return getAncestorNodesBetween(doc, $from, $to).filter(node => node.type !== nodeType).length === 0;
}

export function createSliceWithContent(content: string, state: EditorState<any>) {
  return new Slice(Fragment.from(state.schema.text(content)), 0, 0);
}

/**
 * Determines if content inside a selection can be joined with the next block.
 * We need this check since the built-in method for "joinDown" will join a orderedList with bulletList.
 */
export function canJoinDown(selection: Selection, doc: any, nodeType: NodeType): boolean {
  const res = doc.resolve(selection.$to.after(findAncestorPosition(doc, selection.$to).depth));
  return res.nodeAfter && res.nodeAfter.type === nodeType;
}

/**
 * Determines if content inside a selection can be joined with the previous block.
 * We need this check since the built-in method for "joinUp" will join a orderedList with bulletList.
 */
export function canJoinUp(selection: Selection, doc: any, nodeType: NodeType): boolean {
  const res = doc.resolve(selection.$from.before(findAncestorPosition(doc, selection.$from).depth));
  return res.nodeBefore && res.nodeBefore.type === nodeType;
}

/**
 * Returns all top-level ancestor-nodes between $from and $to
 */
export function getAncestorNodesBetween(doc, $from: ResolvedPos, $to: ResolvedPos): Node[] {
  const nodes = Array<Node>();
  const maxDepth = findAncestorPosition(doc, $from).depth;
  let current = doc.resolve($from.start(maxDepth));

  while (current.pos <= $to.start($to.depth)) {
    const depth = Math.min(current.depth, maxDepth);
    const node = current.node(depth);

    if (node) {
      nodes.push(node);
    }

    if (depth === 0) {
      break;
    }

    let next: ResolvedPos = doc.resolve(current.after(depth));
    if (next.start(depth) >= doc.nodeSize - 2) {
      break;
    }

    if (next.depth !== current.depth) {
      next = doc.resolve(next.pos + 2);
    }

    if (next.depth) {
      current = doc.resolve(next.start(next.depth));
    } else {
      current = doc.resolve(next.end(next.depth));
    }
  }

  return nodes;
}

/**
 * Finds all "selection-groups" within a range. A selection group is based on ancestors.
 *
 * Example:
 * Given the following document and selection ({<} = start of selection and {>} = end)
 *  doc
 *    blockquote
 *      ul
 *        li
 *        li{<}
 *        li
 *     p
 *     p{>}
 *
 * The output will be two selection-groups. One within the ul and one with the two paragraphs.
 */
export function getGroupsInRange(doc, $from: ResolvedPos, $to: ResolvedPos, isNodeValid: (node: Node) => boolean = validateNode): Array<{ $from: ResolvedPos, $to: ResolvedPos }> {
  const groups = Array<{ $from: ResolvedPos, $to: ResolvedPos }>();
  const commonAncestor = hasCommonAncestor(doc, $from, $to);
  const fromAncestor = findAncestorPosition(doc, $from);

  if (commonAncestor || (fromAncestor.depth === 1 && isNodeValid($from.node(1)!))) {
    groups.push({ $from, $to });
  } else {
    let current = $from;

    while (current.pos < $to.pos) {
      let ancestorPos = findAncestorPosition(doc, current);
      while (ancestorPos.depth > 1) {
        ancestorPos = findAncestorPosition(doc, ancestorPos);
      }

      const endPos = doc.resolve(Math.min(
        // should not be smaller then start position in case of an empty paragpraph for example.
        Math.max(ancestorPos.start(ancestorPos.depth), ancestorPos.end(ancestorPos.depth) - 3),
        $to.pos
      ));

      groups.push({
        $from: current,
        $to: endPos
      });

      current = doc.resolve(Math.min(endPos.after(1) + 1, doc.nodeSize - 2));
    }
  }

  return groups;
}

/**
 * Traverse the document until an "ancestor" is found. Any nestable block can be an ancestor.
 */
export function findAncestorPosition(doc: Node, pos: any): any {
  const nestableBlocks = ['blockquote', 'bulletList', 'orderedList'];

  if (pos.depth === 1) {
    return pos;
  }

  let node: Node | undefined = pos.node(pos.depth);
  let newPos = pos;
  while (pos.depth >= 1) {
    pos = doc.resolve(pos.before(pos.depth));
    node = pos.node(pos.depth);

    if (node && nestableBlocks.indexOf(node.type.name) !== -1) {
      newPos = pos;
    }
  }

  return newPos;
}

/**
 * Determine if two positions have a common ancestor.
 */
export function hasCommonAncestor(doc, $from: ResolvedPos, $to: ResolvedPos): boolean {
  let current;
  let target;

  if ($from.depth > $to.depth) {
    current = findAncestorPosition(doc, $from);
    target = findAncestorPosition(doc, $to);
  } else {
    current = findAncestorPosition(doc, $to);
    target = findAncestorPosition(doc, $from);
  }

  while (current.depth > target.depth && current.depth > 1) {
    current = findAncestorPosition(doc, current);
  }

  return current.node(current.depth) === target.node(target.depth);
}

/**
 * Takes a selection $from and $to and lift all text nodes from their parents to document-level
 */
export function liftSelection(tr, doc, $from: ResolvedPos, $to: ResolvedPos) {
  let startPos = $from.start($from.depth);
  let endPos = $to.end($to.depth);
  const target = Math.max(0, findAncestorPosition(doc, $from).depth - 1);

  tr.doc.nodesBetween(startPos, endPos, (node, pos) => {
    if (
      node.isText ||                          // Text node
      (node.isTextblock && !node.textContent) // Empty paragraph
    ) {
      const res = tr.doc.resolve(tr.mapping.map(pos));
      const sel = new NodeSelection(res);
      const range = sel.$from.blockRange(sel.$to)!;

      if (liftTarget(range) !== undefined) {
        tr.lift(range, target);
      }
    }
  });

  startPos = tr.mapping.map(startPos);
  endPos = tr.mapping.map(endPos);
  endPos = tr.doc.resolve(endPos).end(tr.doc.resolve(endPos).depth); // We want to select the entire node

  tr.setSelection(new TextSelection(tr.doc.resolve(startPos), tr.doc.resolve(endPos)));

  return {
    tr: tr,
    $from: tr.doc.resolve(startPos),
    $to: tr.doc.resolve(endPos)
  };
}

/**
 * Lift nodes in block to one level above.
 */
export function liftSiblingNodes(view: EditorView) {
  const { tr } = view.state;
  const { $from, $to } = view.state.selection;
  const blockStart = tr.doc.resolve($from.start($from.depth - 1));
  const blockEnd = tr.doc.resolve($to.end($to.depth - 1));
  const range = blockStart.blockRange(blockEnd)!;
  view.dispatch(tr.lift(range, blockStart.depth - 1));
}

/**
 * Lift sibling nodes to document-level and select them.
 */
export function liftAndSelectSiblingNodes(view: EditorView): Transaction {
  const { tr } = view.state;
  const { $from, $to } = view.state.selection;
  const blockStart = tr.doc.resolve($from.start($from.depth - 1));
  const blockEnd = tr.doc.resolve($to.end($to.depth - 1));
  const range = blockStart.blockRange(blockEnd)!;
  tr.setSelection(new TextSelection(blockStart, blockEnd));
  tr.lift(range, blockStart.depth - 1);
  return tr;
}

export function wrapIn(nodeType: NodeType, tr: Transaction, $from: ResolvedPos, $to: ResolvedPos): Transaction {
  const range = $from.blockRange($to) as any;
  const wrapping = range && findWrapping(range, nodeType) as any;
  if (wrapping) {
    tr = tr.wrap(range, wrapping).scrollIntoView();
  }
  return tr;
}

export function toJSON(node: Node): JSONDocNode {
  return new JSONSerializer().serializeFragment(node.content);
}

export function splitCodeBlockAtSelection(state: EditorState<any>) {
  let tr = splitCodeBlockAtSelectionStart(state);
  tr = splitCodeBlockAtSelectionEnd(state, tr);
  return {
    tr,
    $from: tr.selection.$from,
    $to: tr.selection.$to,
  };
}

function splitCodeBlockAtSelectionStart(state: EditorState<any>) {
  const { tr } = state;
  const { $from } = state.selection;
  const { codeBlock } = state.schema.nodes;
  const node = $from.node($from.depth);

  if ($from.pos > $from.start($from.depth) && node.type === codeBlock) {
    let fromPos = $from.pos - $from.start($from.depth);
    for (let i = fromPos; i >= 0; i--) {
      if (node.textContent[i] === '\n') {
        fromPos = i + 1;
        break;
      } else if (i === 0) {
        fromPos = 0;
      }
    }
    if (fromPos > 0) {
      tr.split($from.start($from.depth) + fromPos, $from.depth);
      if (node.textContent[fromPos - 1] === '\n') {
        tr.delete($from.start($from.depth) + fromPos - 1, $from.start($from.depth) + fromPos);
      }
    }
  }
  return tr;
}

function splitCodeBlockAtSelectionEnd(state: EditorState<any>, tr: Transaction) {
  let { $from, $to } = tr.selection;
  const { codeBlock } = state.schema.nodes;
  const node = $to.node($to.depth);
  if ($to.pos < $to.end($to.depth) && node.type === codeBlock) {
    let toPos = $to.pos - $from.start($from.depth);
    for (let i = toPos; i <= node.textContent.length; i++) {
      if (node.textContent[i] === '\n') {
        toPos = i + 1;
        break;
      } else if (i === node.textContent.length) {
        toPos = node.textContent.length;
      }
    }
    if (toPos < node.textContent.length) {
      tr.split($from.start($from.depth) + toPos, $to.depth);
      if (node.textContent[toPos - 1] === '\n') {
        tr.delete($from.start($from.depth) + toPos - 1, $from.start($from.depth) + toPos);
      }
    }
  }
  return tr;
}

/**
 * Repeating string for multiple times
 */
export function stringRepeat(text: string, length: number): string {
  let result = '';
  for (let x = 0; x < length; x++) {
    result += text;
  }
  return result;
}

/**
 * A replacement for `Array.from` until it becomes widely implemented.
 */
export function arrayFrom(obj: any): any[] {
  return Array.prototype.slice.call(obj);
}
