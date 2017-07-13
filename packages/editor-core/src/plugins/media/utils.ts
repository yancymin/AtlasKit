import {
  atTheEndOfBlock, atTheBeginningOfBlock,
  endPositionOfParent, startPositionOfParent
} from '../../utils';
import {
  EditorState,
  NodeSelection,
  ResolvedPos,
} from '../../prosemirror';

export const posOfMediaGroupNearby = (state: EditorState<any>): number | undefined => {
  return posOfParentMediaGroup(state)
    || posOfFollowingMediaGroup(state)
    || posOfPreceedingMediaGroup(state);
};

export const isSelectionNonMediaBlockNode = (state: EditorState<any>): boolean => {
  const { node } = state.selection as NodeSelection;

  return node && node.type !== state.schema.nodes.media && node.isBlock;
};

export const posOfPreceedingMediaGroup = (state: EditorState<any>): number | undefined => {
  if (!atTheBeginningOfBlock(state)) {
    return;
  }

  return posOfMediaGroupAbove(state, state.selection.$from);
};

const posOfFollowingMediaGroup = (state: EditorState<any>): number | undefined => {
  if (!atTheEndOfBlock(state)) {
    return;
  }
  return posOfMediaGroupBelow(state, state.selection.$to);
};

const posOfMediaGroupAbove = (state: EditorState<any>, $pos: ResolvedPos): number | undefined => {
  let adjacentPos;
  let adjacentNode;

  if (isSelectionNonMediaBlockNode(state)) {
    adjacentPos = $pos.pos;
    adjacentNode = $pos.nodeBefore;
  } else {
    adjacentPos = startPositionOfParent($pos) - 1;
    adjacentNode = state.doc.resolve(adjacentPos).nodeBefore;
  }

  if (adjacentNode && adjacentNode.type === state.schema.nodes.mediaGroup) {
    return adjacentPos - adjacentNode.nodeSize + 1;
  }
};

/**
 * Determine whether the cursor is inside empty paragraph
 * or the selection is the entire paragraph
 */
export const isInsidePotentialEmptyParagraph = (state: EditorState<any>): boolean => {
  const { $from } = state.selection;

  return $from.parent.type === state.schema.nodes.paragraph && atTheBeginningOfBlock(state) && atTheEndOfBlock(state);
};

export const posOfMediaGroupBelow = (state: EditorState<any>, $pos: ResolvedPos, prepend: boolean = true): number | undefined => {
  let adjacentPos;
  let adjacentNode;

  if (isSelectionNonMediaBlockNode(state)) {
    adjacentPos = $pos.pos;
    adjacentNode = $pos.nodeAfter;
  } else {
    adjacentPos = endPositionOfParent($pos);
    adjacentNode = state.doc.nodeAt(adjacentPos);
  }

  if (adjacentNode && adjacentNode.type === state.schema.nodes.mediaGroup) {
    return prepend ? adjacentPos + 1 : adjacentPos + adjacentNode.nodeSize - 1;
  }
};

export const posOfParentMediaGroup = (state: EditorState<any>, $pos?: ResolvedPos, prepend: boolean = true): number | undefined => {
  const { $from } = state.selection;
  $pos = $pos || $from;

  if ($pos.parent.type === state.schema.nodes.mediaGroup) {
    return prepend ? startPositionOfParent($pos) : endPositionOfParent($pos) - 1;
  }
};
