// @flow
import type { Position } from '../types';

export default (point1: Position, point2: Position): boolean =>
  point1.x === point2.x && point1.y === point2.y;
