import {
  atTheEndOfDoc, atTheEndOfBlock, atTheBeginningOfBlock,
  endPositionOfParent, startPositionOfParent
} from '../../utils';
import {
  EditorView,
  EditorState,
  Node as PMNode,
  NodeSelection,
  TextSelection,
  NodeType,
} from '../../prosemirror';
import { MediaState } from '@atlaskit/media-core';
import {
  posOfPreceedingMediaGroup,
  posOfMediaGroupNearby,
  posOfParentMediaGroup,
  isSelectionNonMediaBlockNode,
  isInsidePotentialEmptyParagraph,
} from './utils';

export interface Range {
  start: number;
  end: number;
}

export const insertFile = (view: EditorView, mediaState: MediaState, collection?: string): void => {
  const { state, dispatch } = view;
  const { $to } = state.selection;
  const { tr, schema } = state;
  const { media, paragraph } = schema.nodes;

  if (!collection || !media) {
    return;
  }

  const node = createMediaFileNode(mediaState, collection, media);

  // insert a paragraph after if reach the end of doc
  // and there is no media group in the front or selection is a non media block node
  if (atTheEndOfDoc(state) && (!posOfPreceedingMediaGroup(state) || isSelectionNonMediaBlockNode(state))) {
    const paragraphInsertPos = isSelectionNonMediaBlockNode(state) ? $to.pos : $to.pos + 1;
    tr.insert(paragraphInsertPos, paragraph.create());
  }

  const mediaInsertPos = findMediaInsertPos(state);

  // delete the selection or empty paragraph
  const deleteRange = findDeleteRange(state);

  if (!deleteRange) {
    tr.insert(mediaInsertPos, node);
  } else if (mediaInsertPos <= deleteRange.start) {
    tr.deleteRange(deleteRange.start, deleteRange.end).insert(mediaInsertPos, node);
  } else {
    tr.insert(mediaInsertPos, node).deleteRange(deleteRange.start, deleteRange.end);
  }

  dispatch(tr);

  setSelectionAfterMediaInsertion(view, mediaInsertPos);
};

const createMediaFileNode = (mediaState: MediaState, collection: string, media: NodeType): PMNode => {
  const { id } = mediaState;

  const node = media.create({
    id,
    type: 'file',
    collection
  });

  ['fileName', 'fileSize', 'fileMimeType'].forEach(key => {
    if (mediaState[key]) {
      node.attrs[`__${key}`] = mediaState[key];
    }
  });

  return node;
};

const findMediaInsertPos = (state: EditorState<any>): number => {
  const { $from, $to } = state.selection;

  const nearbyMediaGroupPos = posOfMediaGroupNearby(state);

  if (nearbyMediaGroupPos) {
    return nearbyMediaGroupPos;
  }

  if (isSelectionNonMediaBlockNode(state)) {
    return $to.pos;
  }

  if (atTheEndOfBlock(state)) {
    return $to.pos + 1;
  }

  if (atTheBeginningOfBlock(state)) {
    return $from.pos - 1;
  }

  return $to.pos;
};

const findDeleteRange = (state: EditorState<any>): Range | undefined => {
  const { $from, $to } = state.selection;

  if (posOfParentMediaGroup(state)) {
    return;
  }

  if (!isInsidePotentialEmptyParagraph(state) || posOfMediaGroupNearby(state)) {
    return range($from.pos, $to.pos);
  }

  return range(startPositionOfParent($from) - 1, endPositionOfParent($to));
};

const range = (start: number, end: number = start) => {
  return { start, end };
};

const setSelectionAfterMediaInsertion = (view: EditorView, insertPos: number): void => {
  const { state, dispatch } = view;
  const { doc, tr } = state;
  const mediaPos = posOfMediaGroupNearby(state);
  if (!mediaPos) {
    return;
  }

  const $mediaPos = doc.resolve(mediaPos);
  const endOfMediaGroup = endPositionOfParent($mediaPos);
  let selection;

  if (endOfMediaGroup + 1 >= doc.nodeSize - 1) {
    // if nothing after the media group, fallback to select the newest uploaded media item
    selection = new NodeSelection($mediaPos);
  } else {
    selection = TextSelection.create(doc, endOfMediaGroup + 1);
  }

  dispatch(tr.setSelection(selection));
};

