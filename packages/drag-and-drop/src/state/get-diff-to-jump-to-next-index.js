// @flow
import memoizeOne from 'memoize-one';
import type {
  DraggableLocation,
  Dimension,
  DimensionMap,
  Position,
  DraggableId,
} from '../types';
import getDraggablesInsideDroppable from './get-draggables-inside-droppable';

const getIndex = memoizeOne(
  (draggables: Dimension[],
    target: Dimension
  ): number => draggables.indexOf(target)
);

export default (
  isMovingForward: boolean,
  draggableId: DraggableId,
  location: DraggableLocation,
  draggableDimensions: DimensionMap,
  droppableDimensions: DimensionMap,
): ?Position => {
  const droppableDimension: Dimension = droppableDimensions[location.droppableId];
  const draggableDimension: Dimension = draggableDimensions[draggableId];
  const currentIndex: number = location.index;

  const insideDroppable: Dimension[] = getDraggablesInsideDroppable(
    droppableDimension,
    draggableDimensions
  );

  const startIndex: number = getIndex(insideDroppable, draggableDimension);

  if (startIndex === -1) {
    console.error('could not find draggable inside current droppable');
    return null;
  }

  // cannot move beyond the last item
  if (isMovingForward && currentIndex === insideDroppable.length - 1) {
    return null;
  }

  // cannot move before the first item
  if (!isMovingForward && currentIndex === 0) {
    return null;
  }

  const atCurrentIndex: Dimension = insideDroppable[currentIndex];
  const nextIndex = isMovingForward ? currentIndex + 1 : currentIndex - 1;
  const atNextIndex: Dimension = insideDroppable[nextIndex];

  const isMovingTowardStart = (isMovingForward && nextIndex <= startIndex) ||
    (!isMovingForward && nextIndex >= startIndex);

  const amount: number = isMovingTowardStart ?
    atCurrentIndex.withMargin.height :
    atNextIndex.withMargin.height;

  const diff: Position = {
    // not worrying about horizontal for now
    x: 0,
    y: isMovingForward ? amount : -amount,
  };

  return diff;
};

