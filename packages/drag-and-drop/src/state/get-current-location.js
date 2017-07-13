// @flow
import getDroppableOver from './get-droppable-over';
import getDraggablesInsideDroppable from './get-draggables-inside-droppable';
import type {
  DraggableLocation,
  Dimension,
  DimensionMap,
  DroppableId,
  DraggableId,
} from '../types';

export default (
  draggableId: DraggableId,
  draggableDimensions: DimensionMap,
  droppableDimensions: DimensionMap,
): ?DraggableLocation => {
  const draggingDimension: Dimension = draggableDimensions[draggableId];

  const droppableId: ?DroppableId = getDroppableOver(
    draggingDimension.center, droppableDimensions
  );

  if (!droppableId) {
    return null;
  }

  const droppableDimension: Dimension = droppableDimensions[droppableId];

  const insideDroppable: Dimension[] = getDraggablesInsideDroppable(
    droppableDimension,
    draggableDimensions
  );
  const index: number = insideDroppable.indexOf(draggingDimension);

  const location: DraggableLocation = {
    droppableId,
    index,
  };

  return location;
};
