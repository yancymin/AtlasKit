import makePublisher from './make-connected-dimension-publisher';
import {
  publishDraggableDimension,
  publishDroppableDimension,
} from '../../state/action-creators';

export const DraggableDimensionPublisher = makePublisher(publishDraggableDimension);
export const DroppableDimensionPublisher = makePublisher(publishDroppableDimension);
